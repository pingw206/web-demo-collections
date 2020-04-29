$(document).ready(function() {
    // 当前屏幕高度
    var k = $(window).height();
    //var flag = false; 用来控制动画显示顺序的；第二屏动画走完才往下掉沙发；从第三屏返回第二屏不再走第二屏的动画

	$('#fullpage').fullpage({
        //入口参数设置--fullpage方法里面接收json对象形式
        //是否显示导航栏
        navigation: true,
        //滚动速度
        scrollingSpeed: 1200,
        //回调函数--滚动到某一屏触发---滚动到第二屏
        afterLoad: function(origin, destination, direction) {  /*index从0开始 */
            if(destination.index == 1) {   /*经过验证，不是origin.index, 另外删掉&&flag == false */
                $(".search").show().animate({right: 370}, 1500, function(){  /*套回调函数；框滑进来 */
                    $(".search-words").animate({opacity:1}, 500,function(){  /*字出现 */
                        $(".search").hide();  /*框和字消失，同时另一套框字图片出现 */
                        /*往右上角缩小 */
                        $(".search02").show().animate({height: 30,width: 148, right: 250, bottom: 452},1000); //删掉function(){flag = true}; 动画走完了，沙发可以往下掉了
                        // 同时沙发图片出现
                        $(".goods-02").show().animate({height: 218},1000);
                        // 同时上面白色字体出现
                        $(".words-02").animate({opacity: 1},500);
                    });
                }); 
            } 
        },

        //回调函数 -- 刚开始滚动时触发 
        onLeave: function(origin, destination, direction){
            //---从第二屏到第三屏滚动
            if(origin.index == 1 && direction == 'down') {   //&& flag == true删掉
                $(".shirt-02").show().animate({bottom: -(k - 250),width:207,left:260},2000,function(){  //往下掉沙发到位置，同时放大图片；注意250是怎么算出来的
                    $(".img-01-a").animate({opacity:1},500,function(){
                        $(".btn-01-a").animate({opacity:1},500);
                    })
                });  
                $(".cover").show();
            }
            //从第三屏到第四屏滚动
            if(origin.index == 2 && direction == 'down') {
                $(".shirt-02").hide();
                //斜沙发出现,掉进第四屏的购物车中；距离计算：第四屏当前屏幕高度-250 + 第三屏的50距离
                $(".t1f").show().animate({bottom: -((k-250) + 50), left:250},2000,function(){
                    $(this).hide(); //出现完本身就隐藏
                    $(".car-img").show();//车里本来的沙发出现
                    //车往右走,jquery-ui里的easing定义走的速度，不再是匀速
                    $(".car").animate({left:2000},2000,"easeInElastic",function(){ 
                        //车走完后，note显示出来，然后显示上面的字同时显示的有上面标题的红字
                        $(".note").animate({opacity:1},1000,function(){
                            $(".note-img, .words-04-a").animate({opacity:1},1000);
                        });
                    }) 
                });  
            }
            //第四屏到第五屏
            if(origin.index == 3 && direction == 'down') {
                $(".hand").animate({bottom: 0},1000,function(){  //手出来
                    $(".mouse-05-a").show();  //鼠标亮
                    $(".t1f-05").show().animate({bottom:70},1000,function(){ //沙发掉下来
                        $(".order-05").animate({bottom:390},1000,function(){  //账单升出来
                            $(".words-05").addClass("words-05-a"); //注意添加的class前面没有点
                        });  
                    });   
                })
            }
            //第五屏到第六屏
            if(origin.index == 4 && direction == 'down') {
                // 沙发往下掉，同时缩小；注意掉的距离一定要是计算出来的，这样当每个用户屏幕不一样高时还可以用
                $(".t1f-05").animate({bottom: -(k-500),left: "40%", width:65},1000,function(){
                    $(".t1f-05").hide();//沙发消失(不知道为什么不能用this,下面也不能用)
                });
                // 沙发掉掉同时盒子跑过来接住
                $(".box-06").animate({left:"38%"},1000,function(){ //然后盒子开始往下掉进车里
                    $(".box-06").animate({bottom:40},500,function(){
                        $(".box-06").hide(); //盒子消失
                        //背景移动，效果是车在跑;只改变背景的X坐标即可
                        $(".section6").animate({"backgroundPositionX":"100%"},1000,function(){ 
                            $(".boy").animate({"height":305,"bottom":116},1000,function(){ //车停后，男孩跳出来
                                $(".boy").animate({"right":500},500,function(){ //男孩跳向右边
                                    $(".door").animate({"opacity": 1},200,function(){ //门打开
                                        $(".girl").show().animate({right:350,height:305},200,function(){ //女生走出门
                                            $(".pop-07").show(); //女孩出来后，请收货
                                        }); 
                                    });
                                });
                            }); 
                        });
                        //上面跟着车跑的一段话
                        $(".words-06").show().animate({left:"30%"},500,"easeOutElastic");
                        $(".pop-06").show(); //跟着车跑的地址
                    });
                })
            }
            //第六屏到第七屏
            if(origin.index == 5 && direction == 'down') {
                setTimeout(function(){ //指定的时间之后再调用函数---加载完页面停1s再点亮星星
                    $(".star").animate({"width":"100%"},1000,function(){  //然后再出现好评字样
                        $(".good-07").show();
                    });
                },1000)
            }
            //这是第八屏动画，不需要滚动触发
            // $("beginShoping").mouseenter(function(event){
            //     $(".btn-08-a").show();
            // }).mouseleave(function(event){
            //     $(".btn-08-a").hide();
            // });
            //更简洁的方法是用hover+toggle来做
            $(".beginShoping").hover(function(event){
                $(".btn-08-a").toggle();
            })
            //手随鼠标动；获取鼠标位置赋给手动坐标
            $(document).mousemove(function(event) {
                var x = event.pageX - $(".hand-08").width()/2; //-为了对准手中间
                var y = event.pageY + 10; //+为了不挡住手
                var minY = k - 449;   //手的高度是449，为了不让手往上走太多漏出来下面没胳膊
                if (y < minY) {
                    y = minY;
                }
                $(".hand-08").css({left:x, top:y});
            });
            //当点击再来一次时，分两步，1 回到第一屏，2 复原动画
            //1.回到第一屏
            $(".again").click(function(event){
                //给fullpage添加methods方法：滚动到第一屏
                $.fn.fullpage.moveTo(1);
                //清除动画，也就是让图片/盒子 清除js添加到行内样式style；所以还得补个工作就是给有动画到盒子添加类名 .move
                $("img, .move").attr("style","");
            });
        },
    });
}); 