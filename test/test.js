var assert = require('assert');

describe('Brickbreaker', function () {
    describe('ball', function () {
        it('ball drop', function () {
            var engine = new Engine();
            var life = engine.life;
            engine.ball.y = 510;
            engine.detectCollision();
            assert(true, life = engine.life - 1);
        })

    })


})