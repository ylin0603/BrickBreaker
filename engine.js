'use strict';
(function (exports) {
    var Engine = function () {
        this.iniScreen;
        this.canvas;
        this.level = 1;
        //     this.bricks;
        this.brick;
        this.paddel;
    }
    Engine.prototype = {
        start() {
                this.iniScreen = document.getElementById("iniScreen");
                this.iniScreen.addEventListener('mousedown', this);
                this.canvas = document.getElementById("canvas");
                this.canvas.addEventListener('mousedown', this);
                this.canvas.addEventListener('drag', this)
            },
            handleEvent(event) {
                switch (event.type) {
                case 'mousedown':
                    if (event.target.id == "iniScreen") {
                        $("#iniScreen").hide();
                        this.gameInit();
                    } else if (event.target.id == 'canvas') {
                        this.paddel.updatePosition(event.clientX);
                        console.log("x:" + (event.clientX));
                    }
                    break;
                case 'drag':
                    console.log("draging;")

                }
            },
            gameInit() {
                this.brick = new Brick(this.level);
                this.paddel = new Paddel();
                this.paddel.draw();
                /*this.bricks =*/
                this.brick.draw();
            },
            draw() {

            }
    };
    exports.Engine = Engine;

})(window)