'use strict';
(function (exports) {
    var Brick = function (_level) {
        this.level = _level;
        this.c = document.getElementById("canvas");
        this.canvas = this.c.getContext("2d");
        // brick information
        this.row;
        this.column;
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
                    this.blankBetweenCanvasX = 18;
                    this.blankBetweenCanvasy = 15;
                    this.bricks = [];
                    this.bricksCount = this.row * this.column;
                    //this.bricksCount = 2;
                    for (var i = 0; i < this.row; i++) {
                        this.bricks[i] = []
                        for (var j = 0; j < this.column; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 1,
                                brickWidth: 30,
                                brickHeight: 10,
                                blankBetweenBrickX: 10,
                                blankBetweenBrickY: 12,
                                blankIntention: 0
                            };
                        }
                    }
                } else if (this.level === 2) {
                    this.row = 9;
                    this.column = 7;
                    this.brickWidth = 30;
                    this.brickHeight = 10;
                    this.blankBetweenBrickX = 2;
                    this.blankBetweenBrickY = 2;
                    this.blankBetweenCanvasX = 40;
                    this.blankBetweenCanvasy = 30;
                    this.bricks = [];
                    this.bricksCount = 0;
                    for (var i = 0; i < 1; i++) {
                        this.bricks[i] = [];
                        for (var j = 0; j < this.column; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 2,
                                brickWidth: 30,
                                brickHeight: 20,
                                blankBetweenBrickX: 2,
                                blankBetweenBrickY: 16,
                            }
                            this.bricksCount += 2;
                        }

                    }

                    for (var i = 1; i < this.row - 1; i++) {
                        this.bricks[i] = [];
                        for (var j = 0; j < 2; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 2,
                                brickWidth: 30,
                                brickHeight: 20,
                                blankBetweenBrickX: 162,
                                blankBetweenBrickY: 16
                            }
                            this.bricksCount += 2;
                        }

                    }
                    for (var i = this.row - 1; i < this.row; i++) {
                        this.bricks[i] = [];
                        for (var j = 0; j < this.column; j++) {
                            this.bricks[i][j] = {
                                x: 0,
                                y: 0,
                                life: 2,
                                brickWidth: 30,
                                brickHeight: 20,
                                blankBetweenBrickX: 2,
                                blankBetweenBrickY: 16,
                            }

                        }
                    }
                }
            },

            draw() {
                for (var i = 0; i < this.bricks.length; i++) {
                    for (var j = 0; j < this.bricks[i].length; j++) {
                        this.bricks[i][j].x = this.blankBetweenCanvasX +
                            j * (this.bricks[i][j].blankBetweenBrickX + this.bricks[i][j].brickWidth);
                        this.bricks[i][j].y = this.blankBetweenCanvasy +
                            i * (this.bricks[i][j].blankBetweenBrickY + this.bricks[i][j].brickHeight);
                        if (this.bricks[i][j].life == 0) {
                            //this.canvas.clearRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                            this.brickCounts--;
                            continue;
                        } else if (this.bricks[i][j].life == 1) {
                            this.canvas.fillStyle = "#9933FF";
                        } else if (this.bricks[i][j].life == 2) {
                            this.canvas.fillStyle = "#CC99FF";
                        } else if (this.bricks[i][j].life == 3) {
                            this.canvas.fillStyle = "#CCCCFF";
                        }
                        this.canvas.fillRect(this.bricks[i][j].x, this.bricks[i][j].y, this.bricks[i][j].brickWidth, this.bricks[i][j].brickHeight);
                    }
                }
                return this.bricks;
            },
            getBricksCount() {
                return this.bricksCount;
            }
            /*update() {
                for (var i = 0; i < this.row; i++) {
                    for (var j = 0; j < this.column; j++) {
                        if (this.bricks[i][j].life < 0) {
                            this.canvas.clearRect(this.bricks[i][j].x, this.bricks[i][j].y, this.brickWidth, this.brickHeight);
                            continue;
                        }
                    }
                }
            }*/

    };
    exports.Brick = Brick;

})(window)