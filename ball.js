'use strict';
(function (exports) {
    var Ball = function () {
        this.radius = 5;
        this.mode = 0;
        this.x = 160;
        this.y = 440;
        this.vx = 2.5;
        this.vy = 2.5;
        var c = document.getElementById("canvas");
        this.canvas = c.getContext("2d");
    }
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
                this.canvas.clearRect(this.x - this.radius, this.y - this.radius, (this.radius + 0.5) * 2, (this.radius + 0.5) * 2);
                this.radius = 5;
                this.mode = 0;
                this.x = 160;
                this.y = 440;
                this.vx = 2.5;
                this.vy = 2.5;
            },
            updateBall() {
                this.canvas.beginPath();
                this.canvas.clearRect(this.x - this.radius, this.y - this.radius, (this.radius + 0.5) * 2, (this.radius + 0.5) * 2);
                /*if (this.vx > 0 && this.vx < 3) {
                    this.vx = this.vx + 0.01;
                } else if (this.vx < 0 && this.vx > -3) {
                    this.vx = this.vx - 0.01;
                }
                if (this.vy > 0 && this.vy < 3) {
                    this.vy = this.vy + 0.01;
                } else if (this.vy < 0 && this.vy > -3) {
                    this.vy = this.vy - 0.01;
                }*/
                this.x = this.x + this.vx;
                this.y = this.y - this.vy;
                this.draw();
            },
            setMode(mode) {
                this.mode = mode;
                if (this.mode == 0) {

                }
            }

    };
    exports.Ball = Ball;

})(window)