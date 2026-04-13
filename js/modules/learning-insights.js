(function initLearningInsightsModule(global) {
    const REVIEW_KEY = 'learning.reviewBook';
    const STATS_KEY = 'learning.sessionStats';

    function safeJsonParse(raw, fallback) {
        try {
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    function createInsightsStore() {
        const core = global.LearningCoreRuntime;
        let reviewBook = safeJsonParse(localStorage.getItem(REVIEW_KEY), {});
        const sessionStats = safeJsonParse(localStorage.getItem(STATS_KEY), {
            rounds: 0,
            correct: 0,
            wrong: 0,
            byTheme: {}
        });

        function persist() {
            localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewBook));
            localStorage.setItem(STATS_KEY, JSON.stringify(sessionStats));
        }

        return {
            recordResult(item, isCorrect) {
                if (!item || !item.id) return;
                const theme = item.themeId || 'unknown';
                if (!sessionStats.byTheme[theme]) {
                    sessionStats.byTheme[theme] = { total: 0, correct: 0, wrong: 0 };
                }
                sessionStats.rounds += 1;
                sessionStats.byTheme[theme].total += 1;
                if (isCorrect) {
                    sessionStats.correct += 1;
                    sessionStats.byTheme[theme].correct += 1;
                } else {
                    sessionStats.wrong += 1;
                    sessionStats.byTheme[theme].wrong += 1;
                    reviewBook = core
                        ? core.upsertReviewWord(reviewBook, { ...item, themeId: theme }, Date.now())
                        : reviewBook;
                }
                persist();
            },
            clearReviewWord(wordId) {
                reviewBook = core ? core.removeReviewWord(reviewBook, wordId) : reviewBook;
                persist();
            },
            getReviewWords() {
                const words = Object.values(reviewBook);
                return core ? core.pickReviewWords(words, words.length || 1) : words;
            },
            getDashboard() {
                const accuracy = core
                    ? core.calcAccuracy(sessionStats.correct, sessionStats.rounds)
                    : 0;
                return {
                    rounds: sessionStats.rounds,
                    correct: sessionStats.correct,
                    wrong: sessionStats.wrong,
                    accuracy,
                    reviewCount: Object.keys(reviewBook).length,
                    byTheme: sessionStats.byTheme
                };
            }
        };
    }

    global.LearningInsightsModule = { createInsightsStore };
})(window);
