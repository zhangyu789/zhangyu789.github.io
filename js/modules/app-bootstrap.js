(function initAppBootstrapModule(global) {
    function bindCoreEvents(ctx) {
        const {
            modeButtons,
            sidebar,
            gameQuestionWordEl,
            matchingButtons,
            dictationButtons,
            appState,
            speakWord,
            speechQueue,
            handlers
        } = ctx;

        modeButtons.flashcards?.addEventListener('click', () => handlers.setMode('flashcards'));
        modeButtons.game?.addEventListener('click', () => handlers.setMode('game'));
        modeButtons.matching?.addEventListener('click', () => handlers.setMode('matching'));
        modeButtons.dictation?.addEventListener('click', () => handlers.setMode('dictation'));

        sidebar.menuToggle?.addEventListener('click', handlers.toggleMenu);
        sidebar.menuBackdrop?.addEventListener('click', handlers.toggleMenu);
        sidebar.desktopSidebarToggle?.addEventListener('click', handlers.toggleDesktopSidebar);
        sidebar.sidebarToggle?.addEventListener('click', handlers.toggleMenu);

        gameQuestionWordEl?.addEventListener('click', () => {
            if (!appState.currentQuestion) return;
            speechQueue.clear();
            speakWord(appState.currentQuestion.en, 0.66, 1.0, 1.0);
        });

        matchingButtons.check?.addEventListener('click', handlers.checkMatchingAnswers);
        matchingButtons.reset?.addEventListener('click', handlers.resetMatchingGame);

        dictationButtons.play?.addEventListener('click', handlers.playDictationWord);
        dictationButtons.submit?.addEventListener('click', handlers.submitDictationAnswer);
        dictationButtons.skip?.addEventListener('click', handlers.skipDictationQuestion);
        dictationButtons.clear?.addEventListener('click', handlers.clearDictationAnswer);
        dictationButtons.feedbackClose?.addEventListener('click', handlers.hideDictationFeedback);
    }

    function bootstrap(ctx) {
        ctx.systems.learningProgress.init();
        ctx.systems.rewardSystem.init();
        ctx.handlers.initAgeLevelControlsUI();
        ctx.handlers.initTtsControlsUI();
        ctx.handlers.initDashboardPanelUI();
        ctx.handlers.renderCategoryButtons();
        ctx.appState.currentCategory = ctx.handlers.findFirstNonEmptyCategory();
        bindCoreEvents(ctx);
        ctx.handlers.setMode('flashcards');
        ctx.systems.rewardSystem.checkBadges();
        ctx.handlers.updateProgressDisplay();
    }

    global.AppBootstrapModule = { bootstrap };
})(window);
