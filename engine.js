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
    }
    Engine.prototype = {
        start() {
                this.iniScreen = document.getElementById("iniScreen");
                this.iniScreen.addEventListener('touchstart', this);
                this.canvas = document.getElementById("canvas");
                this.canvas.addEventListener('touchstart', this);
                this.canvas.addEventListener('touchmove', this);

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
                    }
                    break;
                case 'touchmove':
                    this.paddel.updatePosition(event.touches[0].clientX);
                    //this.paddel.x=event.touches[0].clientX;
                }
            },
            gameInit() {
                this.brick = new Brick(this.level);
                this.paddel = new Paddel();
                this.ball = new Ball();
                //this.paddel.draw();
                /*this.bricks =*/
                this.brick.init();
                this.ball.draw();
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
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
                    this.ball.init();
                    this.paddel.init();
                }
                //paddel collision
                if (this.ball.x <= this.paddel.x + this.paddel.paddelWidth && this.ball.x >= this.paddel.x &&
                    this.ball.y >= this.paddel.y && this.ball.y <= this.paddel.y + 3) { // 3 is the buffer area
                    this.ball.vy = -(this.ball.vy);
                    var distanceonPad = this.ball.x - this.paddel.x
                    if (distanceonPad > 30) {
                        this.ball.vx = distanceonPad / 6 - 5;
                    } else if (distanceonPad == 30) {
                        this.ball.vx = 0.1;
                    } else if (distanceonPad < 30) {
                        this.ball.vx = distanceonPad / 6 - 5;
                    }

                }
                //brick collision
                for (var i = 0; i < this.brick.row; i++) {
                    for (var j = 0; j < this.brick.column; j++) {
                        var temp = this.brick.bricks[i][j];
                        if (temp.life > 0 && temp.x <= this.ball.x + this.ball.radius &&
                            (temp.x + this.brick.brickWidth) >= this.ball.x - this.ball.radius &&
                            temp.y <= this.ball.y - this.ball.radius && temp.y + this.brick.brickHeight >= this.ball.y - this.ball.radius) {
                            temp.life--;
                            this.brick.bricksCount--;
                            if (this.brick.bricksCount == 0) {
                                this.ball.init();
                                this.paddel.init();
                            }
                            if (temp.life == 0) {
                                this.brick.canvas.clearRect(temp.x, temp.y, this.brick.brickWidth, this.brick.brickHeight);
                            }
                            this.ball.vy = -(this.ball.vy);

                        }
                    }
                }

            },
            draw() {
                this.brick.draw();
                this.paddel.draw();
                this.ball.updateBall();
                this.detectCollision();
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
            }
    };
    exports.Engine = Engine;

})(window)