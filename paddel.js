'use strict';
(function (exports) {
    var Paddel = function () {
        this.paddelWidth = 60;
        this.paddelHeight = 10;
        var c = document.getElementById("canvas");
        this.canvas = c.getContext("2d");
        this.bulletMode = 0;
        this.ammo = 0;
        this.x = 130;
        this.y = 450;
    }
    Paddel.prototype = {
        draw() {
                this.canvas.beginPath();
                this.canvas.fillStyle = "#ffe4e1";
                this.canvas.fillRect(this.x, this.y, this.paddelWidth, this.paddelHeight);
                //this.closePath();
            },
            init() {
                //  this.canvas.clearRect(this.x, this.y, this.paddelWidth, this.paddelHeight);
                this.paddelWidth = 60;
                this.paddelHeight = 10;
                this.bulletMode = 0;
                this.ammo = 0;
                this.x = 130;
                this.y = 450;
            },
            setWidth(long) {
                if (this.paddelWidth < 120 && long) {
                    this.paddelWidth = this.paddelWidth + 20;
                } else if (this.paddelWidth > 20 && !long) {
                    this.paddelWidth = this.paddelWidth - 20;
                }
            },
            updatePosition(x) {
                //  this.canvas.clearRect(this.x, this.y, this.paddelWidth, this.paddelHeight); // may cause not smooth animation
                // this.canvas.fillStyle = "#ffe4e1";
                var ltX = x - this.paddelWidth / 2;
                if (ltX + this.paddelWidth > 320) {
                    ltX = 320 - this.paddelWidth;
                } else if (ltX < 0) {
                    ltX = 0;
                }
                // this.canvas.fillRect(ltX, this.y, this.paddelWidth, this.paddelHeight);
                this.x = ltX;
            }
    };
    exports.Paddel = Paddel;

})(window)