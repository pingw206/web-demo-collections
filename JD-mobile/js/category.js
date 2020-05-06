 window.onload = function() {
    var ct_cLeft = document.querySelector(".ct_cLeft"); /*获取左侧栏*/
    var ulBox = ct_cLeft.querySelector("ul:first-of-type");  /*获取用来滑动的列表*/
    var lis = ulBox.querySelectorAll("li");

    var leftHeight = ct_cLeft.offsetHeight; /*获取左侧栏的高度-560 用于后面计算滑动区间距离top值*/
    var ulBoxHeight = ulBox.offsetHeight;  /*子元素的高度： 1200 */
    
    var startY = 0;    /*实现滑动*/
    var moveY = 0;
    var distanceY = 0;
     /*记录当前元素滑动到的距离*/
    var currentY=0;

    /*设置滑动区间 */
    /*设置静止状态下的最大top值*/
    var maxTop=0;
    /*设置静止状态下的最小的top值*/
    var minTop=-(ulBoxHeight-leftHeight);
    /*设置滑动状态下的最大的top值*/ 
    var maxBounceTop=maxTop+100;
    /*设置滑动状态下的最小top值*/
    var minBounceTop=minTop-100;

    /*1.添加滑动事件 */
    ulBox.addEventListener("touchstart",function(e){   /*添加滑动事件*/
        startY = e.targetTouches[0].clientY;     /*获取手指的起始坐标*/
    });
    ulBox.addEventListener("touchmove", function(e) {  
        moveY = e.targetTouches[0].clientY; 
        distanceY = moveY - startY;      /*计算距离的差异*/
        /*判断滑动的时候是否超出 指定的滑动区间*/
        if(currentY+distanceY > maxBounceTop || currentY+distanceY < minBounceTop){
            return;  //超出的话就不再滑动，回弹的操作在touchend里设置
        }
        /*先将之前可能添加的过渡效果清除*/
        ulBox.style.transition="none";
        /*实现偏移操作---应该在之前的滑动距离的基础之上再进行滑动*/
        ulBox.style.top=(distanceY+currentY)+'px';

    });
    ulBox.addEventListener("touchend",function(e){
        /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间，超出则回弹*/
        if (currentY + distanceY < minTop) {
            ulBox.style.transition="top 0.5s"; /*回到minTop位置*/
            ulBox.style.top = minTop + "px";
            currentY = minTop;  /*记得这种情况要重置currentY*/
        } else if (currentY + distanceY > maxTop) {
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=maxTop+"px";
            currentY = maxTop;  /*重置currentY*/
        } else{
            currentY += distanceY;  /*记录当前滑动的距离*/
        }
    });

    /*为每一个li元素设置添加一个索引值，方便移动li元素*/
    for(var i = 0; i < lis.length; i++) {
        lis[i].index = i; /*不用lis[i].setAttribute("index",i);会改变页面结构*/
    }

    /* 2.绑定移动端点击tap事件---添加事件可以不用给子元素li添加，为ul父元素添加，这样不会太多 */
    //2.1修改li元素
    itcast.tap(ulBox,function(e){
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        //console.log(e.target)得到的是a标签，事件的响应是通过捕获的方式响应的，不一定捕获到哪一层，可以打印出来看看是a还是li
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
        li.classList.add("active");

        //2.2 移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
        var index = li.index;
        ulBox.style.transition = "top 0.5s";
        if (-index*liHeight < minTop) {
            ulBox.style.top = minTop + "px";
            currentY=minTop;  //记录下currentY
        } else {
            ulBox.style.top = -index*liHeight + "px";
            currentY=-index*liHeight;
        }
    });

    //方法二，不用自己封装的common.js里的itcast.tap，用zepto里的tap来做
    // $(ulBox).on("tap",function(e){
    //     同上自己做的里面部分
    // });
 }