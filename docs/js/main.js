"use strict";
var Paddle = (function () {
    function Paddle(xp, up, down) {
        var _this = this;
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
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}());
var Ball = (function () {
    function Ball() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.startPosition();
    }
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
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
            this.startPosition();
        }
        if (this.x < -40) {
            this.startPosition();
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.scores = [0, 0];
        this.ui = document.getElementsByTagName("ui")[0];
        this.ui.innerHTML = "Start!";
        this.paddle1 = new Paddle(0, 87, 83);
        this.paddle2 = new Paddle(window.innerWidth - 25, 38, 40);
        for (var i = 0; i < 5; i++) {
            this.balls.push(new Ball());
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.checkCollision(b.getRectangle(), this.paddle1.getRectangle())) {
                this.scores[0] = this.scores[0] + 1;
                this.updateUI();
                b.hitPaddle();
            }
            if (this.checkCollision(b.getRectangle(), this.paddle2.getRectangle())) {
                this.scores[1] = this.scores[1] + 1;
                this.updateUI();
                b.hitPaddle();
            }
            b.update();
        }
        this.paddle1.update();
        this.paddle2.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateUI = function () {
        this.ui.innerHTML = "P1: " + this.scores[0] + "    -   P2:" + this.scores[1];
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var ScoreDisplay = (function () {
    function ScoreDisplay() {
        this.scorep1 = 0;
        this.scorep2 = 0;
        this.div = document.getElementsByTagName("ui")[0];
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
//# sourceMappingURL=main.js.map