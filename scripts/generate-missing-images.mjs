/**
 * 从 js/app.js 解析 vocabulary，仅为每个单词写入一张 **WebP**（不生成 PNG）。
 * 下载 Pollinations 图后，用 sharp 缩放/压质量，直到文件 ≤ 默认 100KB（可用 --max-kb= 调整）。
 *
 * 用法：
 *   npm install
 *   npm run generate-images:dry
 *   npm run generate-images
 *   node scripts/generate-missing-images.mjs --limit=5 --max-kb=100
 *   node scripts/generate-missing-images.mjs --vocabulary=data/vocabulary.json
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const APP_JS = join(ROOT, 'js', 'app.js');
const DATA_VOCAB_JSON = join(ROOT, 'data', 'vocabulary.json');
// 基于 https://gen.pollinations.ai/image/models（image 模态且非 paid_only）整理
const DEFAULT_FREE_IMAGE_MODELS = [
  'flux',
  'zimage',
  'klein',
  'gptimage',
  'gptimage-large',
  'wan-image',
  'qwen-image',
  'kontext',
];

function parseArgs(argv) {
  const out = {
    dryRun: false,
    force: false,
    limit: 0,
    delayMs: 900,
    heartbeatMs: 8000,
    maxKb: 100,
    vocabularyPath: null,
    models: [...DEFAULT_FREE_IMAGE_MODELS],
    parallelModels: 1,
  };
  for (const a of argv) {
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--force') out.force = true;
    else if (a.startsWith('--limit=')) out.limit = Math.max(0, parseInt(a.slice('--limit='.length), 10) || 0);
    else if (a.startsWith('--delay=')) out.delayMs = Math.max(0, parseInt(a.slice('--delay='.length), 10) || 0);
    else if (a.startsWith('--heartbeat=')) {
      out.heartbeatMs = Math.max(1000, parseInt(a.slice('--heartbeat='.length), 10) || 8000);
    } else if (a.startsWith('--max-kb=')) {
      out.maxKb = Math.max(8, parseInt(a.slice('--max-kb='.length), 10) || 100);
    } else if (a.startsWith('--vocabulary=')) {
      out.vocabularyPath = a.slice('--vocabulary='.length).trim();
    } else if (a.startsWith('--models=')) {
      const raw = a.slice('--models='.length).trim();
      const list = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (list.length > 0) out.models = list;
    } else if (a.startsWith('--parallel-models=')) {
      out.parallelModels = Math.max(1, parseInt(a.slice('--parallel-models='.length), 10) || 1);
    }
  }
  return out;
}

function extractVocabularyArrayLiteral(source) {
  const marker = 'const vocabulary = ';
  const pos = source.indexOf(marker);
  if (pos === -1) throw new Error('未找到 const vocabulary = ');
  const openBracket = source.indexOf('[', pos);
  if (openBracket === -1) throw new Error('未找到 vocabulary 数组起始 [');

  let depth = 0;
  let inString = false;
  let quote = null;
  let escaped = false;

  for (let i = openBracket; i < source.length; i++) {
    const c = source[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (!inString) {
      if (c === '/' && source[i + 1] === '/') {
        i += 2;
        while (i < source.length && source[i] !== '\n') i++;
        continue;
      }
      if (c === '/' && source[i + 1] === '*') {
        i += 2;
        while (i < source.length - 1 && !(source[i] === '*' && source[i + 1] === '/')) i++;
        i++;
        continue;
      }
      if (c === '"' || c === "'" || c === '`') {
        inString = true;
        quote = c;
        continue;
      }
      if (c === '[') depth++;
      else if (c === ']') {
        depth--;
        if (depth === 0) {
          return source.slice(openBracket, i + 1);
        }
      }
    } else {
      if (c === '\\') {
        escaped = true;
        continue;
      }
      if (c === quote) {
        inString = false;
        quote = null;
      }
    }
  }
  throw new Error('vocabulary 数组括号未闭合');
}

function resolveVocabularyFile(userPath) {
  if (userPath) {
    const p = isAbsolute(userPath) ? userPath : join(ROOT, userPath);
    if (!existsSync(p)) {
      throw new Error(`--vocabulary 指定的文件不存在：\n  ${p}`);
    }
    return p;
  }
  if (existsSync(APP_JS)) return APP_JS;
  if (existsSync(DATA_VOCAB_JSON)) return DATA_VOCAB_JSON;
  throw new Error(
    `未找到词汇表文件。可选做法：\n` +
      `  1) 恢复主站脚本（含 vocabulary）：  git checkout origin/main -- js/app.js\n` +
      `  2) 自建 JSON 数组：  ${relativePosix(DATA_VOCAB_JSON)}  （每项含 imageUrl，及 english/en、chinese/cn）\n` +
      `  3) 显式指定：  node scripts/generate-missing-images.mjs --vocabulary=你的文件.json`
  );
}

/** 供错误信息里打印相对路径 */
function relativePosix(absPath) {
  const r = ROOT.replace(/\\/g, '/');
  return absPath.replace(/\\/g, '/').replace(r + '/', '');
}

function loadVocabulary(vocabularyPath) {
  const filePath = resolveVocabularyFile(vocabularyPath);
  const text = readFileSync(filePath, 'utf8');

  if (filePath.endsWith('.json')) {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error(`${filePath}：根类型必须是 JSON 数组`);
    return data;
  }

  const literal = extractVocabularyArrayLiteral(text);
  const vocabulary = new Function(`return ${literal}`)();
  if (!Array.isArray(vocabulary)) throw new Error('vocabulary 解析结果不是数组');
  return vocabulary;
}

function vocabularyImageToWebpPath(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  const rel = imageUrl.replace(/^\//, '');
  if (rel.endsWith('.webp')) return join(ROOT, rel);
  return join(ROOT, rel.replace(/\.png$/i, '.webp'));
}

/**
 * 文生图英文描述：卡通写实（形体、色彩可信）+ 严禁拟人化。
 * 若仓库中有 js/app.js 的在线回退图（如 buildAiFallbackImageUrl），请保持同一套措辞。
 */
function buildFlashcardImagePrompt(en, cn) {
  const hint = cn ? ` Meaning disambiguation: ${cn}.` : '';
  return (
    `Educational English flashcard illustration for the word "${en}".${hint} ` +
    `The highest priority is that the image clearly communicates the meaning of the word at a glance. ` +
    `Show the most literal, common visual meaning of the word; use a single clear subject when possible, but use a simple scene or action if that expresses the meaning more clearly. ` +
    `Style: semi-realistic cartoon with soft shading, rounded forms, readable textures, and faithful real-world colors, like a polished children's reference illustration rather than flat clipart. ` +
    `If the word refers to an animal, show only the real animal in a natural species-typical pose and do not anthropomorphize it. ` +
    `If the word refers to a food, object, tool, vehicle, plant, clothing item, or household thing, show that item directly and prominently, not an animal. ` +
    `If a human action, relation, or everyday situation is necessary to explain the word, include only the minimal people and context needed for clarity. ` +
    `Avoid disembodied human hands, arms, or close-up body parts unless the word itself specifically requires a human action. ` +
    `Keep the composition clean and focused, preferably centered, with a plain white or very simple background and gentle even lighting. ` +
    `Absolutely no text or typography of any kind in the image: no words, no letters, no numbers, no captions, no labels, no watermark, no logo.`
  );
}

/**
 * 抽象词/形容词/介词/时间等：用“典型场景”来表达概念，而不是硬画一个词。
 * 规则：
 * - 尽量不依赖文字（不画 “TODAY/STOP” 等字样）
 * - 简单、单场景、可视化强
 */
function buildScenePromptForItem(item) {
  const enRaw = String(item.english ?? item.en ?? '').trim();
  const cnRaw = String(item.chinese ?? item.cn ?? '').trim();
  const themeId = String(item.themeId ?? '').trim().toLowerCase();
  const id = String(item.id ?? '').trim();
  const enNorm = enRaw.toLowerCase().trim();

  const base =
    `Educational English flashcard illustration, concept shown clearly with a simple scene. ` +
    `Style: semi-realistic cartoon — soft shading, rounded forms, readable textures, kid-friendly, clean and modern. ` +
    `Plain white background, centered composition, gentle even lighting. ` +
    `Absolutely no text or typography of any kind: no words, no letters, no numbers, no captions, no labels, no watermark, no logo. `;

  const meaning = cnRaw ? `Meaning: ${cnRaw}. ` : '';

  const byId = {
    // senses
    'sense-see': 'A pair of eyes looking at a colorful butterfly (no text). ',
    'sense-hear': 'An ear with simple sound waves in the air (no text). ',
    'sense-smell': 'A flower with a soft scent swirl (no text). ',
    'sense-taste': 'A lemon slice and a spoon near a tongue icon (no text). ',
    'sense-touch': 'A soft plush ball and a smooth wooden block (no hands). ',
    'sense-loud': 'A big speaker with strong sound waves (no text). ',
    'sense-quiet': 'A closed door with a soft muted sound wave symbol (no text). ',
    'sense-sweet': 'A strawberry and a sugar cube (no text). ',
    'sense-sour': 'A lemon with a sour “pucker” face is NOT allowed; instead show a lemon slice and a splash of juice. ',

    // positions (use ball + boxes/table)
    'pos-left': 'Two arrows pointing left; or a ball on the left side of a box (no text). ',
    'pos-right': 'Two arrows pointing right; or a ball on the right side of a box (no text). ',
    'pos-up': 'A balloon above a box (no text). ',
    'pos-down': 'A ball rolling downward on a gentle ramp (no text). ',
    'pos-in': 'A ball inside a transparent box. ',
    'pos-on': 'A ball on top of a box. ',
    'pos-under': 'A ball under a table. ',
    'pos-over': 'A paper airplane flying over a small house. ',
    'pos-between': 'A ball between two boxes. ',
    'pos-next-to': 'A ball next to a box. ',
    'pos-behind': 'A ball behind a box (partially hidden). ',
    'pos-in-front-of': 'A ball in front of a box. ',

    // opposites
    'opp-big': 'A big ball next to a small ball. ',
    'opp-small': 'A small ball next to a big ball. ',
    'opp-tall': 'A tall tree next to a short bush. ',
    'opp-short': 'A short pencil next to a long pencil. ',
    'opp-long': 'A long rope next to a short rope. ',
    'opp-heavy': 'A heavy rock next to a light feather. ',
    'opp-light': 'A light feather next to a heavy rock. ',
    'opp-full': 'A full cup next to an empty cup. ',
    'opp-empty': 'An empty cup next to a full cup. ',
    'opp-open': 'An open door next to a closed door. ',
    'opp-closed': 'A closed door next to an open door. ',
    'opp-wet': 'A wet towel with visible water drops next to a dry towel. ',
    'opp-dry': 'A dry towel next to a wet towel with water drops. ',

    // adjectives
    'adj-soft': 'A soft pillow next to a hard rock. ',
    'adj-hard': 'A hard rock next to a soft pillow. ',
    'adj-smooth': 'A smooth glass marble next to a rough rock. ',
    'adj-rough': 'A rough rock next to a smooth glass marble. ',
    'adj-clean': 'A clean white plate next to a dirty plate with food stains. ',
    'adj-dirty': 'A dirty plate with stains next to a clean white plate. ',
    'adj-bright': 'A bright sun next to a dim lamp. ',
    'adj-dark': 'A dark room with a small night light. ',
    'adj-same': 'Two identical socks side by side. ',
    'adj-different': 'Two different socks side by side (different colors/patterns, no text). ',

    // safety
    'safety-stop': 'A red traffic light glowing (no letters). ',
    'safety-wait': 'A pedestrian signal style icon without letters: a standing figure silhouette in red (no text). ',
    'safety-careful': 'A wet floor with a caution cone (no text). ',
    'safety-danger': 'A spiky cactus next to a small warning triangle icon (no text). ',
    'safety-safe': 'A child safety helmet and knee pads neatly placed (no child needed). ',
    'safety-help': 'A ringing phone with an emergency bell icon (no numbers, no text). ',
    'safety-emergency': 'An ambulance with lights on (no text). ',
    'safety-helmet': 'A bicycle helmet centered. ',
    'safety-seat-belt': 'A seat belt buckle close-up (no hands). ',

    // daily routine
    'routine-wake-up': 'An alarm clock next to a bed with morning sunlight. ',
    'routine-brush-teeth': 'A toothbrush and toothpaste next to a sink (no text). ',
    'routine-wash-hands': 'Soap bubbles above a sink and faucet (no hands). ',
    'routine-breakfast': 'A simple breakfast: toast, egg, and a glass of milk. ',
    'routine-go-to-school': 'A school backpack next to a school building. ',
    'routine-homework': 'A notebook, pencil, and open book on a desk (no letters). ',
    'routine-dinner': 'A dinner plate with rice and vegetables on a table. ',
    'routine-shower': 'A shower head with water drops. ',
    'routine-bedtime': 'A bed with a night lamp and a moon outside the window. ',
    'routine-nap': 'A small pillow and blanket on a couch. ',

    // polite
    'polite-please': 'A gift box with a small heart symbol (no text). ',
    'polite-thank-you': 'A bouquet of flowers and a small heart symbol (no text). ',
    'polite-sorry': 'A broken toy gently repaired with a bandage (no text). ',
    'polite-excuse-me': 'A door slightly open with a friendly “after you” gesture implied by an open path (no people, no text). ',
    'polite-hello': 'A bright sun rising behind a simple house, welcoming mood (no text). ',
    'polite-goodbye': 'A sunset behind a simple house, calm mood (no text). ',
    'polite-good-morning': 'A sunrise with a breakfast table. ',
    'polite-good-night': 'A moon and stars above a bed with night light. ',
    'polite-you-are-welcome': 'Two simple gift boxes side by side with a heart symbol (no text). ',

    // chores
    'chore-tidy-up': 'Toys neatly put into a storage box. ',
    'chore-clean': 'A clean sponge and spray bottle on a countertop (no label text). ',
    'chore-sweep': 'A broom and dustpan with a small pile of dust. ',
    'chore-mop': 'A mop and a shiny clean floor reflection. ',
    'chore-wash-dishes': 'A stack of clean plates with soap bubbles (no hands). ',
    'chore-take-out-trash': 'A tied trash bag next to a trash bin. ',
    'chore-make-bed': 'A neatly made bed with pillow and blanket. ',
    'chore-fold-clothes': 'A folded T-shirt and folded pants stacked neatly. ',
    'chore-water-plants': 'A watering can next to a potted plant with water drops (no hands). ',

    // sorting
    'sort-same': 'Two identical blocks side by side. ',
    'sort-different': 'Two different blocks side by side (different color/shape). ',
    'sort-group': 'Three groups of blocks separated into piles by color. ',
    'sort-sort': 'Mixed blocks being arranged into neat rows (no hands). ',
    'sort-match': 'A matching game: two identical cards placed as a pair (no letters). ',
    'sort-pair': 'A pair of socks side by side. ',

    // time
    'time-today': 'A calendar page with the current day highlighted using a colored circle (no letters). ',
    'time-tomorrow': 'A calendar page with the next day highlighted (no letters). ',
    'time-yesterday': 'A calendar page with the previous day highlighted (no letters). ',
    'time-now': 'An analog clock pointing to a clear time (no numbers). ',
    'time-later': 'Two analog clocks: one now, one later (no numbers). ',
    'time-morning': 'Sunrise over a breakfast table. ',
    'time-afternoon': 'Bright sun over a playground. ',
    'time-evening': 'Warm sunset over a quiet street. ',
    'time-night': 'Moon and stars over a house. ',
    'time-week': 'Seven simple colored blocks in a row (no letters). ',
    'time-month': 'A grid calendar with squares (no letters). ',
    'time-year': 'Four seasons icons: spring flower, summer sun, autumn leaf, winter snowflake (no text). ',

    // math basics
    'math-more': 'Two plates: one with fewer apples, one with more apples. ',
    'math-less': 'Two plates: one with more apples, one with fewer apples. ',
    'math-equal': 'Two plates with the same number of apples. ',
    'math-add': 'Two apples plus one apple, shown as three apples grouped together (no symbols). ',
    'math-subtract': 'Three apples with one moved away, leaving two (no symbols). ',
    'math-half': 'An apple cut into two equal halves. ',
    'math-whole': 'A whole apple next to a sliced apple (no symbols). ',
    'math-count': 'Ten colorful counting blocks in a line (no numbers). ',
  };

  if (byId[id]) {
    return base + meaning + byId[id];
  }

  // 兜底一：对这些主题用“概念场景”而不是“单体物品”
  const abstractThemes = new Set([
    'sense', 'senses',
    'position', 'positions',
    'opposite', 'opposites',
    'adjective', 'adjectives',
    'safety',
    'daily', 'routine', 'routines',
    'polite', 'manners',
    'chore', 'chores',
    'sorting', 'sort',
    'time',
    'math', 'math-basics',
    'action', 'actions',
    'family', 'relationships',
  ]);
  if (abstractThemes.has(themeId)) {
    return base + meaning + `Show a simple, kid-friendly scene that clearly illustrates the concept of "${enRaw}" without using any text. `;
  }

  // 兜底二：按词义类型自动分流到“场景表达”
  const conceptWords = new Set([
    'in', 'on', 'under', 'over', 'between', 'behind', 'in front of', 'next to', 'left', 'right', 'up', 'down',
    'more', 'less', 'equal', 'same', 'different',
    'open', 'closed', 'wet', 'dry', 'clean', 'dirty', 'bright', 'dark', 'soft', 'hard', 'smooth', 'rough',
    'today', 'tomorrow', 'yesterday', 'now', 'later', 'morning', 'afternoon', 'evening', 'night', 'week', 'month', 'year',
    'please', 'thank you', 'sorry', 'excuse me', 'hello', 'goodbye',
    'stop', 'wait', 'careful', 'danger', 'safe', 'help', 'emergency',
  ]);
  const actionWords = new Set([
    'pick up', 'put down', 'wash hands', 'brush teeth', 'go to school', 'do homework', 'wake up', 'go to bed',
    'sweep', 'mop', 'tidy up', 'clean up', 'sort', 'match', 'count', 'add', 'subtract',
  ]);
  const familyWords = new Set([
    'parent', 'parents', 'mother', 'father', 'mom', 'mum', 'dad',
    'grandparent', 'grandparents', 'grandmother', 'grandfather', 'grandma', 'grandpa',
    'brother', 'sister', 'sibling', 'siblings', 'baby', 'child', 'children',
    'son', 'daughter', 'family',
  ]);
  const hasPhrasePattern = /\s|-/u.test(enNorm);
  if (familyWords.has(enNorm)) {
    return (
      base +
      meaning +
      `Show a clear human family relation for "${enRaw}" with simple everyday clothing and natural proportions. ` +
      `Use minimal people and context needed to make the relation obvious at a glance, and do not replace people with animals. `
    );
  }
  if (conceptWords.has(enNorm) || actionWords.has(enNorm) || hasPhrasePattern) {
    return base + meaning + `Show a simple, kid-friendly scene that clearly illustrates the concept of "${enRaw}" without using any text. `;
  }

  return null;
}

function buildPollinationsUrl(item, model) {
  const en = String(item.english ?? item.en ?? '').trim();
  const cn = String(item.chinese ?? item.cn ?? '').trim();
  const scenePrompt = buildScenePromptForItem(item);
  const prompt = encodeURIComponent(scenePrompt || buildFlashcardImagePrompt(en, cn));
  const modelParam = model ? `&model=${encodeURIComponent(model)}` : '';
  return `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true${modelParam}`;
}

async function fetchImageBuffer(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    const retryAfter = res.headers.get('retry-after');
    const retryAfterMs = parseRetryAfterMs(retryAfter);
    throw new HttpError(res.status, `${res.status} ${res.statusText}`, retryAfterMs);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error('响应过小，可能不是有效图片');
  return buf;
}

class HttpError extends Error {
  /** @param {number} status @param {string} message @param {number|null} retryAfterMs */
  constructor(status, message, retryAfterMs = null) {
    super(`HTTP ${status} ${message}`);
    this.name = 'HttpError';
    this.status = status;
    this.retryAfterMs = retryAfterMs;
  }
}

function parseRetryAfterMs(value) {
  if (!value) return null;
  const s = String(value).trim();
  // most common: seconds
  const sec = Number(s);
  if (Number.isFinite(sec) && sec > 0) return Math.round(sec * 1000);
  // fallback: HTTP-date
  const t = Date.parse(s);
  if (Number.isFinite(t)) {
    const ms = t - Date.now();
    if (ms > 0) return ms;
  }
  return null;
}

function jitter(ms) {
  const r = 0.85 + Math.random() * 0.3; // 0.85 ~ 1.15
  return Math.round(ms * r);
}

function computeBackoffMs(attemptIndex, baseMs) {
  // attemptIndex: 1..N
  const raw = baseMs * Math.pow(2, Math.min(6, attemptIndex - 1));
  return jitter(Math.min(raw, 180_000));
}

async function fetchImageBufferWithProgress(url, heartbeatMs) {
  const t0 = Date.now();
  console.log('  → 正在请求 Pollinations 文生图（远端排队+生成较慢，常见 30～180 秒），请稍候…');

  let stopped = false;
  const timer = setInterval(() => {
    if (stopped) return;
    const sec = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`  … 仍在等待响应（已 ${sec}s），未卡死`);
  }, heartbeatMs);

  try {
    const buf = await fetchImageBuffer(url);
    stopped = true;
    clearInterval(timer);
    const sec = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`  → 下载完成 ${(buf.length / 1024).toFixed(1)} KB，耗时 ${sec}s`);
    return buf;
  } catch (e) {
    stopped = true;
    clearInterval(timer);
    const sec = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`  → 请求在 ${sec}s 后失败`);
    throw e;
  }
}

async function fetchImageBufferWithRetry(url, heartbeatMs, opts) {
  const {
    maxAttempts = 6,
    baseBackoffMs = 5000,
    onBackoff = null,
    abortOn429 = false,
  } = opts || {};

  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`  ↻ 重试第 ${attempt}/${maxAttempts} 次…`);
      }
      return await fetchImageBufferWithProgress(url, heartbeatMs);
    } catch (e) {
      lastErr = e;
      const status = e && typeof e === 'object' && 'status' in e ? e.status : null;
      const retryAfterMs = e && typeof e === 'object' && 'retryAfterMs' in e ? e.retryAfterMs : null;
      if (abortOn429 && status === 429) break;

      const retryable = status === 429 || (typeof status === 'number' && status >= 500 && status <= 599);
      if (!retryable || attempt >= maxAttempts) break;

      const backoffMs = retryAfterMs ?? computeBackoffMs(attempt, baseBackoffMs);
      if (typeof onBackoff === 'function') onBackoff({ status, backoffMs, attempt, maxAttempts });
      console.log(`  ⏳ 收到 ${status}，退避等待 ${(backoffMs / 1000).toFixed(1)}s 后重试…`);
      await sleep(backoffMs);
    }
  }
  throw lastErr;
}

function needsWebpFile(webpPath, force, maxBytes) {
  if (force) return true;
  if (!existsSync(webpPath)) return true;
  try {
    const sz = statSync(webpPath).size;
    if (sz < 500) return true;
    if (sz > maxBytes) return true;
    return false;
  } catch {
    return true;
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function relativeToRoot(absPath) {
  const r = ROOT.endsWith('\\') ? ROOT.slice(0, -1) : ROOT;
  return absPath.replace(r + '\\', '').replace(r + '/', '').replace(/\\/g, '/');
}

/**
 * 将任意位图压成 WebP，目标：≤ maxBytes。反复降 quality / 缩小边长。
 */
async function encodeWebpUnderLimit(sharpMod, inputBuffer, maxBytes) {
  let width = 512;
  let quality = 78;
  let best = null;
  let bestSize = Infinity;

  for (let step = 0; step < 48; step++) {
    const out = await sharpMod(inputBuffer)
      .rotate()
      .resize(width, width, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (out.length < bestSize) {
      best = out;
      bestSize = out.length;
    }
    if (out.length <= maxBytes) {
      return { buffer: out, width, quality, bytes: out.length };
    }
    if (quality > 44) quality -= 4;
    else if (width > 240) width = Math.round(width * 0.9);
    else if (quality > 30) quality -= 3;
    else if (width > 160) width = Math.round(width * 0.88);
    else {
      quality = Math.max(25, quality - 2);
      width = Math.max(128, Math.round(width * 0.86));
    }
  }

  for (const q of [32, 26, 22]) {
    const out = await sharpMod(inputBuffer)
      .rotate()
      .resize(128, 128, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    if (out.length <= maxBytes) {
      return { buffer: out, width: 128, quality: q, bytes: out.length };
    }
    if (out.length < bestSize) {
      best = out;
      bestSize = out.length;
    }
  }

  throw new Error(`无法将 WebP 压到 ≤ ${(maxBytes / 1024).toFixed(0)}KB（当前最小约 ${(bestSize / 1024).toFixed(1)}KB，可尝试 --max-kb= 略增大）`);
}

async function main() {
  const { dryRun, force, limit, delayMs, heartbeatMs, maxKb, vocabularyPath, models, parallelModels } = parseArgs(process.argv.slice(2));
  const maxBytes = maxKb * 1024;
  const modelList = Array.isArray(models) && models.length > 0 ? models : [...DEFAULT_FREE_IMAGE_MODELS];

  let sharpMod;
  try {
    sharpMod = (await import('sharp')).default;
  } catch {
    console.error('本脚本仅输出 WebP，请先安装依赖：npm install');
    process.exit(1);
  }

  const vocabulary = loadVocabulary(vocabularyPath);
  const tasks = [];

  for (const item of vocabulary) {
    const imageUrl = item.imageUrl;
    if (!imageUrl || typeof imageUrl !== 'string') continue;
    const webpPath = vocabularyImageToWebpPath(imageUrl);
    if (!webpPath) continue;

    if (needsWebpFile(webpPath, force, maxBytes)) {
      tasks.push({ item, webpPath, imageUrl });
    }
  }

  const selectedTasks = limit > 0 ? tasks.slice(0, limit) : tasks;
  console.log(`共 ${vocabulary.length} 条词汇，待写入 WebP（≤${maxKb}KB）: ${selectedTasks.length} 条${dryRun ? '（dry-run）' : ''}`);
  if (!dryRun && tasks.length > 0) {
    console.log(`仅写入 .webp，不生成 PNG；超过 ${maxKb}KB 的已有 WebP 也会重压。\n`);
    const workerCount = Math.min(Math.max(1, parallelModels), modelList.length, Math.max(1, selectedTasks.length));
    const workerModels = modelList.slice(0, workerCount);
    console.log(`模型: ${modelList.join(', ')}（可用 --models=... 自定义）`);
    console.log(`并行队列: ${workerCount}（--parallel-models=N）；当前队列模型: ${workerModels.join(', ')}`);
    console.log(`每条下载期间约每 ${heartbeatMs / 1000}s 打印一次进度；--delay 为每个队列项完成后间隔。\n`);
  } else {
    console.log('');
  }

  if (dryRun) {
    for (const t of selectedTasks) {
      const label = `${t.item.id ?? t.item.english} → ${relativeToRoot(t.webpPath)}`;
      console.log(`[dry-run] ${label}`);
    }
    console.log(`\n完成: 本轮处理 ${selectedTasks.length} 条。`);
    return;
  }

  const workerCount = Math.min(Math.max(1, parallelModels), modelList.length, Math.max(1, selectedTasks.length));
  const workerModels = modelList.slice(0, workerCount);
  let successCount = 0;
  let processedCount = 0;
  const disabledModels = new Set();

  function pickActiveModel(startIndex = 0) {
    if (disabledModels.size >= modelList.length) return null;
    for (let i = 0; i < modelList.length; i++) {
      const m = modelList[(startIndex + i) % modelList.length];
      if (!disabledModels.has(m)) return m;
    }
    return null;
  }

  async function runWorker(workerId, model) {
    let adaptiveDelayMs = delayMs;
    let currentModel = model;
    for (let idx = workerId; idx < selectedTasks.length; idx += workerCount) {
      const t = selectedTasks[idx];
      const { item, webpPath } = t;
      const label = `${item.id ?? item.english} → ${relativeToRoot(webpPath)}`;
      mkdirSync(dirname(webpPath), { recursive: true });

      try {
        if (disabledModels.has(currentModel)) {
          const switched = pickActiveModel(workerId + idx + 1);
          if (!switched) {
            throw new Error('全部模型都已被限流禁用，停止本轮。');
          }
          currentModel = switched;
          console.log(`  ↪ [队列${workerId + 1}] 切换模型为: ${currentModel}`);
        }

        console.log(`\n[${idx + 1}/${selectedTasks.length}] [队列${workerId + 1}:${currentModel}] 生成中: ${label}`);
        const url = buildPollinationsUrl(item, currentModel);
        const raw = await fetchImageBufferWithRetry(url, heartbeatMs, {
          maxAttempts: 6,
          baseBackoffMs: Math.max(4000, adaptiveDelayMs || 5000),
          abortOn429: true,
          onBackoff: ({ status, backoffMs }) => {
            if (status === 429) {
              adaptiveDelayMs = Math.max(adaptiveDelayMs || 0, Math.min(60_000, Math.round(backoffMs * 0.6)));
            }
          },
        });
        console.log(`  → 正在压缩为 WebP（目标 ≤ ${maxKb}KB）…`);
        const { buffer, width, quality, bytes } = await encodeWebpUnderLimit(sharpMod, raw, maxBytes);
        writeFileSync(webpPath, buffer);
        console.log(`  已写 WebP ${relativeToRoot(webpPath)}  ${(bytes / 1024).toFixed(1)}KB  (边长约${width}px, q=${quality})`);
        successCount++;
      } catch (e) {
        if (e && typeof e === 'object' && 'status' in e && e.status === 429) {
          if (!disabledModels.has(currentModel)) {
            disabledModels.add(currentModel);
            console.log(`  ⚠️ 模型 ${currentModel} 触发 429，已在本轮禁用，不再使用。`);
          }
          const switched = pickActiveModel(workerId + idx + 1);
          if (switched) {
            currentModel = switched;
            console.log(`  ↪ [队列${workerId + 1}] 后续改用模型: ${currentModel}`);
          }
        }
        console.error(`  失败: ${label}`, e.message || e);
      }

      processedCount++;
      if (adaptiveDelayMs > 0 && idx + workerCount < selectedTasks.length) {
        console.log(`  ⏳ [队列${workerId + 1}] 间隔 ${adaptiveDelayMs}ms 后继续下一条…\n`);
        await sleep(adaptiveDelayMs);
      }
    }
  }

  await Promise.all(workerModels.map((model, i) => runWorker(i, model)));
  if (disabledModels.size > 0) {
    console.log(`\n本轮已禁用模型（触发 429）: ${Array.from(disabledModels).join(', ')}`);
  }
  console.log(`\n完成: 成功 ${successCount} 条，尝试 ${processedCount} 条。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
