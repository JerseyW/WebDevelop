/**
 @author: Jersey
 @create: 2021-11-27 20:52
 @version: V1.0
 @slogan: 业精于勤,荒于嬉;行成于思,毁于随。
 @description: 蛇类 ---遵循单一职责原则
 */

export class Snake{

    head:HTMLElement;
    bodies:HTMLCollection;
    element:HTMLElement;
    constructor() {
       this.head = document.querySelector("#snake > div") as HTMLElement;
       this.element = document.getElementById("snake") as HTMLElement;
       this.bodies = this.element.getElementsByTagName(`div`);

    }
    get X(){
        return  this.head.offsetLeft;
    }
    get Y(){
        return  this.head.offsetTop;
    }
    set X (value:number){
        if (this.X === value) return;
        //x 的值合法：0-290之间
        const  moveWidth = document.getElementById("stage")!.clientWidth - 10 * this.bodies.length;
        if (value < 0 || value > moveWidth){
            throw  new Error("game over")
        }
        //修改x 时在修改水平的坐标，向左移动时不能向右走，反之亦然
        //判断蛇头的x的坐标与第二节坐标是否相同，相同说明蛇掉头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){

            //如果发生掉头。让蛇向反方向移动,修正蛇的移动
            if (value > this.X) { //说明蛇向右走，此时反生掉头，蛇应该向左走
                  value  = this.X - 10;
            }
            else value = this.X + 10;
        }
        this.moveBody();
        this.head.style.left = value + "px";
        this.checkHeadBody();
    }
    set Y (value:number){
        if (this.Y === value) return;
        const  moveHeight = document.getElementById("stage")!.clientHeight - 10 * this.bodies.length;
        if (value < 0 || value > moveHeight){
            throw  new Error("game over")
        }
        //修改Y  时在修改垂直的坐标，向左移动时不能向下走，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //如果发生掉头。让蛇向反方向移动,修正蛇的移动
            if (value > this.Y) { //说明蛇向右下走，此时反生掉头，蛇应该向上走
                value = this.Y - 10;
            } else value = this.Y + 10;
        }
        this.moveBody();
        this.head.style.top = value + "px";
        this.checkHeadBody();
    }
    //扩张蛇的身体
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    moveBody(){

         //从后往前改，后边的身体设置为前边身体的位置
        for (let i = this.bodies.length - 1 ; i > 0 ; i--) {
            //获取前边身体的位置
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;
            //设置到当前蛇的身体
            (this.bodies[i] as HTMLElement).style.left = x + "px";
            (this.bodies[i] as HTMLElement).style.top = y + "px";
        }
    }
    //检查蛇头是否撞到自己了
    checkHeadBody(){
        //获取所有的身体是否与蛇头的坐标反生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd  = (this.bodies[i] as HTMLElement);
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //蛇头撞到自己了
                throw  new Error("game over")
            }
        }
    }
}