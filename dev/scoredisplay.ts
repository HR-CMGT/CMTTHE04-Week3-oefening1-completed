/**
 * ScoreDisplay
 */
class ScoreDisplay {
    
    private scorep1:number = 0;
    private scorep2:number = 0;
    private game:Game;
    private div:Element;
    
    constructor(g:Game) {
        this.div = document.getElementsByTagName("ui")[0];
        this.game = g;
        this.div.innerHTML = "Pong Start!"; 
    }
    
    public updateScores(s1:number, s2:number){
        this.scorep1 += s1;
        this.scorep2 += s2;
        this.display();
        this.checkGameOver();
    }
    
    private display(){
         this.div.innerHTML = this.scorep1 + " : " + this.scorep2;
    }
    
    // als een van de twee scores 5 is dan heeft die speler gewonnen
    private checkGameOver(){
        if(this.scorep1 > 4){
            this.div.innerHTML = "SPELER 1 HEEFT GEWONNEN!";
        } else if (this.scorep2 > 4) {
            this.div.innerHTML = "SPELER 2 HEEFT GEWONNEN!";
        }
    }
}