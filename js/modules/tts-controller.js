(function initTtsControllerModule(global) {
    function pickPreferredEnglishVoice(voices, settings = {}) {
        if (!Array.isArray(voices) || voices.length === 0) return null;
        const englishVoices = voices.filter((v) => /^en(-|_)/i.test(v.lang || ''));
        const pool = englishVoices.length > 0 ? englishVoices : voices;

        if (settings.voiceName) {
            const exact = pool.find((v) => (v.name || '') === settings.voiceName);
            if (exact) return exact;
        }

        const pref = settings.voicePreference || 'auto';
        const femaleHints = ['female', 'woman', 'girl', 'samantha', 'serena', 'zira', 'aria', 'ava', 'emma', 'luna', 'mia'];
        const maleHints = ['male', 'man', 'boy', 'daniel', 'alex', 'david', 'tom', 'ryan', 'guy', 'james'];
        const filteredPool = pool.filter((v) => {
            const name = (v.name || '').toLowerCase();
            if (pref === 'female') return femaleHints.some((h) => name.includes(h));
            if (pref === 'male') return maleHints.some((h) => name.includes(h));
            return true;
        });
        const candidatePool = filteredPool.length > 0 ? filteredPool : pool;

        const preferredNameHints = ['Neural', 'Natural', 'Google US English', 'Google UK English', 'Microsoft', 'Samantha', 'Daniel', 'Alex', 'Serena'];
        for (const hint of preferredNameHints) {
            const found = candidatePool.find((v) => (v.name || '').toLowerCase().includes(hint.toLowerCase()));
            if (found) return found;
        }

        const enUS = candidatePool.find((v) => (v.lang || '').toLowerCase().startsWith('en-us'));
        return enUS || candidatePool[0] || null;
    }

    function refreshTtsVoices(ttsState) {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;
        ttsState.preferredVoice = pickPreferredEnglishVoice(voices, ttsState.settings);
        ttsState.voicesLoaded = true;
    }

    function applyTtsSettings(ttsState, partial = {}, hooks = {}) {
        ttsState.settings = { ...ttsState.settings, ...partial };
        localStorage.setItem('tts.speedPreset', ttsState.settings.speedPreset);
        localStorage.setItem('tts.voicePreference', ttsState.settings.voicePreference);
        localStorage.setItem('tts.voiceName', ttsState.settings.voiceName || '');
        if (typeof hooks.onRefresh === 'function') hooks.onRefresh();
        if (typeof hooks.onUpdateOptions === 'function') hooks.onUpdateOptions();
    }

    function updateTtsVoiceOptions(ttsState, hooks = {}) {
        const voiceListSelect = document.getElementById('tts-voice-list-select');
        if (!voiceListSelect || !('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices() || [];
        const englishVoices = voices.filter((v) => /^en(-|_)/i.test(v.lang || ''));
        const list = englishVoices.length > 0 ? englishVoices : voices;

        const prev = ttsState.settings.voiceName || '';
        voiceListSelect.innerHTML = '<option value="">系统自动选择</option>';
        list.forEach((v) => {
            const opt = document.createElement('option');
            opt.value = v.name || '';
            opt.textContent = `${v.name} (${v.lang})`;
            voiceListSelect.appendChild(opt);
        });
        voiceListSelect.value = prev;
        if (prev && voiceListSelect.value !== prev && typeof hooks.onInvalidVoiceFallback === 'function') {
            hooks.onInvalidVoiceFallback();
        }
    }

    function initTtsControlsUI(appSubtitle, ttsState, hooks = {}) {
        if (!appSubtitle || document.getElementById('tts-controls')) return;
        const wrap = document.createElement('div');
        wrap.id = 'tts-controls';
        wrap.className = 'mt-3 flex flex-wrap items-center justify-center gap-3 text-sm';
        wrap.innerHTML = `
          <label class="text-gray-600">朗读速度
            <select id="tts-speed-select" class="ml-1 px-2 py-1 border rounded-lg">
              <option value="verySlow">超慢</option>
              <option value="slow">慢（推荐）</option>
              <option value="normal">标准</option>
            </select>
          </label>
          <label class="text-gray-600">音色
            <select id="tts-voice-select" class="ml-1 px-2 py-1 border rounded-lg">
              <option value="auto">自动</option>
              <option value="female">女声优先</option>
              <option value="male">男声优先</option>
            </select>
          </label>
          <label class="text-gray-600">具体音色
            <select id="tts-voice-list-select" class="ml-1 px-2 py-1 border rounded-lg max-w-xs">
              <option value="">系统自动选择</option>
            </select>
          </label>
        `;
        appSubtitle.insertAdjacentElement('afterend', wrap);

        const speedSelect = document.getElementById('tts-speed-select');
        const voiceSelect = document.getElementById('tts-voice-select');
        const voiceListSelect = document.getElementById('tts-voice-list-select');
        if (speedSelect) {
            speedSelect.value = ttsState.settings.speedPreset;
            speedSelect.addEventListener('change', () => hooks.onApply?.({ speedPreset: speedSelect.value }));
        }
        if (voiceSelect) {
            voiceSelect.value = ttsState.settings.voicePreference;
            voiceSelect.addEventListener('change', () => hooks.onApply?.({ voicePreference: voiceSelect.value }));
        }
        if (voiceListSelect) {
            hooks.onUpdateOptions?.();
            voiceListSelect.addEventListener('change', () => hooks.onApply?.({ voiceName: voiceListSelect.value || '' }));
        }
    }

    global.TtsControllerModule = {
        pickPreferredEnglishVoice,
        refreshTtsVoices,
        applyTtsSettings,
        updateTtsVoiceOptions,
        initTtsControlsUI
    };
})(window);
