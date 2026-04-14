import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';

function loadBrowserModule(relativePath) {
    const fullPath = path.resolve(process.cwd(), relativePath);
    const code = readFileSync(fullPath, 'utf8');
    const context = {
        window: {},
        console
    };
    vm.createContext(context);
    vm.runInContext(code, context);
    return context.window;
}

describe('matching service module', () => {
    const win = loadBrowserModule('js/modules/matching-service.js');
    const svc = win.MatchingServiceModule;

    it('detects used image in connections', () => {
        const connections = new Map([['w1', 'i1']]);
        expect(svc.isImageUsed(connections, 'i1')).toBe(true);
        expect(svc.isImageUsed(connections, 'i2')).toBe(false);
    });

    it('validates pair usability', () => {
        const connections = new Map([['w1', 'i1']]);
        expect(svc.canUsePair(connections, 'w2', 'i2').canUse).toBe(true);
        expect(svc.canUsePair(connections, 'w1', 'i2').canUse).toBe(false);
        expect(svc.canUsePair(connections, 'w2', 'i1').canUse).toBe(false);
    });

    it('checks correct pair and completion', () => {
        const words = [{ id: 'w1', en: 'cat' }, { id: 'w2', en: 'dog' }];
        const images = [{ id: 'i1', en: 'cat' }, { id: 'i2', en: 'dog' }];
        expect(svc.isCorrectPair(words, images, 'w1', 'i1')).toBe(true);
        expect(svc.isCorrectPair(words, images, 'w1', 'i2')).toBe(false);
        const connections = new Map([['w1', 'i1'], ['w2', 'i2']]);
        expect(svc.isMatchingCompleted(words, connections)).toBe(true);
    });
});

describe('dictation service module', () => {
    const win = loadBrowserModule('js/modules/dictation-service.js');
    const svc = win.DictationServiceModule;

    it('builds round state and resolves current word', () => {
        const words = [{ en: 'apple' }, { en: 'banana' }];
        const round = svc.buildRoundState(words);
        expect(round.totalCount).toBe(2);
        expect(svc.getCurrentWord(words, 1).en).toBe('banana');
        expect(svc.shouldFinish(words, 2)).toBe(true);
    });

    it('builds question state and evaluates answer', () => {
        const question = svc.buildQuestionState({ en: 'cat' });
        expect(question.currentLetters.join('')).toBe('cat');
        expect(question.currentAnswer).toEqual([]);

        const resultOk = svc.evaluateAnswer([{ letter: 'c' }, { letter: 'a' }, { letter: 't' }], { en: 'cat' });
        const resultBad = svc.evaluateAnswer([{ letter: 'c' }, { letter: 'a' }, { letter: 'r' }], { en: 'cat' });
        expect(resultOk.isCorrect).toBe(true);
        expect(resultBad.isCorrect).toBe(false);
        expect(resultBad.correctAnswer).toBe('cat');
    });
});
