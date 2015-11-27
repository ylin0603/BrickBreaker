'use strict';
(function (exports) {
    var Brick = function (_level) {
        this.level = _level;
        this.c = document.getElementById("canvas");
        this.ctx = this.c.getContext("2d");
        // brick information
        this.row;
        this.coloum;
        this.brickWidth;
        this.brickHeight;
        this.blanckBetweenBrickX;
        this.blanckBetweenBrickY;
        this.blankBetweenCanvasX;
        this.blankBetweenCanvasY;
        this.bricks;
    }
    Brick.prototype = {

        draw() {
                if (this.level === 1) {
                    this.row = 3;
                    this.coloum = 7;
                    this.brickWidth = 30;
                    this.brickHeight = 10;
                    this.blankBetweenBrickX = 10;
                    this.blankBetweenBrickY = 12;
                    this.blankBetweenCanvasX = 18;
                    this.blankBetweenCanvasy = 15;
                    this.bricks = [];
                    for (var i = 0; i < this.row; i++) {
                        this.bricks[i] = []
                        for (var j = 0; j < this.coloum; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 1
                            };
                        }
                    }
                    for (var i = 0; i < this.row; i++) {
                        for (var j = 0; j < this.coloum; j++) {
                            this.bricks[i][j].x = this.blankBetweenCanvasX +
                                j * (this.blankBetweenBrickX + this.brickWidth);
                            this.bricks[i][j].y = this.blankBetweenCanvasy +
                                i * (this.blankBetweenBrickY + this.brickHeight);
                            if (this.bricks[i][j].life == 1) {
                                this.ctx.fillStyle = "#9933FF";
                            } else if (this.bricks[i][j].life == 2) {
                                this.ctx.fillStyle = "#CC99FF";
                            } else if (this.bricks[i][j].life == 3) {
                                this.ctx.fillStyle = "#CCCCFF";
                            }

                            this.ctx.fillRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                        }
                    }
                }
                return this.bricks;
            },
            update() {
                for (var i = 0; i < this.row; i++) {
                    for (var j = 0; j < this.coloum; j++) {
                        if (this.brick[i][j].life == 0) {
                            this.ctx.clearRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                            continue;
                        }
                    }
                }
            }

    };
    exports.Brick = Brick;

})(window)