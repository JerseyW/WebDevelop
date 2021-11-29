/**
 @author: Jersey
 @create: 2021-11-27 20:33
 @version: V1.0
 @slogan: 业精于勤,荒于嬉;行成于思,毁于随。
 @description: 计分板
 */
 class  ScorePanel{

    score:number = 0;
    level:number = 1;
    scoreEle :HTMLElement;
    levelEle: HTMLElement;
    private  readonly  maxLevel :number;
    private  readonly  upScore :number;

    constructor(maxLevel:number = 10,upScore:number = 10) {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore(){

        this.scoreEle.innerHTML = ++ this.score + "";
        if (this.score % 10 === 0) {
            this.addLevel();
        }
    }
    addLevel(){
        if (this.level < this.maxLevel)
        this.levelEle.innerHTML = ++ this.level + "";
    }
}
export default ScorePanel;