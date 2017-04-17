/**
 * Paddle
 */
class Paddle {
    
    private div:HTMLElement;
    
    private downkey : number;
    private upkey : number;
    
    private downSpeed : number = 0;
    private upSpeed : number = 0;
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    
    constructor(xp:number, up:number, down:number) {
        // maak een divje waar de gif in komt te staan
        this.div = document.createElement("paddle");
        document.body.appendChild(this.div);
        
        // keys kunnen verschillend zijn voor elke instance van charmander
        this.upkey = up;
        this.downkey = down;
        
        // positie
        this.x = xp;
        this.y = 200;
        this.width = 25;
        this.height = 100;
        
        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    
    
    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 5;
            break;
        case this.downkey:
            this.downSpeed = 5;
            break;
        }
    }
    
    // speed op 0 als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 0;
            break;
        case this.downkey:
            this.downSpeed = 0;
            break;
        }
    }

    
    // bewegen - let op, de update functie wordt door game aangeroepen! niet door de event listener (dat is niet smooth)
    public update() : void {
        let targetY = this.y - this.upSpeed + this.downSpeed;
        if(targetY > 0 && targetY+100 < window.innerHeight) this.y = targetY;
                        
        this.draw();
    }
    
    // tekenen - tip: scaleX kan je gebruiken om het texture te flippen
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(-1)";
    }
    
}