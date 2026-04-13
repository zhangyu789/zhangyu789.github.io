(function initMatchingServiceModule(global) {
    function isImageUsed(connections, imageId) {
        if (!connections) return false;
        for (const [, usedImageId] of connections.entries()) {
            if (usedImageId === imageId) return true;
        }
        return false;
    }

    function canUsePair(connections, wordId, imageId) {
        const wordUsed = connections?.has(wordId);
        const imageUsed = isImageUsed(connections, imageId);
        return {
            canUse: !wordUsed && !imageUsed,
            wordUsed,
            imageUsed
        };
    }

    function isCorrectPair(words = [], images = [], wordId, imageId) {
        const selectedWord = words.find((w) => w.id === wordId);
        const selectedImage = images.find((i) => i.id === imageId);
        return Boolean(selectedWord && selectedImage && selectedWord.en === selectedImage.en);
    }

    function isMatchingCompleted(words = [], connections = new Map()) {
        const total = Math.min(4, words.length || 0);
        return total > 0 && (connections?.size || 0) >= total;
    }

    global.MatchingServiceModule = {
        isImageUsed,
        canUsePair,
        isCorrectPair,
        isMatchingCompleted
    };
})(window);
