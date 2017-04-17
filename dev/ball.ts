/// <reference path="paddle.ts"/>

class Ball {
    
    private div : HTMLElement;
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    
    private speedX : number;
    private speedY : number;
    
    private game:Game;
    
    constructor(g:Game) {
        this.game = g;
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.startPosition();
    }
        
    // startpositie
    private startPosition(){
        this.x = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4);
        this.y = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4);
        this.width = 40;
        this.height = 40;
        
        this.speedX = Math.round(Math.random() * 3)+1;
        this.speedY = Math.round(Math.random() * 6)-3;
        
        // random richting
        if(Math.random()>0.5) this.speedX *= -1;
    }
    
    // de bal raakt een paddle
    public hitPaddle(){
        this.speedX *= -1;
    }

    // positie updaten
    public update() : void {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // stuiteren tegen de boven en onderkant van het scherm
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1;
        }
        
        // De bal gaat links of rechts uit het scherm. 
        if( this.x > window.innerWidth || this.x < -40) { 
            // aan de richting kunnen we zien welke speler een punt krijgt
            if(this.speedX > 0){
                this.game.display.updateScores(0,1);
            }
             if(this.speedX < 0){
                this.game.display.updateScores(1,0);
            }
            
            
            // bal weer in het midden van het scherm plaatsen
            this.startPosition();
        } 
                        
        this.draw();
    }
    
    // tekenen
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";     
    }
}