import { describe, expect, it } from 'vitest';
import {
    buildThemeSnapshot,
    calcAccuracy,
    pickReviewWords,
    removeReviewWord,
    upsertReviewWord
} from '../js/core/learning-core.js';

describe('learning core utils', () => {
    it('calculates accuracy safely', () => {
        expect(calcAccuracy(8, 10)).toBe(80);
        expect(calcAccuracy(0, 0)).toBe(0);
    });

    it('builds and sorts theme snapshot', () => {
        const snapshot = buildThemeSnapshot({
            colors: { total: 2, correct: 1 },
            animals: { total: 5, correct: 4 }
        });
        expect(snapshot[0].themeId).toBe('animals');
        expect(snapshot[0].accuracy).toBe(80);
    });

    it('picks review words by latest updatedAt', () => {
        const words = [
            { id: 'a', updatedAt: 1000 },
            { id: 'b', updatedAt: 3000 },
            { id: 'c', updatedAt: 2000 }
        ];
        expect(pickReviewWords(words, 2).map((x) => x.id)).toEqual(['b', 'c']);
    });

    it('upserts wrong word into review book', () => {
        const book = upsertReviewWord({}, {
            id: 'apple',
            en: 'apple',
            cn: '苹果',
            themeId: 'fruits',
            imageUrl: '/images/fruits/apple.webp'
        }, 1234);
        expect(book.apple.id).toBe('apple');
        expect(book.apple.updatedAt).toBe(1234);
    });

    it('upsert keeps latest timestamp for same word', () => {
        const book1 = upsertReviewWord({}, { id: 'dog', en: 'dog' }, 100);
        const book2 = upsertReviewWord(book1, { id: 'dog', en: 'dog' }, 999);
        expect(book2.dog.updatedAt).toBe(999);
    });

    it('removes review word after correct answer', () => {
        const book = upsertReviewWord({}, { id: 'cat', en: 'cat' }, 100);
        const next = removeReviewWord(book, 'cat');
        expect(next.cat).toBeUndefined();
    });

    it('pickReviewWords returns newest first after updates', () => {
        const book = {
            a: { id: 'a', updatedAt: 100 },
            b: { id: 'b', updatedAt: 800 },
            c: { id: 'c', updatedAt: 500 }
        };
        expect(pickReviewWords(Object.values(book), 3).map((x) => x.id)).toEqual(['b', 'c', 'a']);
    });
});
