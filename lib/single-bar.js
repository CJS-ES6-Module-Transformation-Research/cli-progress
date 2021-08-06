import _GenericBar from './generic-bar.js';
import _options from './options.js';
var defaultExport = {};
var __exports;
__exports = class SingleBar extends _GenericBar {
    constructor(options, preset) {
        super(_options.parse(options, preset));
        this.timer = null;
        if (this.options.noTTYOutput && this.terminal.isTTY() === false) {
            this.options.synchronousUpdate = false;
        }
        this.schedulingRate = this.terminal.isTTY() ? this.options.throttleTime : this.options.notTTYSchedule;
    }
    render() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        super.render();
        if (this.options.noTTYOutput && this.terminal.isTTY() === false) {
            this.terminal.newline();
        }
        this.timer = setTimeout(this.render.bind(this), this.schedulingRate);
    }
    update(current, payload) {
        if (!this.timer) {
            return;
        }
        super.update(current, payload);
        if (this.options.synchronousUpdate && this.lastRedraw + this.options.throttleTime * 2 < Date.now()) {
            this.render();
        }
    }
    start(total, startValue, payload) {
        if (this.options.noTTYOutput === false && this.terminal.isTTY() === false) {
            return;
        }
        this.terminal.cursorSave();
        if (this.options.hideCursor === true) {
            this.terminal.cursor(false);
        }
        if (this.options.linewrap === false) {
            this.terminal.lineWrapping(false);
        }
        super.start(total, startValue, payload);
        this.render();
    }
    stop() {
        if (!this.timer) {
            return;
        }
        this.render();
        super.stop();
        clearTimeout(this.timer);
        this.timer = null;
        if (this.options.hideCursor === true) {
            this.terminal.cursor(true);
        }
        if (this.options.linewrap === false) {
            this.terminal.lineWrapping(true);
        }
        this.terminal.cursorRestore();
        if (this.options.clearOnComplete) {
            this.terminal.cursorTo(0, null);
            this.terminal.clearLine();
        } else {
            this.terminal.newline();
        }
    }
};
defaultExport = __exports;
export default defaultExport;