(function initDictationInteractionModule(global) {
    function selectLetter(ctx) {
        const {
            letterIndex,
            cardElement,
            state,
            dictationWordDisplayEl,
            onPlayClick,
            onSubmit
        } = ctx;

        if (state.usedLetters.has(letterIndex)) return;
        const nextPosition = state.currentAnswer.length;
        if (nextPosition >= state.currentLetters.length) return;

        state.usedLetters.add(letterIndex);
        const letter = state.shuffledLetters[letterIndex];
        state.currentAnswer.push({ letter, sourceIndex: letterIndex });
        cardElement.style.pointerEvents = 'none';

        const targetLetterEl = dictationWordDisplayEl.querySelector(`[data-position="${nextPosition}"]`);
        if (!targetLetterEl) return;

        const cardRect = cardElement.getBoundingClientRect();
        const targetRect = targetLetterEl.getBoundingClientRect();
        const flyX = targetRect.left - cardRect.left;
        const flyY = targetRect.top - cardRect.top;

        cardElement.style.setProperty('--fly-x', `${flyX}px`);
        cardElement.style.setProperty('--fly-y', `${flyY}px`);
        cardElement.classList.add('anim-fly-to-word');

        setTimeout(() => {
            targetLetterEl.textContent = letter.toUpperCase();
            targetLetterEl.style.background = '#dbeafe';
            targetLetterEl.style.borderColor = '#3b82f6';
            targetLetterEl.classList.add('filled', 'pop');
            setTimeout(() => targetLetterEl.classList.remove('pop'), 250);

            cardElement.classList.add('used');
            cardElement.classList.remove('anim-fly-to-word');
            cardElement.style.opacity = '0.5';
            cardElement.style.pointerEvents = 'none';
            onPlayClick?.();

            const container = dictationWordDisplayEl;
            const slotRect = targetLetterEl.getBoundingClientRect();
            const contRect = container.getBoundingClientRect();
            if (slotRect.right > contRect.right - 8) {
                container.scrollLeft += (slotRect.right - contRect.right) + 16;
            }

            if (state.currentAnswer.length === state.currentLetters.length) {
                setTimeout(() => onSubmit?.(), 500);
            }
        }, 600);
    }

    function undoAt(ctx) {
        const {
            position,
            state,
            dictationLetterCardsEl,
            dictationWordDisplayEl,
            onPlayClick
        } = ctx;

        if (position < 0 || position >= state.currentLetters.length) return;
        if (position >= state.currentAnswer.length) return;

        const removed = state.currentAnswer.splice(position, 1)[0];
        if (!removed) return;

        const card = dictationLetterCardsEl.querySelector(`.letter-card[data-letter-index="${removed.sourceIndex}"]`);
        if (!card) return;

        const wordSlot = dictationWordDisplayEl.querySelector(`[data-position="${position}"]`);
        if (!wordSlot) {
            state.usedLetters.delete(removed.sourceIndex);
            card.classList.remove('used');
            onPlayClick?.();
            return;
        }

        const cardRect = card.getBoundingClientRect();
        const slotRect = wordSlot.getBoundingClientRect();
        const flyX = cardRect.left - slotRect.left;
        const flyY = cardRect.top - slotRect.top;
        card.style.setProperty('--fly-x', `${flyX}px`);
        card.style.setProperty('--fly-y', `${flyY}px`);
        card.classList.add('anim-fly-back');

        setTimeout(() => {
            state.usedLetters.delete(removed.sourceIndex);
            card.classList.remove('used', 'anim-fly-back');

            const slots = dictationWordDisplayEl.querySelectorAll('.word-letter');
            state.currentLetters.forEach((_, idx) => {
                const slot = slots[idx];
                if (!slot) return;
                const ans = state.currentAnswer[idx];
                if (ans) {
                    slot.textContent = ans.letter.toUpperCase();
                    slot.style.background = '#dbeafe';
                    slot.style.borderColor = '#3b82f6';
                    slot.classList.add('filled');
                } else {
                    slot.textContent = '';
                    slot.style.background = '';
                    slot.style.borderColor = '';
                    slot.classList.remove('filled');
                }
            });

            onPlayClick?.();

            const container = dictationWordDisplayEl;
            const firstFilledIndex = Math.max(0, state.currentAnswer.length - 1);
            const firstFilled = dictationWordDisplayEl.querySelector(`[data-position="${firstFilledIndex}"]`);
            if (firstFilled) {
                const firstRect = firstFilled.getBoundingClientRect();
                const contRect = container.getBoundingClientRect();
                if (firstRect.left < contRect.left + 8) {
                    container.scrollLeft = Math.max(0, container.scrollLeft - (contRect.left + 16 - firstRect.left));
                }
            }
        }, 600);
    }

    global.DictationInteractionModule = {
        selectLetter,
        undoAt
    };
})(window);
