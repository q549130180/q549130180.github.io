var todayPicture = images.test;

/** 时钟 */
setInterval(function() {
  /** 是否显示24小时制 */
  var is24hoursClock = true;
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
  if(!is24hoursClock){
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
 * @param  {[type]} i [随机图片角标]
 * @return {[type]}   [description]
 */
function changeBackground(i){
    $("body").css("background-image","url('"+images.basePath+todayPicture[i].path+"')");
}

/** 定时改变首页背景图片 */
setInterval(function(){
    console.log(1);
    console.log("random:"+GetRandomNum(0,todayPicture.length));
    changeBackground(0);

},10000);
