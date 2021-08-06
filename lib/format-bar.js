var __exports;
__exports = function formatBar(progress, options) {
    const completeSize = Math.round(progress * options.barsize);
    const incompleteSize = options.barsize - completeSize;
    return options.barCompleteString.substr(0, completeSize) + options.barGlue + options.barIncompleteString.substr(0, incompleteSize);
};
module.exports = __exports;