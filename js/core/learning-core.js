export function calcAccuracy(correct, total) {
    if (!total || total <= 0) return 0;
    return Math.round((correct / total) * 100);
}

export function buildThemeSnapshot(rows = {}) {
    return Object.entries(rows)
        .map(([themeId, row]) => {
            const total = row?.total || 0;
            const correct = row?.correct || 0;
            return {
                themeId,
                total,
                correct,
                accuracy: calcAccuracy(correct, total)
            };
        })
        .sort((a, b) => b.total - a.total);
}

export function pickReviewWords(allWords = [], limit = 10) {
    if (!Array.isArray(allWords) || allWords.length === 0) return [];
    return [...allWords]
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
        .slice(0, Math.max(1, limit));
}

export function upsertReviewWord(reviewBook = {}, item = {}, now = Date.now()) {
    if (!item.id) return { ...reviewBook };
    return {
        ...reviewBook,
        [item.id]: {
            id: item.id,
            en: item.en || item.english || '',
            cn: item.cn || item.chinese || '',
            themeId: item.themeId || 'unknown',
            imageUrl: item.imageUrl || '',
            updatedAt: now
        }
    };
}

export function removeReviewWord(reviewBook = {}, wordId = '') {
    if (!wordId || !reviewBook[wordId]) return { ...reviewBook };
    const next = { ...reviewBook };
    delete next[wordId];
    return next;
}
