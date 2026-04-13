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

function parseArgs(argv) {
  const out = {
    dryRun: false,
    force: false,
    limit: 0,
    delayMs: 900,
    heartbeatMs: 8000,
    maxKb: 100,
    vocabularyPath: null,
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
    `Educational English flashcard, single clear subject: ${en}.${hint} ` +
    `Style: semi-realistic cartoon — soft shading, rounded forms, readable textures and colors like a polished reference illustration for kids; cute but faithful to how the real thing looks, not flat corporate clipart. ` +
    `Strictly non-anthropomorphic: no human-like faces or smiles pasted on animals, no animals standing upright like people, no clothing hats glasses or props that imply human characters, no human hands or arms; ` +
    `if it is an animal, show a natural species-typical pose; if food or object, show it plainly as itself. ` +
    `Centered composition, plain white background, gentle even lighting. No text, no letters, no watermark, no logo.`
  );
}

function buildPollinationsUrl(item) {
  const en = String(item.english ?? item.en ?? '').trim();
  const cn = String(item.chinese ?? item.cn ?? '').trim();
  const prompt = encodeURIComponent(buildFlashcardImagePrompt(en, cn));
  return `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true`;
}

async function fetchImageBuffer(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error('响应过小，可能不是有效图片');
  return buf;
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
  const { dryRun, force, limit, delayMs, heartbeatMs, maxKb, vocabularyPath } = parseArgs(process.argv.slice(2));
  const maxBytes = maxKb * 1024;

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

  console.log(`共 ${vocabulary.length} 条词汇，待写入 WebP（≤${maxKb}KB）: ${tasks.length} 条${dryRun ? '（dry-run）' : ''}`);
  if (!dryRun && tasks.length > 0) {
    console.log(`仅写入 .webp，不生成 PNG；超过 ${maxKb}KB 的已有 WebP 也会重压。\n`);
    console.log(`每条下载期间约每 ${heartbeatMs / 1000}s 打印一次进度；--delay 为每条完成后间隔。\n`);
  } else {
    console.log('');
  }

  let done = 0;
  for (const t of tasks) {
    if (limit > 0 && done >= limit) {
      console.log(`已达 --limit=${limit}，停止。`);
      break;
    }
    const { item, webpPath, imageUrl } = t;
    const label = `${item.id ?? item.english} → ${relativeToRoot(webpPath)}`;

    if (dryRun) {
      console.log(`[dry-run] ${label}`);
      done++;
      continue;
    }

    mkdirSync(dirname(webpPath), { recursive: true });

    try {
      const url = buildPollinationsUrl(item);
      console.log(`\n[${done + 1}/${tasks.length}] 生成中: ${label}`);
      const raw = await fetchImageBufferWithProgress(url, heartbeatMs);
      console.log('  → 正在压缩为 WebP（目标 ≤ ' + maxKb + 'KB）…');
      const { buffer, width, quality, bytes } = await encodeWebpUnderLimit(sharpMod, raw, maxBytes);
      writeFileSync(webpPath, buffer);
      console.log(
        `  已写 WebP ${relativeToRoot(webpPath)}  ${(bytes / 1024).toFixed(1)}KB  (边长约${width}px, q=${quality})`
      );
      done++;
    } catch (e) {
      console.error(`  失败: ${label}`, e.message || e);
    }

    if (delayMs > 0 && done < tasks.length && !(limit > 0 && done >= limit)) {
      console.log(`  ⏳ 间隔 ${delayMs}ms 后继续下一条…\n`);
      await sleep(delayMs);
    }
  }

  console.log(`\n完成: 本轮处理 ${done} 条。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
