var Paddle = (function () {
    function Paddle(xp, up, down) {
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("paddle");
        document.body.appendChild(this.div);
        this.upkey = up;
        this.downkey = down;
        this.x = xp;
        this.y = 200;
        this.width = 25;
        this.height = 100;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Paddle.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < window.innerHeight)
            this.y = targetY;
        this.draw();
    };
    Paddle.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
    };
    return Paddle;
}());
var Ball = (function () {
    function Ball(g) {
        this.game = g;
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.startPosition();
    }
    Ball.prototype.startPosition = function () {
        this.x = (Math.random() * (window.innerWidth / 2)) + (window.innerWidth / 4);
        this.y = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 4);
        this.width = 40;
        this.height = 40;
        this.speedX = Math.round(Math.random() * 3) + 1;
        this.speedY = Math.round(Math.random() * 6) - 3;
        if (Math.random() > 0.5)
            this.speedX *= -1;
    };
    Ball.prototype.hitPaddle = function () {
        this.speedX *= -1;
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x > window.innerWidth || this.x < -40) {
            if (this.speedX > 0) {
                this.game.display.updateScores(0, 1);
            }
            if (this.speedX < 0) {
                this.game.display.updateScores(1, 0);
            }
            this.startPosition();
        }
        this.draw();
    };
    Ball.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = new Array();
        this.display = new ScoreDisplay(this);
        this.paddle1 = new Paddle(0, 87, 83);
        this.paddle2 = new Paddle(window.innerWidth - 25, 38, 40);
        for (var i = 0; i < 25; i++) {
            this.balls.push(new Ball(this));
        }
        this.utils = new Utils();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.updateElements();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.updateElements = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.utils.hasOverlap(b, this.paddle1))
                b.hitPaddle();
            if (this.utils.hasOverlap(b, this.paddle2))
                b.hitPaddle();
            b.update();
        }
        this.paddle1.update();
        this.paddle2.update();
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var ScoreDisplay = (function () {
    function ScoreDisplay(g) {
        this.scorep1 = 0;
        this.scorep2 = 0;
        this.div = document.getElementsByTagName("ui")[0];
        this.game = g;
        this.div.innerHTML = "Pong Start!";
    }
    ScoreDisplay.prototype.updateScores = function (s1, s2) {
        this.scorep1 += s1;
        this.scorep2 += s2;
        this.display();
        this.checkGameOver();
    };
    ScoreDisplay.prototype.display = function () {
        this.div.innerHTML = this.scorep1 + " : " + this.scorep2;
    };
    ScoreDisplay.prototype.checkGameOver = function () {
        if (this.scorep1 > 4) {
            this.div.innerHTML = "SPELER 1 HEEFT GEWONNEN!";
        }
        else if (this.scorep2 > 4) {
            this.div.innerHTML = "SPELER 2 HEEFT GEWONNEN!";
        }
    };
    return ScoreDisplay;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.hasOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map