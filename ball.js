'use strict';
(function (exports) {
    var Ball = function () {
        this.radius = 5;
        this.mode = 0;
        this.x = 160;
        this.y = 440;
        this.vx = 0.2;
        this.vy = 2;

    };
    Ball.prototype = {
        draw() {
                var c = document.getElementById("canvas");
                var canvas = c.getContext("2d");
                canvas.beginPath();
                canvas.fillStyle = "#00ffff";
                canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                canvas.fill();
            },
            init() {
                this.radius = 5;
                this.mode = 0;
                this.x = 160;
                this.y = 440;
                this.vx = 0.2;
                this.vy = 2;
            },
            updateBall() {
                this.x = this.x + this.vx;
                this.y = this.y - this.vy;
                this.draw();
            },
            setSpeed(is) {
                if (this.vy < 6 && is) {
                    this.vy *= 1.3;
                    this.vx *= 1.3;
                } else if (this.vy > 2 && !is) {
                    this.vy /= 1.3;
                    this.vx /= 1.3;
                }

            }

    };
    exports.Ball = Ball;

})(window)