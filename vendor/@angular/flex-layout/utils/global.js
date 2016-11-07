export function isDefined(value) {
    return typeof value !== 'undefined';
}
export function delay(fn, duration, scope) {
    if (duration === void 0) { duration = 1; }
    if (scope === void 0) { scope = null; }
    if (scope)
        fn = fn.bind(scope);
    setTimeout(function () { return fn(); }, duration);
}

//# sourceMappingURL=global.js.map
