// 封装移动端的tap点击事件

var itcast ={
    tap: function(dom, callback) {  /*dom:传入的dom元素让我们可以为任意的元素添加tap事件*/
        if (!dom || typeof dom!= "object") {   /*判断是否传入对象同时对象应该是一个dom元素*/
            return;
        }
        var startTime, startX, startY;
        dom.addEventListener("touchstart",function(e){
            if(e.targetTouches.length > 1) {    /*判断是否只有一根手指进行操作*/
                return;  
            }
            startTime = Date.now();    /*记录手指开始触摸的时间*/
            startX = e.targetTouches[0].clientX;    /*记录当前手指的坐标*/
            startY = e.targetTouches[0].clientY;
        });
        dom.addEventListener("touchend",function(e){  /*touchend：当手指松开时候触发，意味着当前元素上已经没有手指对象了,所以无法通过targetTouches来获取手指对象*/
            if(e.targetTouches.length > 1) {
                return;
            }
            if(Date.now()-startTime > 150) {   //排除长按操作
                return;  
            }
            var endX = e.changedTouches[0].clientX;  //松开手指时的坐标
            var endY = e.changedTouches[0].clientY;

            if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {  /*这里暂且将距离差异定为6是符合单击的，不是滑动*/
               // console.log("这就是移动端的单击事件--tap事件");
                //callback && callback();  //首先判断用户是否传入回调函数，有的话再回调，
                callback && callback(e); //回调时把e传回去，调用的时候会用到e.target
            }
        })
    }
};