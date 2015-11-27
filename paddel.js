'use strict';
(function (exports) {
    var Paddel = function () {
        this.paddelWidth;
        this.paddelHeight;
        var c = document.getElementById("canvas");
        this.canvas = c.getContext("2d");
        this.bulletMode;
        this.ammo;
        this.x = 130;
        this.y = 450;
    }
    Paddel.prototype = {
        draw() {
                this.paddelWidth = 60;
                this.paddelHeight = 10;
                this.canvas.fillStyle = "#ffe4e1";
                this.canvas.fillRect(this.x, this.y, this.paddelWidth, this.paddelHeight);
            },
            setWidth(width) {
                this.paddelWidth = width;

            },
            updatePosition(x) {
                this.canvas.clearRect(this.x, this.y, this.paddelWidth, this.paddelHeight);
                this.canvas.fillStyle = "#ffe4e1";
                var ltX = x - this.paddelWidth / 2;
                if (x - this.paddelWidth / 2 + this.paddelWidth > 320) {
                    ltX = 260;
                } else if (x - this.paddelWidth / 2 < 0) {
                    ltX = 0;
                }
                this.canvas.fillRect(ltX, this.y, this.paddelWidth, this.paddelHeight);
                this.x = ltX;
            }
    };
    exports.Paddel = Paddel;

})(window)