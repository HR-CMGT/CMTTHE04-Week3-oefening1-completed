class Paddle {
    
    private div:HTMLElement
    
    private downkey : number
    private upkey   : number
    
    private downSpeed   : number = 0
    private upSpeed     : number = 0
    
    private x : number
    private y : number
    
    constructor(xp:number, up:number, down:number) {
        this.div = document.createElement("paddle")
        document.body.appendChild(this.div)
        
        this.upkey   = up
        this.downkey = down
        
        this.x      = xp
        this.y      = 200
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5
                break
            case this.downkey:
                this.downSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
        }
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed

        // als de paddle binnen beeld blijft, dan ook echt updaten
        if (newY > 0 && newY + 100 < window.innerHeight) this.y = newY

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
}