function autoRollImg() {
  var timer = null;
  var index = 0;
  var showContainer = document.getElementsByClassName("showContainer")[0];
  var container = document.getElementsByClassName("container")[0];
  var imgNum = container.children.length;
  var oneImgWidth = container.children[0].offsetWidth;
  var leftTriangle = document.getElementsByClassName("left-triangle")[0];
  var rightTriangle = document.getElementsByClassName("right-triangle")[0];
  var dots = document.getElementsByClassName("dots")[0].children;


  function movement(offset) {
    var oldLeftPos = parseInt(container.style.left); 
    var newLeftPos = oldLeftPos + offset;
    container.style.left = newLeftPos + "px";
  }

  function rollAuto() {
    timer = setInterval(function(){ 
      index = index + 1;
      if(index > imgNum -1){
        index = 0;
      }
      showDots(index);
      movement(-oneImgWidth);
      if (parseInt(container.style.left) <= -imgNum * oneImgWidth) {
        container.style.left = "0px";
      }
    },1000); 
  }
  rollAuto();  //需要先执行一次定时器函数，才可以开始定时器

  showContainer.onmouseover = function() {
  clearInterval(timer);      //rollAuto()执行了一次后，timer就不再是null了
  };
  showContainer.onmouseout = function() {
  rollAuto();
  };


  function clickTriangle() {
    leftTriangle.onclick = function() {
      if (parseInt(container.style.left) >= 0){
        container.style.left = -(imgNum - 1) * oneImgWidth + "px";
      } else {
      movement(oneImgWidth);
      }
      index = index - 1; 
      if (index < 0) {
        index = imgNum - 1;
      }
      showDots(index);
      clearInterval(timer); 
    };
    leftTriangle.onmouseout = function(){
      rollAuto();
    };
    rightTriangle.onclick = function() {
      if (parseInt(container.style.left) <= -(imgNum - 1)* oneImgWidth) {
        container.style.left = "0px";
      } else {
        movement(-oneImgWidth);
      }
      index = index +1;
      if(index > imgNum - 1) {
        index = 0;
      }
      showDots(index);
      clearInterval(timer);
    };
    rightTriangle.onmouseout = function() {
      rollAuto();
    }
  };
  clickTriangle();

  function showDots(target) {
    for (var i = 0; i < dots.length; i++) {
      if (i !== target) {
        dots[i].classList.remove("active");
      } else {
        dots[i].classList.add("active");
      }
    }
  }

  function clickDots() {
    for (var i = 0; i < dots.length; i++) {
      (function(n){
        dots[n].onclick = function(){
          container.style.left = -n*oneImgWidth + "px";
          index = n;
          showDots(index);
          clearInterval(timer); 
        }
        dots[n].onmouseout = function() {
          rollAuto();
        }
      })(i);   //闭包
    }
    return index;
  }
  clickDots();


}

window.onload = autoRollImg;


