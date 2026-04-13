(function initDashboardControllerModule(global) {
    function bindActions(container, handlers = {}) {
        if (!container) return;
        const reviewBtn = container.querySelector('#start-review-dictation');
        const clearBtn = container.querySelector('#clear-review-book');

        if (reviewBtn && typeof handlers.onReview === 'function') {
            reviewBtn.onclick = handlers.onReview;
        }
        if (clearBtn && typeof handlers.onClear === 'function') {
            clearBtn.onclick = handlers.onClear;
        }
    }

    function renderAndBind(container, dashboard, handlers = {}) {
        if (!container || !global.DashboardViewModule) return;
        global.DashboardViewModule.render(container, dashboard);
        bindActions(container, handlers);
    }

    global.DashboardControllerModule = {
        renderAndBind
    };
})(window);
