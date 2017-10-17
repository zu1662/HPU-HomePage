/**
 * Created by zu166 on 2017/4/10.
 */
window.onload = function() {
    function $(id) {
        return document.getElementById(id);
    }

    //登陆界面
    $("login").onclick = function () {
        $("mask").style.display = "block";
        $("logo").style.display = "block";
    }
    $("close_all").onclick = function () {
        $("mask").style.display = "none";
        $("logo").style.display = "none";
    }
    $("number").onfocus = function () {
        if ($("number").value == "学号" || $("number").value == "请输入数字学号") {
            $("number").value = "";
            $("number").style.color = "#000";
        }
    }
    $("number").onblur = function () {
        if ($("number").value == "" || $("number").value == "请输入数字学号") {
            $("number").value = "学号";
            $("number").style.color = "#ccc";
        } else if (isNaN($("number").value)) {
            $("number").value = "请输入数字学号";
            $("number").style.color = "red";
        }
    }
    $("psw").onfocus = function () {
        if ($("psw").value == "密码") {
            $("psw").value = "";
            $("psw").style.color = "#000";
            $("psw").type = "password";
        }
    }
    $("psw").onblur = function () {
        if ($("psw").value == "") {
            $("psw").value = "密码";
            $("psw").type = "text";
            $("psw").style.color = "#ccc";
        }
    }
    //登陆界面拖动
    $("logo_head").onmousedown = function(event){
        var event = event ||window.event;
        var leftVal = event.clientX - $("logo").offsetLeft;
        var topVal = event.clientY - $("logo").offsetTop;
        document.onmousemove = function(event){
            var event = event ||window.event;
        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }
    }

    //轮播图
    $("images").onmouseover = function(){
        clearInterval(timer);
        $("left").parentNode.style.display = "block";
        $("left").onmouseover = function(){
            $("left").style.backgroundColor = "rgba(0,0,0,.3)";
        }
        $("left").onmouseout = function(){
            $("left").style.backgroundColor = "rgba(0,0,0,.1)";
        }
        $("right").onmouseover = function(){
            $("right").style.backgroundColor = "rgba(0,0,0,.3)";
        }
        $("right").onmouseout = function(){
            $("right").style.backgroundColor = "rgba(0,0,0,.1)";
        }
        $("left").onclick = function(){
            key--;
            if(key < 0){
               key= 0;
            }
            nowCircle--;
            if(nowCircle < 0){
               nowCircle = 0;
            }
            for(var i = 0;i<circles.length;i++){
                circles[i].className = "";
            }
            circles[nowCircle].className = "current";
            animate($("img"),-key*imgs[0].offsetWidth);
        }
        $("right").onclick = function(){
            key++;
            if(key > imgs.length-2){
               key = imgs.length-2;
            }
            nowCircle++;
            if(nowCircle > circles.length-1){
                nowCircle =circles.length-1;
            }
            for(var i = 0;i<circles.length;i++){
                circles[i].className = "";
            }
            circles[nowCircle].className = "current";
            animate($("img"),-key*imgs[0].offsetWidth);
        }
    }
    $("images").onmouseout = function(){
        $("left").parentNode.style.display = "none";
        timer = setInterval(autoplay,3000);
    }
        var imgs = $("img").children;
        //匀速动画函数
        function animate(obj,target){
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var result = (target - obj.offsetLeft)/10;
                result =  result > 0 ? Math.ceil(result) : Math.floor(result);
                obj.style.left = obj.offsetLeft + result + "px";
                if(obj.offsetLeft == target){
                    clearInterval(obj.timer);
                }
            },20)
        }
        for(var i = 0;i < imgs.length-1;i++){
            var li_e = document.createElement("li");
            $("circle").appendChild(li_e);
        }

        var circles = $("circle").children;
        for(var i = 0;i<circles.length;i++){
            circles[i].index = i;
            circles[i].onmouseover = function(){
                for(var j =0;j<circles.length;j++){
                    circles[j].className = "";
                }
                this.className = "current";
                animate($("img"),-this.index*imgs[0].offsetWidth);
                nowCircle = key = this.index;
            }
        }
        //添加自动播放定时器
        var key = 0;
        var nowCircle = 0;
        var timer = setInterval(autoplay,3000);
        function autoplay(){
            key++;
            if(key > imgs.length-1){
                $("img").style.left = 0;
                key = 1;
            }
            nowCircle++;
            if(nowCircle > circles.length-1){
                nowCircle = 0;
            }
            for(var i = 0;i<circles.length;i++){
                circles[i].className = "";
            }
            circles[nowCircle].className = "current";
            animate($("img"),-key*imgs[0].offsetWidth);
        }
   /* $("img").parentNode.onmouseout = function(){
        timer = setInterval(rorate,3000);
        $("left").parentNode.style.display = "none";
    }


    var imgs = $("img").children;
    var timer = null;
    for (var i = 0; i < imgs.length - 1; i++) {
        var li_e = document.createElement("li");
        if (i == 0) {
            $("circle").appendChild(li_e);
            li_e.className = "current";
        } else {
            $("circle").appendChild(li_e);
        }
    }
    var circles = $("circle").children;
    for (var i = 0; i < circles.length; i++) {
        circles[i].index = i;
        circles[i].onmouseover = function () {
            clearInterval(timer);
            for (var j = 0; j < circles.length; j++) {
                circles[j].className = "";
            }
            this.className = "current";
            target = -733*this.index;
        }

    }
    //滚动函数
    var leader = 0,target = 0;
    setInterval(function(){
        leader = leader + (target - leader)/10;
        $("img").style.left = leader + "px";
    },20);
    //自动无缝滚动
    timer = setInterval(rorate,3000);
    function rorate(){
        target-=733;
        for (var j = 0; j < circles.length; j++) {
            circles[j].className = "";
        }
        if( target == -2932){
            target=0;
            leader = 0;
        }
        circles[-target/733].className = "current";
    }*/
    //导航
    $("xxgk").onmouseover = function(){
        $("xxgk_list").style.display = "block";
    }
    $("xxgk").onmouseout = function(){
        $("xxgk_list").style.display = "none";
    }


}