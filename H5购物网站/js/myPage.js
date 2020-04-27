$(document).ready(function() {
    // 当前屏幕高度
    var k = $(window).height();

	$('#fullpage').fullpage({
        //入口参数设置--fullpage方法里面接收json对象形式
        //是否显示导航栏
        navigation: true,
        //回调函数--滚动到某一屏触发
        afterLoad: function(origin, destination, direction) {  /*index从0开始 */
            if(destination.index == 1) {   /*经过验证，不是origin.index */
                $(".search").show().animate({right: 370}, 1500, function(){  /*套回调函数；框滑进来 */
                    $(".search-words").animate({opacity:1}, 500,function(){  /*字出现 */
                        $(".search").hide();  /*框和字消失，同时另一套框字图片出现 */
                        /*往右上角缩小 */
                        $(".search02").show().animate({height: 30,width: 148, right: 250, bottom: 452},1000); 
                        // 同时沙发图片出现
                        $(".goods-02").show().animate({height: 218},1000);
                        // 同时上面白色字体出现
                        $(".words-02").animate({opacity: 1},500);
                    })
                }); 
            } 
        },

        //回调函数 -- 刚开始滚动时触发
        onLeave: function(origin, destination, direction){
            if(origin.index == 1 && direction == 'down') {
                $(".shirt-02").show().animate({bottom: -(k - 250),width:207,left:260},2000);
                $(".cover").show();
            }
        }
       



    });
}); 