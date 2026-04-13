(function initPerfProfileModule(global) {
    function detectProfile() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        const lowPower = memory <= 2 || cores <= 2;
        return {
            reducedMotion: prefersReduced,
            lowPower,
            confettiCount: prefersReduced ? 0 : (lowPower ? 36 : 120),
            animationEnabled: !prefersReduced
        };
    }

    global.PerfProfileModule = { detectProfile };
})(window);
