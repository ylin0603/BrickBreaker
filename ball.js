'use strict';
(function (exports) {
    var Ball = function () {
        this.radius = 5;
        this.mode = 0;
        this.x = 160;
        this.y = 440;
        this.vx = 2;
        this.vy = 2;
        var c = document.getElementById("canvas");
        this.canvas = c.getContext("2d");
    };
    Ball.prototype = {
        draw() {
                this.canvas.beginPath();
                this.canvas.fillStyle = "#00ffff";
                this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.canvas.fill();
                //this.canvas.closePath();
                //this.canvas.clip()

                //this.canvas.closePath();
            },
            init() {
                this.canvas.beginPath();
                //this.canvas.clearRect(this.x - this.radius, this.y - this.radius, (this.radius + 0.5) * 2, (this.radius + 0.5) * 2);
                this.radius = 5;
                this.radius = 5;
                this.mode = 0;
                this.x = 160;
                this.y = 440;
                this.vx = 2;
                this.vy = 2;
            },
            updateBall() {
                this.canvas.beginPath();
                //this.canvas.clearRect(this.x - this.radius, this.y - this.radius, (this.radius + 0.5) * 2, (this.radius + 0.5) * 2);

                this.x = this.x + this.vx;
                this.y = this.y - this.vy;
                this.draw();
            },
            setMode(mode) {
                this.mode = mode;
                if (this.mode == 0) {

                }
            },
            setSpeed(is) {
                if (this.vy < 8 && is) {
                    this.vy = this.vy * 2;
                    this.vx = this.vx * 2;
                } else if (this.vy > 2.5 && !is) {
                    this.vy = this.vy / 2;
                    this.vx = this.vx / 2;
                }

            }

    };
    exports.Ball = Ball;

})(window)