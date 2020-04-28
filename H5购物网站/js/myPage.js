$(document).ready(function() {
    // 当前屏幕高度
    var k = $(window).height();
    var flag = false; //用来控制动画显示顺序的；第二屏动画走完才往下掉沙发；从第三屏返回第二屏不再走第二屏的动画

	$('#fullpage').fullpage({
        //入口参数设置--fullpage方法里面接收json对象形式
        //是否显示导航栏
        navigation: true,
        //滚动速度
        scrollingSpeed: 1200,
        //回调函数--滚动到某一屏触发---滚动到第二屏
        afterLoad: function(origin, destination, direction) {  /*index从0开始 */
            if(destination.index == 1 && flag == false) {   /*经过验证，不是origin.index */
                $(".search").show().animate({right: 370}, 1500, function(){  /*套回调函数；框滑进来 */
                    $(".search-words").animate({opacity:1}, 500,function(){  /*字出现 */
                        $(".search").hide();  /*框和字消失，同时另一套框字图片出现 */
                        /*往右上角缩小 */
                        $(".search02").show().animate({height: 30,width: 148, right: 250, bottom: 452},1000,function(){
                            flag = true;  //flag = true动画走完了，沙发可以往下掉了
                        }); 
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
            //---从第二屏到第三屏滚动
            if(origin.index == 1 && direction == 'down' && flag == true) {
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
                        $(".section").animate({backgroundPositionX:"100%"},4000,function(){ 
                            $(".boy").animate({height:305,bottom:116},1000,function(){ //车停后，男孩跳出来
                                $(".boy").animate({right:400},500);//男孩跳向右边
                            }); 
                        });
                        $(".pop-06").show(); //地址出现
                    });
                })

            }
        }
    });
}); 