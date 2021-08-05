var __exports;
__exports = function formatValue(v, options, type) {
    if (options.autopadding !== true) {
        return v;
    }
    function autopadding(value, length) {
        return (options.autopaddingChar + value).slice(-length);
    }
    switch (type) {
    case 'percentage':
        return autopadding(v, 3);
    default:
        return v;
    }
};
module.exports = __exports;