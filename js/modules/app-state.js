(function initAppStateModule(global) {
    const AppStateModule = {
        createAppState(initialCategory, initialAgeLevel) {
            return {
                currentCategory: initialCategory,
                currentMode: 'flashcards',
                currentQuestion: null,
                isGameLoading: false,
                ageLevel: initialAgeLevel
            };
        },
        createMatchingState() {
            return {
                words: [],
                images: [],
                connections: new Map(),
                selectedWord: null,
                selectedImage: null,
                isCompleted: false,
                isProcessing: false
            };
        },
        createDictationState() {
            return {
                words: [],
                currentIndex: 0,
                currentWord: null,
                correctCount: 0,
                totalCount: 0,
                isCompleted: false,
                currentLetters: [],
                shuffledLetters: [],
                usedLetters: new Set(),
                currentAnswer: []
            };
        },
        createTtsState() {
            return {
                voicesLoaded: false,
                preferredVoice: null,
                warmedUp: false,
                settings: {
                    speedPreset: localStorage.getItem('tts.speedPreset') || 'slow',
                    voicePreference: localStorage.getItem('tts.voicePreference') || 'auto',
                    voiceName: localStorage.getItem('tts.voiceName') || ''
                }
            };
        }
    };

    global.AppStateModule = AppStateModule;
})(window);
