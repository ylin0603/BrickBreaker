describe('Basic Functionality', function () {
    describe('ball movement', function () {
        it('wallCollision-XdirectionRight', function () {
            var engine = new Engine();
            engine.ball = new Ball();
            engine.ball.x = 322; // margin is 320
            assert.equal(true, engine.detectWallCollision());
        })
        it('wallCollision-XdirectionLeft', function () {
            var engine = new Engine();
            engine.ball = new Ball();
            engine.ball.x = -1; // margin is 0
            assert.equal(true, engine.detectWallCollision());
        })
        it('wallCollision-YdirectionTop', function () {
            var engine = new Engine();
            engine.ball = new Ball();
            engine.ball.y = -1; // margin is 0
            assert.equal(true, engine.detectWallCollision());
        })
        it('loseCondition', function () {
            var engine = new Engine();
            var life = engine.life;
            engine.ball = new Ball();
            engine.ball.y = 510;
            engine.detectLoseCondition();
            assert.equal(true, life = engine.life - 1);
        })
        it('paddelCollisionDetection', function () {
            var engine = new Engine();
            engine.ball = new Ball();
            engine.ball.vy = -4;
            engine.paddel = new Paddel();
            engine.paddel.x = 30;
            engine.ball.x = 35;
            engine.ball.y = 443;
            assert.equal(true, engine.detectPaddelCollision());
        })
    })
    describe('props', function () {
        it('propCatchDetection', function () {
            var engine = new Engine();
            engine.paddel = new Paddel();
            engine.ball = new Ball();
            var prop = new Props(1, engine.paddel, engine.ball);
            prop.y = 445;
            prop.x = 130;
            engine.props.push(prop);
            assert.equal(true, engine.catchProp());
        })
    })
})