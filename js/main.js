
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
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version    2011.05.27
 * @author    TangBin
 * @see        http://www.planeart.cn/?p=1121
 * @param    {String}    图片路径
 * @param    {Function}    尺寸就绪
 * @param    {Function}    加载完毕 (可选)
 * @param    {Function}    加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
        alert('size ready: width=' + this.width + '; height=' + this.height);
    });
 */
var imgReady = (function() {
    var list = [],
    intervalId = null,

    // 用来执行队列
    tick = function() {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        }; ! list.length && stop();
    },

    // 停止所有定时器队列
    stop = function() {
        clearInterval(intervalId);
        intervalId = null;
    };

    return function(url, ready, load, error) {

        try{
          
            var onready, width, height, newWidth, newHeight, img = new Image();

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            };

            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function() {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function() {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024) {
                    ready.call(img);
                    onready.end = true;
                };
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function() {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                ! onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            };
        }catch(e){
            console.log(e);
        }

    };
})();


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

var newBackground = images.default[0];

imgReady(config.baseurl+'/'+images.basePath+images.default[0].path,function(){});

/** 定时改变首页背景图片 */
var backInterval_id = setInterval(function(){

    //判断终端类型，手机不不变换背景
    if(!browser.versions.mobile && !browser.versions.ios && !browser.versions.android && !browser.versions.iPhone){
        //随机获取可用图片信息
        var pic = getPicture();

        //背景变更
        changeBackground(newBackground);

        //预加载图片
        imgReady(config.baseurl+'/'+images.basePath+pic.path, function () {
            //console.log('size ready: width=' + this.width + '; height=' + this.height);
        });

        newBackground = pic;
    }

},config.changeBackgroundTime);

(function(){
    if(browser.versions.mobile && browser.versions.ios && browser.versions.android && browser.versions.iPhone){
        changeBackground(images.phone[0]);
        clearTimeout(backInterval_id);
    }
})();



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
