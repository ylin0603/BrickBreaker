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
        this.props = new Array();
        this.randomAppear = 0;
        this.random = 300;
        this.ballMovemet;
        $("#pauseScreen").hide();
        $("#canvasDiv").hide();
    }
    Engine.prototype = {
        start() { // add the event listener
                this.iniScreen = document.getElementById("iniScreen");
                this.iniScreen.addEventListener('touchstart', this);
                this.pauseBtn = document.getElementById("pauseBtn");
                this.pauseBtn.addEventListener("touchstart", this);
                this.pauseScreen = document.getElementById("pauseScreen");
                this.pauseScreen.addEventListener("touchstart", this);
                this.canvas = document.getElementById("canvas");
                this.canvas.addEventListener('touchstart', this);
                this.canvas.addEventListener('touchmove', this);
                // start requestion of animation, but not animate yes (animate stop is true now);
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
            },
            handleEvent(event) {
                switch (event.type) {
                case 'touchstart':
                    if (event.target.id == "iniScreen") {
                        //while user touch iniScreen gamestart
                        $("#iniScreen").hide();
                        this.gameInit();
                    } else if (event.target.id == 'canvas') {
                        // move the paddel
                        this.paddel.updatePosition(event.touches[0].clientX);
                        // ball start moving
                        this.animateStop = false; //this.paddel.x=event.touches[0].clientX;
                    } else if (event.target.id == "pauseBtn") {
                        // pause
                        this.pause();
                    } else if (event.target.id == "pauseScreen") {
                        // recover from pause
                        this.pause();
                    }
                    break;
                case 'touchmove':
                    // another way to move the paddel
                    this.paddel.updatePosition(event.touches[0].clientX);
                    //this.paddel.x=event.touches[0].clientX;
                }
            },
            clearCanvas() {
                // clean out everything on canvas
                var c = this.canvas.getContext("2d");
                c.clearRect(0, 0, 320, 520);
            },
            pause() {
                // for the pause
                this.animateStop = !(this.animateStop);
                if (this.animateStop === true) {
                    $("#pauseScreen").show();
                } else {
                    $("#pauseScreen").hide();
                }
            },
            gameInit() {
                this.clearCanvas();
                // Don't let the ball move while user first enter the game
                this.animateStop = true;
                // show the canvas
                $("#canvasDiv").show();
                // create the brick with correspond level
                this.brick = new Brick(this.level);
                // create paddel
                this.paddel = new Paddel();
                // create ball
                this.ball = new Ball();
                //draw the ini 
                this.brick.init();
                this.ball.draw();
                this.paddel.draw();
                this.brick.draw();
                this.text();

            },
            detectCollision() {
                //wall collision
                if (this.ball.x + this.ball.vx >= 320 || this.ball.x + this.ball.vx <= 0) {
                    this.ball.vx = -(this.ball.vx);
                }
                if (this.ball.y <= 0) {
                    this.ball.vy = -(this.ball.vy);
                }
                //lose detection
                if (this.ball.y >= 500 || this.life <= -1) {
                    this.life--;
                    this.ball.init();
                    this.paddel.init();
                    this.animateStop = true;
                    if (this.life <= -1) {
                        this.life = 3;
                        this.level = 1;
                        $("#message").text("You Lose");
                        $("#message").css("color", "#32CD32");
                        $("#level").text("Level:" + this.level);
                        $("#iniScreen").show();
                        $("#canvasDiv").hide();
                    }
                    this.drawInit();
                    return 0;

                }
                //paddel collision
                if (this.ball.x - this.ball.radius + this.ball.vx <= this.paddel.x + this.paddel.paddelWidth && this.ball.x + this.ball.radius + this.ball.vx >= this.paddel.x &&
                    this.ball.y + this.ball.radius - this.ball.vy >= this.paddel.y && this.ball.y + this.ball.radius <= this.paddel.y) { // 1 is the buffer area
                    this.ball.y += this.ball.vy;
                    this.ball.x += this.ball.vx;
                    this.ball.vy = -(this.ball.vy);
                    var distanceonPad = (this.ball.x - this.paddel.x) / this.paddel.paddelWidth;
                    //var distanceonPad = 1;
                    if (distanceonPad > 0.5) {
                        this.ball.vx = distanceonPad * 10 - 5;
                    } else if (distanceonPad == 0.5) {
                        this.ball.vx = 0.2;
                    } else if (distanceonPad < 0.5) {
                        this.ball.vx = distanceonPad * 10 - 5;
                    }

                }
                // catch prop detection
                for (var i = 0; i < this.props.length; i++) {
                    var p = this.props[i];
                    if (p.x <= this.paddel.x + this.paddel.paddelWidth && p.x >= this.paddel.x &&
                        p.y + p.radius >= this.paddel.y && p.y - p.radius <= this.paddel.y) { //catch the prop
                        p.catchProp();
                        if (p.mode == 4) {
                            this.life++;
                        } else if (p.mode == 5) {
                            this.life--;
                        }
                        this.props.splice(i, 1);
                    }
                    if (p.y >= this.paddel.y + 30) {
                        this.props.splice(i, 1);
                    }
                }
                //brick collision
                outerLoop:
                    for (var i = 0; i < this.brick.bricks.length; i++) {
                        for (var j = 0; j < this.brick.bricks[i].length; j++) {
                            var temp = this.brick.bricks[i][j];
                            if (temp.life > 0 && temp.x <= this.ball.x + this.ball.vx &&
                                (temp.x + temp.brickWidth) >= this.ball.x + this.ball.vx &&
                                temp.y <= this.ball.y - this.ball.vy && temp.y + temp.brickHeight >= this.ball.y - this.ball.vy) {
                                console.log("Brick(x,y): " + temp.x + " " + temp.y);
                                console.log("Ball(x,y): " + this.ball.x + " " + this.ball.y);
                                temp.life--;
                                if (temp.life == 0) {
                                    this.brick.bricksCount--;
                                }
                                if (this.brick.bricksCount == 0) { // win condition
                                    this.level++;
                                    $("#message").text("Well Done");
                                    if (this.level == 4) {
                                        $("#message").text("You Win ！  Tap To Play Again");
                                        this.level = 1;
                                    }
                                    $("#message").css("color", "#FFD700");
                                    $("#level").text("Level:" + this.level);
                                    $("#iniScreen").show();
                                    this.ball.init();
                                    this.paddel.init();
                                    $("#canvasDiv").hide();
                                    this.animateStop = true;
                                    break outerLoop;
                                }

                                if (this.ball.x < temp.x && this.ball.y > temp.y && this.ball.y < temp.y + temp.brickHeight) {
                                    this.ball.vx = -(this.ball.vx);
                                } else if (this.ball.x > temp.x && this.ball.x < temp.x + temp.brickWidth && this.ball.y < temp.y) {
                                    this.ball.vy = -(this.ball.vy);
                                } else if (this.ball.x > temp.x + temp.brickWidth && this.ball.y > temp.y && this.ball.y < temp.y + temp.brickHeight) {
                                    this.ball.vx = -(this.ball.vx);
                                } else if (this.ball.x < temp.x + temp.brickWidth && this.ball.x > temp.x && temp.y + temp.brickHeight < this.ball.y) {
                                    this.ball.vy = -(this.ball.vy);
                                } else {
                                    this.ball.vy = -(this.ball.vy);
                                    this.ball.vx = -(this.ball.vx);
                                }
                            }
                        }
                    }
            },
            text() {
                var c = this.canvas.getContext("2d");
                c.beginPath();
                //c.clearRect(285, 0, 40, 20);
                c.fillStyle = "#FFFAFA";
                c.font = "12px monospace ";
                c.fillText("Life:" + this.life, 270, 12);
            },
            propsUpdate() {
                for (var i = 0; i < this.props.length; i++) {
                    this.props[i].updatePos();
                }
            },
            drawInit() {
                this.clearCanvas();
                this.text();
                this.brick.draw();
                this.paddel.draw();
                this.ball.draw();
            },
            randomProp() {
                if (this.randomAppear == this.random) {
                    this.randomAppear = 0;
                    var mode = Math.floor(Math.random() * 6);
                    //var mode = 2;
                    if (mode == 4 && this.random % 5 != 0) {
                        mode = 5;
                    }
                    var y = Math.floor(Math.random() * 5 + 1);
                    var p = new Props(mode, this.paddel, this.ball);
                    p.x = Math.floor(Math.random() * 310 + 2);
                    p.vy = y;
                    this.props.push(p);
                    this.random = Math.floor(Math.random() * 100 + 300);
                }
            },
            draw() {
                if (!this.animateStop) {
                    this.randomAppear++;
                    this.randomProp(this.randomAppear);
                    this.clearCanvas();
                    this.text();
                    this.propsUpdate();
                    this.brick.draw();
                    this.paddel.draw();
                    if (this.detectCollision() != 0) {
                        this.ball.updateBall();
                    }


                }
                this.animationID = exports.requestAnimationFrame(this.draw.bind(this));
            }
    };
    exports.Engine = Engine;

})(window)