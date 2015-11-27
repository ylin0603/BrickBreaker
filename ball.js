'use strict';
(function (exports) {
    var Ball = function () {
        this.radius = 5;
        this.mode = 0;
        this.x = 160;
        this.y = 440;
        this.vx = 1;
        this.vy = 1;
        var c = document.getElementById("canvas");
        this.canvas = c.getContext("2d");
    }
    Ball.prototype = {
        startBall() {

            },
            gameInit() {

            },
            draw() {
                this.canvas.fillStyle = "#00ffff";
                this.canvas.beginPath();
                this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                //this.canvas.closePath();
                this.canvas.fill();
            }
    };
    exports.Ball = Ball;

})(window)