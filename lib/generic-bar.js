import _ETA from './eta.js';
import _Terminal from './terminal.js';
import _formatter from './formatter.js';
import _EventEmitter from 'events';
var defaultExport = {};
var __exports;
__exports = class GenericBar extends _EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.terminal = this.options.terminal ? this.options.terminal : new _Terminal(this.options.stream);
        this.value = 0;
        this.total = 100;
        this.lastDrawnString = null;
        this.startTime = null;
        this.stopTime = null;
        this.lastRedraw = Date.now();
        this.eta = new _ETA(this.options.etaBufferLength, 0, 0);
        this.payload = {};
        this.isActive = false;
        this.formatter = typeof this.options.format === 'function' ? this.options.format : _formatter;
    }
    render() {
        let progress = this.value / this.total;
        if (isNaN(progress)) {
            progress = this.options && this.options.emptyOnZero ? 0 : 1;
        }
        progress = Math.min(Math.max(progress, 0), 1);
        const params = {
            progress: progress,
            eta: this.eta.getTime(),
            startTime: this.startTime,
            stopTime: this.stopTime,
            total: this.total,
            value: this.value,
            maxWidth: this.terminal.getWidth()
        };
        if (this.options.etaAsynchronousUpdate) {
            this.updateETA();
        }
        const s = this.formatter(this.options, params, this.payload);
        const forceRedraw = this.options.forceRedraw || this.options.noTTYOutput && !this.terminal.isTTY();
        if (forceRedraw || this.lastDrawnString != s) {
            this.emit('redraw-pre');
            this.terminal.cursorTo(0, null);
            this.terminal.write(s);
            this.terminal.clearRight();
            this.lastDrawnString = s;
            this.lastRedraw = Date.now();
            this.emit('redraw-post');
        }
    }
    start(total, startValue, payload) {
        this.value = startValue || 0;
        this.total = typeof total !== 'undefined' && total >= 0 ? total : 100;
        this.payload = payload || {};
        this.startTime = Date.now();
        this.stopTime = null;
        this.lastDrawnString = '';
        this.eta = new _ETA(this.options.etaBufferLength, this.startTime, this.value);
        this.isActive = true;
        this.emit('start', total, startValue);
    }
    stop() {
        this.isActive = false;
        this.stopTime = Date.now();
        this.emit('stop', this.total, this.value);
    }
    update(arg0, arg1 = {}) {
        if (typeof arg0 === 'number') {
            this.value = arg0;
            this.eta.update(Date.now(), arg0, this.total);
        }
        const payloadData = (typeof arg0 === 'object' ? arg0 : arg1) || {};
        this.emit('update', this.total, this.value);
        for (const key in payloadData) {
            this.payload[key] = payloadData[key];
        }
        if (this.value >= this.getTotal() && this.options.stopOnComplete) {
            this.stop();
        }
    }
    increment(arg0 = 1, arg1 = {}) {
        if (typeof arg0 === 'object') {
            this.update(this.value + 1, arg0);
        } else {
            this.update(this.value + arg0, arg1);
        }
    }
    getTotal() {
        return this.total;
    }
    setTotal(total) {
        if (typeof total !== 'undefined' && total >= 0) {
            this.total = total;
        }
    }
    updateETA() {
        this.eta.update(Date.now(), this.value, this.total);
    }
};
defaultExport = __exports;
export default defaultExport;