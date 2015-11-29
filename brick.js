'use strict';
(function (exports) {
    var Brick = function (_level) {
        this.level = _level;
        this.c = document.getElementById("canvas");
        this.canvas = this.c.getContext("2d");
        // brick information
        this.row;
        this.column;
        this.brickWidth;
        this.brickHeight;
        this.blanckBetweenBrickX;
        this.blanckBetweenBrickY;
        this.blankBetweenCanvasX;
        this.blankBetweenCanvasY;
        this.bricks;
        this.bricksCount;
    }
    Brick.prototype = {
        init() {
                if (this.level === 1) {
                    this.row = 3;
                    this.column = 7;
                    this.brickWidth = 30;
                    this.brickHeight = 10;
                    this.blankBetweenBrickX = 10;
                    this.blankBetweenBrickY = 12;
                    this.blankBetweenCanvasX = 18;
                    this.blankBetweenCanvasy = 15;
                    this.bricks = [];
                    this.bricksCount = this.row * this.column;
                    for (var i = 0; i < this.row; i++) {
                        this.bricks[i] = []
                        for (var j = 0; j < this.column; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 1
                            };
                        }
                    }
                }
            },

            draw() {
                for (var i = 0; i < this.row; i++) {
                    for (var j = 0; j < this.column; j++) {
                        this.bricks[i][j].x = this.blankBetweenCanvasX +
                            j * (this.blankBetweenBrickX + this.brickWidth);
                        this.bricks[i][j].y = this.blankBetweenCanvasy +
                            i * (this.blankBetweenBrickY + this.brickHeight);
                        if (this.bricks[i][j].life == 0) {
                            this.canvas.clearRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                            continue;
                        } else if (this.bricks[i][j].life == 1) {
                            this.canvas.fillStyle = "#9933FF";
                        } else if (this.bricks[i][j].life == 2) {
                            this.canvas.fillStyle = "#CC99FF";
                        } else if (this.bricks[i][j].life == 3) {
                            this.canvas.fillStyle = "#CCCCFF";
                        }
                        this.canvas.fillRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                    }
                }
                return this.bricks;
            },
            update() {
                for (var i = 0; i < this.row; i++) {
                    for (var j = 0; j < this.column; j++) {
                        if (this.bricks[i][j].life < 0) {
                            this.canvas.clearRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                            continue;
                        }
                    }
                }
            }

    };
    exports.Brick = Brick;

})(window)