/// <reference path="ball.ts"/>

class Game {
    
    private balls: Ball[] = []
    private paddle1:Paddle
    private paddle2:Paddle
    private ui:Element
    private scores:number[] = [0,0]

    constructor() {
        this.ui = document.getElementsByTagName("ui")[0]!
        this.ui.innerHTML = "Start!"
        
        this.paddle1 = new Paddle(0, 87, 83)
        this.paddle2 = new Paddle(window.innerWidth - 25, 38, 40)
        
        for (var i = 0; i < 5; i++) {
            this.balls.push(new Ball())
        }

        this.gameLoop()        
    }
    
    private gameLoop():void{
        for (var b of this.balls) {
            if (this.checkCollision(b.getRectangle(), this.paddle1.getRectangle())) {
                this.scores[0] = this.scores[0] + 1
                this.updateUI()
                b.hitPaddle()
            }
            if (this.checkCollision(b.getRectangle(), this.paddle2.getRectangle())) {
                this.scores[1] = this.scores[1] + 1
                this.updateUI()
                b.hitPaddle()
            }

            b.update();
        }

        this.paddle1.update();
        this.paddle2.update();
        
        requestAnimationFrame(() => this.gameLoop())
    }

    private updateUI(){
        this.ui.innerHTML = `P1: ${this.scores[0]}    -   P2:${this.scores[1]}`
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    
} 


window.addEventListener("load", () => new Game())