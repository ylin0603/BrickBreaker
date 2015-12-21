'use strict';
(function (exports) {
    var Props = function (mode, paddel, ball) {
        this.mode = mode;
        this.paddel = paddel;
        this.ball = ball;
        this.x = 0;
        this.y = 0;
        this.vx = 3.5;
        this.vy = 3.5;
        this.radius = 6;
    }
    Props.prototype = {
        init() {
                this.x = 3.5;
                this.y = 3.5;
                this.radius = 6;
            },
            draw() {
                var c = document.getElementById("canvas");
                this.canvas = c.getContext("2d");
                this.canvas.beginPath();
                this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                if (this.mode == "0") {
                    this.canvas.fillStyle = "#FFC125";
                } else if (this.mode == "1") {
                    this.canvas.fillStyle = "#DC143C"
                } else if (this.mode == "2") {
                    this.canvas.fillStyle = "#000080"
                } else if (this.mode == "3") {
                    this.canvas.fillStyle = "#8B0000"
                } else if (this.mode == "4") {
                    this.canvas.fillStyle = "#808000"
                    this.canvas.strokeStyle = "#E0FFFF"
                    this.canvas.lineWidth = 3;
                } else if (this.mode == "5") {
                    this.canvas.fillStyle = "#F08080"
                    this.canvas.strokeStyle = "#E0FFFF"
                    this.canvas.lineWidth = 3;
                    this.canvas.stroke();
                }
                this.canvas.fill();
            },
            updatePos() {
                //this.x = this.x + this.vx;
                this.y = this.y + this.vy;
                this.draw();
            },
            catchProp() {
                //this.canvas.clearRect(0, 450, 320, 600);
                if (this.mode == "0") {
                    this.paddel.setWidth(1);
                } else if (this.mode == "1") {
                    this.paddel.setWidth(0);
                } else if (this.mode == "2") {
                    this.ball.setSpeed(1);
                } else if (this.mode == "3") {
                    this.ball.setSpeed(0);
                }
                /*else if (this.mode == "4") {

                               } else if (this.mode == "5") {

                               }*/
            }

    };
    exports.Props = Props;

})(window)