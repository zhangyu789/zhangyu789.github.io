(function initDashboardViewModule(global) {
    function render(container, dashboard) {
        if (!container) return;
        const core = global.LearningCoreRuntime;
        const snapshot = core
            ? core.buildThemeSnapshot(dashboard?.byTheme || {}).slice(0, 3)
            : [];

        const themeRows = snapshot
            .map((row) => `<li><span>${row.themeId}</span><span>${row.accuracy}% (${row.correct}/${row.total})</span></li>`)
            .join('');

        container.innerHTML = `
          <div class="learning-dashboard-card">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="flex flex-wrap gap-2">
                <span class="learning-dashboard-chip">📚 练习总题数 <b>${dashboard.rounds}</b></span>
                <span class="learning-dashboard-chip">🎯 正确率 <b>${dashboard.accuracy}%</b></span>
                <span class="learning-dashboard-chip">🧠 错题本 <b>${dashboard.reviewCount}</b></span>
              </div>
              <div class="flex gap-2">
                <button id="start-review-dictation" class="learning-dashboard-btn review">错题听写</button>
                <button id="clear-review-book" class="learning-dashboard-btn clear">清空错题</button>
              </div>
            </div>
            <div class="mt-3 rounded-xl bg-white/65 p-3">
              <div class="text-xs font-semibold text-gray-500 mb-1">主题表现 Top 3</div>
              <ul class="learning-theme-list text-gray-700">${themeRows || '<li><span>暂无主题统计</span><span>--</span></li>'}</ul>
            </div>
          </div>
        `;
    }

    global.DashboardViewModule = { render };
})(window);
