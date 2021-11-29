/**
 @author: Jersey
 @create: 2021-11-27 21:13
 @version: V1.0
 @slogan: 业精于勤,荒于嬉;行成于思,毁于随。
 @description: 控制类
 */
import {Food} from "./Food";
import {Snake} from "./Snake";
import ScorePanel from "./ScorePanel";

export class  Control{

    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    //存储移动方向(按键方向)
    direction:string = 'd';
    isLive:boolean = true;
    constructor() {
        this.scorePanel = new ScorePanel();
        this.food = new Food();
        this.snake = new Snake();
        this.init();
    }

    init(){
        //js 特性:事件给谁绑定this指向谁，这里this指向document,所以需要bind函数重新绑定Control的this
        document.addEventListener("keydown",this.keyDownHandle.bind(this));

        this.snakeMove();
    }
    keyDownHandle(event:KeyboardEvent){
        //获取键盘用户按键
        this.direction = event.key;
    }

    snakeMove(){
       //改变蛇的位置
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction ){
            case "w":
                y -= 10;
                break;
            case "a" :
                x -= 10;
                break;
            case "d" :
                x += 10;
                break;
            case "s" :
                y += 10;
                break;
        }
        
        this.eatFood(x,y);

       //异常处理结束游戏
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (e) {
            alert("游戏结束!");
            this.isLive = false;
        }

        //定时调用
        this.isLive && setTimeout(this.snakeMove.bind(this),300 -(this.scorePanel.level -1)*30);
    }

    //检查蛇是否吃到食物 x 蛇的坐标
    eatFood(x:number,y:number){

        if(x === this.food.X && y === this.food.Y){
            //食物重置
            this.food.change();
            this.scorePanel.addScore();
            //蛇增加一节
            this.snake.addBody();
        }
    }
}