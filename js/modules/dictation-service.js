(function initDictationServiceModule(global) {
    function buildRoundState(selectedWords = []) {
        return {
            words: selectedWords,
            currentIndex: 0,
            correctCount: 0,
            totalCount: selectedWords.length,
            isCompleted: false
        };
    }

    function getCurrentWord(words = [], currentIndex = 0) {
        if (!Array.isArray(words) || currentIndex < 0 || currentIndex >= words.length) return null;
        return words[currentIndex];
    }

    function shouldFinish(words = [], currentIndex = 0) {
        return currentIndex >= (words?.length || 0);
    }

    global.DictationServiceModule = {
        buildRoundState,
        getCurrentWord,
        shouldFinish
    };
})(window);
