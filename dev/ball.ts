/// <reference path="paddle.ts"/>

class Ball {
    
    private div : HTMLElement
    
    private x : number = 0
    private y: number = 0
    
    private speedX: number = 0
    private speedY: number = 0
    
    constructor() {
        this.div = document.createElement("ball")
        document.body.appendChild(this.div)
        this.startPosition()
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
    
    private startPosition(){
        this.x = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4)
        this.y = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4)
        
        this.speedX = Math.round(Math.random() * 3)+1
        this.speedY = Math.round(Math.random() * 6)-3

        if(Math.random()>0.5) this.speedX *= -1
    }
    
    public hitPaddle(){
        this.speedX *= -1
    }

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
        
        if (this.x > window.innerWidth || this.x < -40 || this.x < -40) { 
            this.startPosition()
        } 
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}