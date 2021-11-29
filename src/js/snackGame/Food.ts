/**
 @author: Jersey
 @create: 2021-11-27 19:34
 @version: V1.0
 @slogan: 业精于勤,荒于嬉;行成于思,毁于随。
 @description: 食物类
 */
export  class  Food{

    element:HTMLElement;

    constructor() {
        //获取页面的food元素并将其赋值给element
        this.element  = document.getElementById("food")!; //!表示不可能为空
    }
    //获取食物的坐标
    get X(){
       return  this.element.offsetLeft;
    }
    get Y(){
       return  this.element.offsetTop;
    }
    //食物的位置随机生成 最小0 最大290，必须是10的倍数
    change(){

         this.element.style.top =  Math.round(Math.random()*29) * 10 +"px";
         this.element.style.top = Math.round((Math.random()*29)) * 10 +"px";
    }

}