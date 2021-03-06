 window.onload=function() {
    searchEffect();
    timeBack();
    bannerEffect();
 }

/*头部的js效果*/
 function searchEffect() {
    // 1.获取当前banner高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
     /*获取header搜索块*/
    var search=document.querySelector(".jd_search");
    // 2.获取当前屏幕滚动时，banner滚出屏幕的距离
    window.onscroll = function() {
        var offsetTop = document.documentElement.scrollTop;
        
        // 3.计算比例值，获取透明度，设置背景颜色
        var opacity = 0;
        //判断，如果bannerm没有完全滚动出屏幕时才有必要计算设置透明度;最后opacity=0.99停在了这里
        if(offsetTop < bannerHeight) {
            opacity=offsetTop/bannerHeight;
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
 }

/*秒杀倒计时效果*/
 function timeBack() {
     /*1.获取用于展示时间的span*/
     var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
     /*2.设置初始的倒计时时间,以秒做为单位；因为后面的间隔1000毫秒就是1秒一次*/
     var totalTime = 3700;
      /*3.开启定时器，给它一个名字，方便后面清除定时器*/
     var timerId = setInterval(function(){
        totalTime--;
         /*判断倒计时时间是否已经完成，清除定时器，不然就是负数了*/
        if (totalTime < 0) {
            clearInterval(timerId);
            // 可以把return改成别的弹窗事件
            return;
        }
        //获取剩余时间的小时，分钟，秒
        var hour = Math.floor(totalTime/3600);
        var minute = Math.floor(totalTime%3600/60);
        var second = Math.floor(totalTime%3600%60);
        //将时间填充到span中去，注意首位的0怎么显示出来
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
     },1000);
 }

/* 轮播图效果 */
function bannerEffect() {
    /*1.设置修改轮播图的页面结构
    * a.在开始位置添加原始的最后一张图片
    * b.在结束位置添加原始的第一张图片*/
    /*1.1.获取轮播图结构*/
    var banner = document.querySelector(".jd_banner");
    /*1.2.获取图片容器*/
    var imgBox = banner.querySelector("ul:first-of-type");
    /*1.3.获取原始的第一张,最后一张图片*/
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    /*1.4.在首尾插入两张图片   cloneNode:复制一个dom元素*/
    imgBox.appendChild(first.cloneNode(true));
     /*insertBefore(需要插入的dom元素，位置)*/
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    /* 2.设置修改后的样式 */
        /*2.1获取所有li元素*/
    var lis = imgBox.querySelectorAll("li");
    /*2.2 获取li元素的数量*/
    var count = lis.length;
    /*2.3.获取banner的宽度*/
    var bannerWidth = banner.offsetWidth;
    /*2.4 设置图片盒子的宽度*/
    imgBox.style.width = count*bannerWidth+"px";
    /*2.5 设置每一个li(图片)元素的宽度*/
    for (var i = 0; i < count; i++) {
        lis[i].style.width = bannerWidth+"px";
    }

    /*定义图片索引:图片已经有一个宽度的默认偏移，所以不再是0*/
    var index=1;

    /*3.设置默认的偏移:一个banner宽度*/
    imgBox.style.left = -bannerWidth+"px";

    /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize = function(){
        /*4.1.获取banner的宽度,覆盖全局的宽度值*/
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth+"px";
        for (var i = 0; i < count; i++) {
            lis[i].style.width = bannerWidth+"px";
        }
        /*重新设置定位值*/
        imgBox.style.left = -index*bannerWidth+"px";
    }

    /*添加点标记 */
    var setIndicator = function(index) {
        var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        /*先清除其它li元素的active样式*/
        for (var i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove("active");
        }
         /*为当前li元素添加active样式*/
         indicator[index - 1].classList.add("active");
    }
    
    var timerId; //写在5外面声明，因为6里面还要调用，重启定时器 循环

    /*5.实现自动轮播*/
    var startTime = function() {
        timerId = setInterval(function(){
            /*5.1 变换索引*/
            index++;
            /*5.2.添加过渡效果*/
            imgBox.style.transition = "left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            imgBox.style.left = (-index*bannerWidth) + "px";
            /*5.4 判断是否播到最后一张*/
            setTimeout(function(){
                if (index == count -1) {
                    // 从末尾到L1切换到前面到L1
                    index = 1; 
                    /*关闭过渡效果，实现快速切换，否则会看出来两张同样图片的切换过程*/
                    /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index*bannerWidth) + "px";
                }
            },500);
        },1500);
    }
    startTime();

    /*6.实现手动轮播 */
    var startX, moveX, distanceX;
    /*标记当前过渡效果是否已经执行完毕*/
    var isEnd=true; 
    /*6.1触摸开始事件*/
    imgBox.addEventListener("touchstart",function(e){  /*为图片添加触摸事件--触摸开始*/
        clearInterval(timerId); /*清除定时器*/
        startX = e.targetTouches[0].clientX;/*获取当前手指的起始位置*/
    });
    /*6.2滑动过程事件*/
    imgBox.addEventListener("touchmove",function(e){
        if (isEnd == true){
            moveX = e.targetTouches[0].clientX;  /*记录手指在滑动过程中的位置*/
            distanceX = moveX - startX;   /*计算坐标的差异*/
            imgBox.style.transition = "none";   /*为了保证效果正常，将之前可能添加的过渡样式清除*/
            imgBox.style.left = (-index*bannerWidth + distanceX) + "px";  /*实现元素的偏移  left参照最原始的坐标
            注意：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
        }   
        
    });
    /*6.3触摸结束事件*/
    imgBox.addEventListener("touchend",function(e){
        /*松开手指，标记当前过渡效果正在执行*/
        isEnd=false;
        /*获取当前滑动的距离，判断距离是否超出指定的范围 100px*/
        if(Math.abs(distanceX) > 100) {
            if (distanceX > 0) { //上一张
                index--;
            } else {    //下一张
                index++;
            }
            // 翻页
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        } else if (Math.abs(distanceX) > 0){ //得保证用户确实进行过滑动操作
            //回弹
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        }
         /*将上一次move所产生的数据重置为0*/
        startX=0;
        moveX=0;
        distanceX=0;
    });
    /*6.4 每一张过渡效果执行完毕时*/   
    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        // 手动到第一张或最后一张时,跳转处理，这样不至于出现空白页
        if (index == count - 1) {    /*如果到了最后一张(count-1)，回到索引1*/
            index = 1;
            imgBox.style.transition = "none";   /*清除过渡*/
            imgBox.style.left = (-index*bannerWidth) + "px";  /*设置偏移*/
        }
        if (index == 0) {    /*如果到了第一张(0)，回到索引count-2*/  
            index = count - 2;
            imgBox.style.transition = "none"; 
            imgBox.style.left = (-index*bannerWidth) + "px";
        }
         /*设置标记*/
        setIndicator(index);

        setTimeout(function(){ //--过渡完0.5秒钟之后才能下面事件
            isEnd=true; //过渡结束后才可以手动拖拽
            /*清除之前添加的定时器,不然开启的定时器越来越多*/
            clearInterval(timerId);
            //过渡结束后重新开启定时器，自动轮播
            startTime();},500); 
    });
    

}