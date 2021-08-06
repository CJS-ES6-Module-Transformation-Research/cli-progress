var __exports;
__exports = function formatTime(t, options, roundToMultipleOf) {
    function round(input) {
        if (roundToMultipleOf) {
            return roundToMultipleOf * Math.round(input / roundToMultipleOf);
        } else {
            return input;
        }
    }
    function autopadding(v) {
        return (options.autopaddingChar + v).slice(-2);
    }
    if (t > 3600) {
        return autopadding(Math.floor(t / 3600)) + 'h' + autopadding(round(t % 3600 / 60)) + 'm';
    } else if (t > 60) {
        return autopadding(Math.floor(t / 60)) + 'm' + autopadding(round(t % 60)) + 's';
    } else if (t > 10) {
        return autopadding(round(t)) + 's';
    } else {
        return autopadding(t) + 's';
    }
};
module.exports = __exports;