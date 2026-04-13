(function initSpeechQueueModule(global) {
    function createSpeechQueue(options = {}) {
        const queueState = {
            isPlaying: false,
            queue: []
        };

        function process() {
            if (queueState.isPlaying || queueState.queue.length === 0) return;
            queueState.isPlaying = true;
            const { text, payload } = queueState.queue.shift();

            try {
                if ('speechSynthesis' in window) {
                    options.onBeforeSpeak?.();
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'en-US';
                    const preferredVoice = options.getPreferredVoice?.();
                    if (preferredVoice) utterance.voice = preferredVoice;

                    const baseRate = typeof payload.rate === 'number' ? payload.rate : 0.78;
                    const rateScale = options.getRateScale?.() || 1.0;
                    utterance.rate = Math.max(0.45, Math.min(1.0, baseRate * rateScale));
                    utterance.pitch = typeof payload.pitch === 'number' ? payload.pitch : (options.getDefaultPitch?.() || 1.0);
                    utterance.volume = typeof payload.volume === 'number' ? payload.volume : (options.getDefaultVolume?.() || 1.0);

                    utterance.onend = () => {
                        queueState.isPlaying = false;
                        setTimeout(process, 200);
                    };
                    utterance.onerror = (event) => {
                        console.log('Speech synthesis error:', event.error);
                        queueState.isPlaying = false;
                        setTimeout(process, 200);
                    };
                    window.speechSynthesis.speak(utterance);
                } else {
                    queueState.isPlaying = false;
                    setTimeout(process, 200);
                }
            } catch (error) {
                console.log('Speech synthesis failed:', error);
                queueState.isPlaying = false;
                setTimeout(process, 200);
            }
        }

        return {
            add(text, payload = {}) {
                queueState.queue.push({ text, payload });
                process();
            },
            clear() {
                queueState.queue = [];
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
                queueState.isPlaying = false;
            }
        };
    }

    global.SpeechQueueModule = { createSpeechQueue };
})(window);
