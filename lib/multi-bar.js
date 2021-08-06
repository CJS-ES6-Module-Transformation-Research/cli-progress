import _Terminal from './terminal.js';
import _BarElement from './generic-bar.js';
import _options from './options.js';
import _EventEmitter from 'events';
var defaultExport = {};
var __exports;
__exports = class MultiBar extends _EventEmitter {
    constructor(options, preset) {
        super();
        this.bars = [];
        this.options = _options.parse(options, preset);
        this.options.synchronousUpdate = false;
        this.terminal = this.options.terminal ? this.options.terminal : new _Terminal(this.options.stream);
        this.timer = null;
        this.isActive = false;
        this.schedulingRate = this.terminal.isTTY() ? this.options.throttleTime : this.options.notTTYSchedule;
    }
    create(total, startValue, payload) {
        if (this.options.noTTYOutput === false && this.terminal.isTTY() === false) {
            return;
        }
        const bar = new _BarElement(this.options);
        this.bars.push(bar);
        if (!this.isActive) {
            if (this.options.hideCursor === true) {
                this.terminal.cursor(false);
            }
            if (this.options.linewrap === false) {
                this.terminal.lineWrapping(false);
            }
            this.timer = setTimeout(this.update.bind(this), this.schedulingRate);
        }
        this.isActive = true;
        bar.start(total, startValue, payload);
        this.emit('start');
        return bar;
    }
    remove(bar) {
        const index = this.bars.indexOf(bar);
        if (index < 0) {
            return false;
        }
        this.bars.splice(index, 1);
        this.update();
        this.terminal.newline();
        this.terminal.clearBottom();
        return true;
    }
    update() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.emit('update-pre');
        this.terminal.cursorRelativeReset();
        this.emit('redraw-pre');
        for (let i = 0; i < this.bars.length; i++) {
            if (i > 0) {
                this.terminal.newline();
            }
            this.bars[i].render();
        }
        this.emit('redraw-post');
        if (this.options.noTTYOutput && this.terminal.isTTY() === false) {
            this.terminal.newline();
            this.terminal.newline();
        }
        this.timer = setTimeout(this.update.bind(this), this.schedulingRate);
        this.emit('update-post');
        if (this.options.stopOnComplete && !this.bars.find(bar => bar.isActive)) {
            this.stop();
        }
    }
    stop() {
        clearTimeout(this.timer);
        this.timer = null;
        this.isActive = false;
        if (this.options.hideCursor === true) {
            this.terminal.cursor(true);
        }
        if (this.options.linewrap === false) {
            this.terminal.lineWrapping(true);
        }
        this.terminal.cursorRelativeReset();
        this.emit('stop-pre-clear');
        if (this.options.clearOnComplete) {
            this.terminal.clearBottom();
        } else {
            for (let i = 0; i < this.bars.length; i++) {
                if (i > 0) {
                    this.terminal.newline();
                }
                this.bars[i].render();
                this.bars[i].stop();
            }
            this.terminal.newline();
        }
        this.emit('stop');
    }
};
defaultExport = __exports;
export default defaultExport;