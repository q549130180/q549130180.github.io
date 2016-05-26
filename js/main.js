
/** 时钟 */
setInterval(function() {

    var seconds = new Date().getSeconds();

    var sdegree = seconds * 6 + 270;
    seconds = ("0" + seconds).slice(-2);
    var secondSel = document.querySelector(".seconds");

    secondSel.style.transform = "rotate(" + sdegree + "deg) translate(160px) rotate(-" + sdegree + "deg)";
    secondSel.innerHTML = seconds;

    var minutes = new Date().getMinutes();
    var mdegree = minutes * 6 + 270;
    var minutesSel = document.querySelector(".minutes");
    minutes = ("0" + minutes).slice(-2);

    minutesSel.style.transform = "rotate(" + mdegree + "deg) translate(181px) rotate(-" + mdegree + "deg)";
    minutesSel.innerHTML =  minutes;

    var hours = new Date().getHours();

    var hoursSel = document.querySelector(".hours");

    /** 12 or 24 hours*/
    if(!config.is24hoursClock){
      if (hours > 12) {
        hours = hours - 12;
      }
    }


    hours = ("0" + hours).slice(-2);

    hoursSel.innerHTML = hours;
}, 1000);

//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

//browser.versions.trident返回真假，真则是IE内核，以此类推browser.versions.webKit是否为谷歌内核
//if(browser.versions.trident){
//    alert("is IE");
//}

/**
 * 获取随机数
 * @param {[type]} Min [随机数最小值]
 * @param {[type]} Max [随机数最大值]
 */
function GetRandomNum(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

/**
 * 改变body的背景图片
 * @param  {[JSON]} pic [随机图片信息]
 * @return {[type]}   [description]
 */
function changeBackground(pic){
    $("body").css("background-image","url('"+images.basePath+pic.path+"')");
};

/**
 * 随机获取一张可用的图片信息
 * [getPicture description]
 * @return {[type]} [description]
 */
function getPicture(){
    var pic = config.todayPicture[GetRandomNum(0,config.todayPicture.length-1)];

    if(pic.isActive === "Y"){
      return pic;
    }else{
      getPicture();
    }


};

/** 定时改变首页背景图片 */
setInterval(function(){
    //判断终端类型，手机不不变换背景
    if(!browser.versions.mobile && !browser.versions.ios && !browser.versions.android && !browser.versions.iPhone){
        //随机获取可用图片信息
        var pic = getPicture();

        //背景变更
        changeBackground(pic);
    }
},config.changeBackgroundTime);



/** 首页全屏处理 */

//反射调用
var invokeFieldOrMethod = function(element, method) {
    var usablePrefixMethod; ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
        if (usablePrefixMethod) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0, 1).toLowerCase() + method.slice(1);
        }
        var typePrefixMethod = typeof element[prefix + method];
        if (typePrefixMethod + "" !== "undefined") {
            if (typePrefixMethod === "function") {
                usablePrefixMethod = element[prefix + method]();
            } else {
                usablePrefixMethod = element[prefix + method];
            }
        }
    });

    return usablePrefixMethod;
};


/**
 * 进入全屏
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function launchFullscreen(element) {

    //此方法不可以在异步任务中执行，否则火狐无法全屏
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    } else {

        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('videobox');
        var cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
        document.IsFullScreen = true;

    }
}


/**
 * 退出全屏
 * @return {[type]} [description]
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('videobox');
        docHtml.style.cssText = "";
        docBody.style.cssText = "";
        videobox.style.cssText = "";
        document.IsFullScreen = false;
    }
}

document.getElementById('fullScreenBtn').addEventListener('click',function() {
    debugger;

    //检查浏览器是否处于全屏
    if (invokeFieldOrMethod(document, 'FullScreen') || invokeFieldOrMethod(document, 'IsFullScreen') || document.IsFullScreen) {
        //如果处于全图则退出全屏
        exitFullscreen();
    }else{
        launchFullscreen(document.documentElement);
    }

},false);




/** 图标 */

$('#sh_cp_info').mouseover(function(){
  console.log(1);
  //$('#sh_cp_info_in').css('ackground-position-x','-252px');
});


var myQuotes =  new Array();
//文本中停顿myQuotes.push("First ^1000 sentence.");

myQuotes.push("Blog description");
myQuotes.push("My Blog");

$(".intro-text").typed({
    strings: myQuotes,
    typeSpeed: 10,  //速度
    backDelay: 5000,//删除延时
    startDelay: 200,//开始延时
    loop: true,
    loopCount: false,//Set False for infinite loop, or set any number for finite loop.
    cursorChar: "|"
});
