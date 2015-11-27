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
    }
    Engine.prototype = {
        start() {
                this.iniScreen = document.getElementById("iniScreen");
                this.iniScreen.addEventListener('touchstart', this);
                this.canvas = document.getElementById("canvas");
                this.canvas.addEventListener('touchstart', this);
                this.canvas.addEventListener('touchmove', this)
            },
            handleEvent(event) {
                switch (event.type) {
                case 'touchstart':
                    if (event.target.id == "iniScreen") {
                        $("#iniScreen").hide();
                        this.gameInit();
                    } else if (event.target.id == 'canvas') {
                        this.paddel.updatePosition(event.touches[0].clientX);
                        console.log("x:" + (event.touches[0].clientX));
                    }
                    break;
                case 'touchmove':
                    this.paddel.updatePosition(event.touches[0].clientX);
                }
            },
            gameInit() {
                this.brick = new Brick(this.level);
                this.paddel = new Paddel();
                this.ball = new Ball();
                this.paddel.draw();
                /*this.bricks =*/
                this.brick.draw();
                this.ball.draw();
            },
            draw() {

            }
    };
    exports.Engine = Engine;

})(window)