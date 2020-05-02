 window.onload=function() {
    searchEffect();
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