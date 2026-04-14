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

    function buildQuestionState(currentWord) {
        const letters = (currentWord?.en || '').split('');
        return {
            currentLetters: letters,
            shuffledLetters: [...letters].sort(() => Math.random() - 0.5),
            currentAnswer: []
        };
    }

    function evaluateAnswer(currentAnswer = [], currentWord = null) {
        const userAnswer = currentAnswer
            .map((x) => (typeof x === 'string' ? x : x.letter))
            .join('')
            .toLowerCase();
        const correctAnswer = (currentWord?.en || '').toLowerCase();
        return {
            userAnswer,
            correctAnswer,
            isCorrect: userAnswer === correctAnswer
        };
    }

    global.DictationServiceModule = {
        buildRoundState,
        getCurrentWord,
        shouldFinish,
        buildQuestionState,
        evaluateAnswer
    };
})(window);
