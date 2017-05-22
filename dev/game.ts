/// <reference path="ball.ts"/>
class Game {
    
    private balls: Array<Ball> = new Array<Ball>();
    private paddle1:Paddle;
    private paddle2:Paddle;
    private utils:Utils;
    private _display:ScoreDisplay;
    

	public get display(): ScoreDisplay {
		return this._display;
	}
	public set display(value: ScoreDisplay) {
		this._display = value;
	}


    
    constructor() {
        // ui houdt de score bij en toont dit in het scherm
        this._display = new ScoreDisplay();
        
        // twee spelers
        this.paddle1= new Paddle(0, 87, 83);
        this.paddle2 = new Paddle(window.innerWidth - 25, 38, 40);
        
        // array met balletjes
        for (var i = 0; i < 25; i++) {
            this.balls.push(new Ball(this));
        }
        
        // utils
        this.utils = new Utils();
        
        // start game loop        
        requestAnimationFrame(() => this.gameLoop());
        
    }
    
    // game loop
    private gameLoop():void{
        this.updateElements();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // update balls en paddles
    private updateElements():void {
                
        for (var b of this.balls) {
            // de bal raakt een paddle?
            if(this.utils.hasOverlap(b, this.paddle1)) b.hitPaddle();
            if(this.utils.hasOverlap(b, this.paddle2)) b.hitPaddle();
            // beweeg de bal
            b.update();
        }
        
        // also move all the paddles
        this.paddle1.update();
        this.paddle2.update();
    }
} 