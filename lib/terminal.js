import {
    cursorTo,
    moveCursor,
    clearLine,
    clearScreenDown
} from 'readline';
var defaultExport = {};
var __exports;
class Terminal {
    constructor(outputStream) {
        this.stream = outputStream;
        this.linewrap = true;
        this.dy = 0;
    }
    cursorSave() {
        if (!this.stream.isTTY) {
            return;
        }
        this.stream.write('\x1B7');
    }
    cursorRestore() {
        if (!this.stream.isTTY) {
            return;
        }
        this.stream.write('\x1B8');
    }
    cursor(enabled) {
        if (!this.stream.isTTY) {
            return;
        }
        if (enabled) {
            this.stream.write('\x1B[?25h');
        } else {
            this.stream.write('\x1B[?25l');
        }
    }
    cursorTo(x = null, y = null) {
        if (!this.stream.isTTY) {
            return;
        }
        cursorTo(this.stream, x, y);
    }
    cursorRelative(dx = null, dy = null) {
        if (!this.stream.isTTY) {
            return;
        }
        this.dy = this.dy + dy;
        moveCursor(this.stream, dx, dy);
    }
    cursorRelativeReset() {
        if (!this.stream.isTTY) {
            return;
        }
        moveCursor(this.stream, 0, -this.dy);
        cursorTo(this.stream, 0, null);
        this.dy = 0;
    }
    clearRight() {
        if (!this.stream.isTTY) {
            return;
        }
        clearLine(this.stream, 1);
    }
    clearLine() {
        if (!this.stream.isTTY) {
            return;
        }
        clearLine(this.stream, 0);
    }
    clearBottom() {
        if (!this.stream.isTTY) {
            return;
        }
        clearScreenDown(this.stream);
    }
    newline() {
        this.stream.write('\n');
        this.dy++;
    }
    write(s) {
        if (this.linewrap === true) {
            this.stream.write(s.substr(0, this.getWidth()));
        } else {
            this.stream.write(s);
        }
    }
    lineWrapping(enabled) {
        if (!this.stream.isTTY) {
            return;
        }
        this.linewrap = enabled;
        if (enabled) {
            this.stream.write('\x1B[?7h');
        } else {
            this.stream.write('\x1B[?7l');
        }
    }
    isTTY() {
        return this.stream.isTTY === true;
    }
    getWidth() {
        return this.stream.columns || (this.stream.isTTY ? 80 : 200);
    }
}
__exports = Terminal;
defaultExport = __exports;
export default defaultExport;