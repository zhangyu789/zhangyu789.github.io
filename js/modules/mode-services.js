(function initModeServicesModule(global) {
    function getMatchingCheckState(words = [], connections = new Map()) {
        const total = Math.min(4, words.length || 0);
        const done = connections ? connections.size : 0;
        return {
            total,
            done,
            isCompleted: total > 0 && done >= total
        };
    }

    function pickDictationRoundWords({
        reviewWords = [],
        useReviewWords = false,
        categoryWords = [],
        maxCount = 10
    }) {
        const sourceWords = useReviewWords && reviewWords.length > 0
            ? reviewWords
            : categoryWords;

        if (!Array.isArray(sourceWords) || sourceWords.length === 0) {
            return {
                selectedWords: [],
                usedReviewWords: false
            };
        }

        const shuffled = [...sourceWords].sort(() => Math.random() - 0.5);
        return {
            selectedWords: shuffled.slice(0, Math.min(maxCount, sourceWords.length)),
            usedReviewWords: useReviewWords && reviewWords.length > 0
        };
    }

    global.ModeServicesModule = {
        getMatchingCheckState,
        pickDictationRoundWords
    };
})(window);
