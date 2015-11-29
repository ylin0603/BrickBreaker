'use strict';
(function (exports) {
    var Engine = function () {
        this.iniScreen;
        this.canvas;
        this.level = 1;
        //     this.bricks;
        this.brick;
        this.paddel;
        this.ball;
        this.animationID;
        this.life = 3;
        this.pauseBtn;
        this.animateStop = true;
        $("#pauseScreen").hide();
        $("#canvasDiv").hide();
    }
    Engine.prototype = {
        start() {
                this.iniScreen = document.getElementById("iniScreen");
                this.iniScreen.addEventListener('touchstart', this);
                this.pauseBtn = document.getElementById("pauseBtn");
                this.pauseBtn.addEventListener("touchstart", this);
                this.pauseScreen = document.getElementById("pauseScreen");
                this.pauseScreen.addEventListener("touchstart", this);
                this.canvas = document.getElementById("canvas");
                this.canvas.addEventListener('touchstart', this);
                this.canvas.addEventListener('touchmove', this);
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
            },
            handleEvent(event) {
                switch (event.type) {
                case 'touchstart':
                    if (event.target.id == "iniScreen") {
                        $("#iniScreen").hide();
                        this.gameInit();
                    } else if (event.target.id == 'canvas') {
                        this.paddel.updatePosition(event.touches[0].clientX);
                        //this.paddel.x=event.touches[0].clientX;
                    } else if (event.target.id == "pauseBtn") {
                        this.pause();
                    } else if (event.target.id == "pauseScreen") {
                        this.pause();
                    }
                    break;
                case 'touchmove':
                    this.paddel.updatePosition(event.touches[0].clientX);
                    //this.paddel.x=event.touches[0].clientX;
                }
            },
            clearCanvas() {
                var c = this.canvas.getContext("2d");
                c.clearRect(0, 0, 320, 520);
            },
            pause() {
                this.animateStop = !(this.animateStop);
                if (this.animateStop === true) {
                    $("#pauseScreen").show();
                } else {
                    $("#pauseScreen").hide();
                }
            },
            gameInit() {
                this.clearCanvas();
                this.animateStop = false;
                $("#canvasDiv").show();
                this.brick = new Brick(this.level);
                this.paddel = new Paddel();
                this.ball = new Ball();
                //this.paddel.draw();
                /*this.bricks =*/
                this.brick.init();
                this.ball.draw();

            },
            detectCollision() {
                //wall collision
                if (this.ball.x >= 320 || this.ball.x <= 0) {
                    this.ball.vx = -(this.ball.vx);
                }
                if (this.ball.y <= 0) {
                    this.ball.vy = -(this.ball.vy);
                }
                //lose detection
                if (this.ball.y >= 500) {
                    this.life--;
                    if (this.life == -1) {
                        this.life = 3;
                        this.level = 1;
                        this.animateStop = true;
                        $("#message").text("You Lose");
                        $("#message").css("color", "#32CD32");
                        $("#iniScreen").show();
                        $("#canvasDiv").hide();
                    }
                    this.ball.init();
                    this.paddel.init();
                }
                //paddel collision
                if (this.ball.x - this.ball.radius <= this.paddel.x + this.paddel.paddelWidth && this.ball.x + this.ball.radius >= this.paddel.x &&
                    this.ball.y + this.ball.radius >= this.paddel.y && this.ball.y <= this.paddel.y + 3) { // 3 is the buffer area
                    this.ball.vy = -(this.ball.vy);
                    var distanceonPad = this.ball.x - this.paddel.x
                    if (distanceonPad > 30) {
                        this.ball.vx = distanceonPad / 6 - 5;
                    } else if (distanceonPad == 30) {
                        this.ball.vx = 0.2;
                    } else if (distanceonPad < 30) {
                        this.ball.vx = distanceonPad / 6 - 5;
                    }

                }
                //brick collision
                outerLoop:
                    for (var i = 0; i < this.brick.row; i++) {
                        for (var j = 0; j < this.brick.column; j++) {
                            var temp = this.brick.bricks[i][j];
                            if (temp.life > 0 && temp.x <= this.ball.x + this.ball.radius &&
                                (temp.x + this.brick.brickWidth) >= this.ball.x - this.ball.radius &&
                                temp.y <= this.ball.y - this.ball.radius && temp.y + this.brick.brickHeight >= this.ball.y - this.ball.radius) {
                                temp.life--;
                                this.brick.bricksCount--;
                                if (this.brick.bricksCount == 0) { // win condition
                                    this.level++;
                                    $("#message").text("Well Done");
                                    $("#message").css("color", "#FFD700");
                                    $("#level").text("Level:" + this.level);
                                    $("#iniScreen").show();
                                    this.ball.init();
                                    this.paddel.init();
                                    $("#canvasDiv").hide();
                                    this.animateStop = true;
                                    break outerLoop;
                                }
                                if (temp.life == 0) {
                                    // this.brick.canvas.clearRect(temp.x, temp.y, this.brick.brickWidth, this.brick.brickHeight);
                                }
                                this.ball.vy = -(this.ball.vy);

                            }
                        }
                    }

            },
            text() {
                var c = this.canvas.getContext("2d");
                c.beginPath();
                //c.clearRect(285, 0, 40, 20);
                c.fillStyle = "#FFFAFA";
                c.font = "12px Courier New, Courier, monospace ";
                c.fillText("Life:" + this.life, 270, 12);
            },
            draw() {
                if (!this.animateStop) {
                    this.clearCanvas();
                    this.text();
                    this.brick.draw();
                    this.paddel.draw();
                    this.ball.updateBall();
                    this.detectCollision();
                }
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
            }
    };
    exports.Engine = Engine;

})(window)