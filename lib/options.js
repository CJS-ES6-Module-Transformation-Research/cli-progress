var __exports;
function mergeOption(v, defaultValue) {
    if (typeof v === 'undefined' || v === null) {
        return defaultValue;
    } else {
        return v;
    }
}
__exports = {
    parse: function parse(rawOptions, preset) {
        const options = {};
        const opt = Object.assign({}, preset, rawOptions);
        options.throttleTime = 1000 / mergeOption(opt.fps, 10);
        options.stream = mergeOption(opt.stream, process.stderr);
        options.terminal = mergeOption(opt.terminal, null);
        options.clearOnComplete = mergeOption(opt.clearOnComplete, false);
        options.stopOnComplete = mergeOption(opt.stopOnComplete, false);
        options.barsize = mergeOption(opt.barsize, 40);
        options.align = mergeOption(opt.align, 'left');
        options.hideCursor = mergeOption(opt.hideCursor, false);
        options.linewrap = mergeOption(opt.linewrap, false);
        options.barCompleteString = new Array(options.barsize + 1).join(opt.barCompleteChar || '=');
        options.barIncompleteString = new Array(options.barsize + 1).join(opt.barIncompleteChar || '-');
        options.barGlue = mergeOption(opt.barGlue, '');
        options.format = mergeOption(opt.format, 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}');
        options.formatTime = mergeOption(opt.formatTime, null);
        options.formatValue = mergeOption(opt.formatValue, null);
        options.formatBar = mergeOption(opt.formatBar, null);
        options.etaBufferLength = mergeOption(opt.etaBuffer, 10);
        options.etaAsynchronousUpdate = mergeOption(opt.etaAsynchronousUpdate, false);
        options.synchronousUpdate = mergeOption(opt.synchronousUpdate, true);
        options.noTTYOutput = mergeOption(opt.noTTYOutput, false);
        options.notTTYSchedule = mergeOption(opt.notTTYSchedule, 2000);
        options.emptyOnZero = mergeOption(opt.emptyOnZero, false);
        options.forceRedraw = mergeOption(opt.forceRedraw, false);
        options.autopadding = mergeOption(opt.autopadding, false);
        options.autopaddingChar = options.autopadding ? mergeOption(opt.autopaddingChar, '   ') : '';
        return options;
    }
};
module.exports = __exports;