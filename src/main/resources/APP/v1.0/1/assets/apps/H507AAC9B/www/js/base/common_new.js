﻿﻿﻿//关闭加载框
function finishLoading(){
	plus.nativeUI.closeWaiting();
   	mui.currentWebview.show();
}
//关闭当前页面
var backPrePage = function(){
	var ws=plus.webview.currentWebview();
	ws.close();
}

function refreshMain(){
	//页面关闭事件
	plus.webview.currentWebview().addEventListener("close",function(){
		var ws = plus.webview.currentWebview().opener();
		mui.fire(ws, "refreshPage");
	});
}
 
//返回到指定页面
function backParentPage(key){
	var firstWebviewId = key;
	var wvs =  plus.webview.all();
	plus.webview.show(firstWebviewId);
	for(var i=wvs.length-1;i>=0;i--){
		if(wvs[i].id != firstWebviewId){
			plus.webview.hide(wvs[i].id);
		}else{
			break;
		}
	}
	for(var i=wvs.length-1;i>=0;i--){
		if(wvs[i].id != firstWebviewId){
			plus.webview.close(wvs[i].id);
		} else{
			break;
		}
	}
}

/**
 * 用系统浏览器打开第三方网址
 * @param {Object} url
 */
function openURL(url){
	plus.runtime.openURL(url);
}


function gotoHomePage(){
	backParentPage('index-window');
}

function gotoLoginPage(){
	var firstWebviewId = plus.runtime.appid;
		var wvs =  plus.webview.all();
	for(var i=wvs.length-1;i>=0;i--){
			if(wvs[i].id != firstWebviewId){
			plus.webview.hide(wvs[i].id);
		}
	}
	for(var i=wvs.length-1;i>=0;i--){
				if(wvs[i].id != firstWebviewId){
			plus.webview.close(wvs[i].id);
		}
	}
}
//打印所有打开的webview
function consoleCurrWebviews(){
	var wvs =  plus.webview.all();
	for(var i=wvs.length-1;i>=0;i--){
		console.log(i+":"+wvs[i].id);
	}
}
/**
 * 处理空对象
 * @param val
 * @returns
 */
function processNULL(val) {
	if(undefined == val ||'undefined' == val || null == val || 'null' == val) {
		return '';
	} else {
		return val;
	}
}
//修改或添加键值(key-value)对数据到应用数据存储中
function setStorageItem(key,value){
	plus.storage.setItem(key,value);
}
//通过键(key)检索获取应用存储的值
function getStorageItem(key){
	return plus.storage.getItem(key);
}
//通过key值删除键值对存储的数据
function removeStorageItem(key){
	plus.storage.removeItem(key);
}
//清除应用所有的键值对存储数据,慎用
function clearStorageItem(){
	plus.storage.clear();
}

function formartDateYMD() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1; //js从0开始取 
	var date1 = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var second = date.getSeconds();
	return year+"-"+month + "-" + date1;
}

function formatJsonDate(date){
    var da = new Date(date); 
    var year = da.getFullYear();     
    var month = da.getMonth()+1; 
    var date = da.getDate();
    if(month < 10){
	   month = "0"+month;
	}
  	if(date < 10 ){
       date = "0" + date;  
    }  
    return year+"-"+month+"-"+date; 
}
function getDateStr(AddDayCount){
    var da = new Date(date); 
    da.setDate(da.getDate()+AddDayCount)
    var year = da.getFullYear();     
    var month = da.getMonth()+1; 
    var date = da.getDate();
    if(month < 10){
	   month = "0"+month;
	}
  	if(date < 10 ){
       date = "0" + date;  
    }  
    return year+"-"+month+"-"+date; 
}

/**
 * * 获取当前日期前后多少天日期
 * @param AddDayCount 
 */
function getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    if(m < 10){
	   m = "0"+m;
	}
  	if(d < 10 ){
       d = "0" + d;  
    }  
    return y+"-"+m+"-"+d;
}

function compareDate(dateStr1,dateStr2){
	var d1 = Date.parse(dateStr1);
	var d2 = Date.parse(dateStr2);
	console.log(dateStr1);
	console.log(d1);
	console.log(dateStr2);
	console.log(d2);
	return d1>d2;
}

/**
 * 压缩照片
 * @param {Object} path
 * @param {Object} callback
 */
function compressImg(path, callback) {
	console.log('resolveLocalFileSystemURL=' + path);
	var img = new Image();
    img.src = path;        // 传过来的图片路径在这里用。
    img.onload = function () {
		console.log('in img.onload');
        var that = this;
        //生成比例 
        var w = that.width,
            h = that.height,
            scale = w / h; 
        w = 240 || w;      //480  你想压缩到多大，改这里
        h = w / scale;
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        $(canvas).attr({width : w, height : h});
        if(mui.os.ios){//ios7 bug fix 图片大小超过2m时 通过canvas 压缩重绘时图片会被压扁  修复方法 通过detectVerticalSquash 获取真实比例
        	var vertSquashRatio = detectVerticalSquash(that);
        	ctx.drawImage(that, 0, 0, w, h/vertSquashRatio);
        }else{
        	ctx.drawImage(that, 0, 0, w, h);
        }
        var base64 = canvas.toDataURL('image/jpeg',0.75);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
        console.log(base64.length);      
        callback(base64.substr(22)); // 把base64数据丢过去，上传要用。
    }	
}
/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 * 
 */
/**
 * 
 * @param {Object} img
 */
function detectVerticalSquash(img) {
  var ih = img.height;
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = ih;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var data = ctx.getImageData(0, 0, 1, ih).data;
  // search image edge pixel position in case it is squashed vertically.
  var sy = 0;
  var ey = ih;
  var py = ih;
  while (py > sy) {
      var alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
          ey = py;
      } else {
          sy = py;
      }
      py = (ey + sy) >> 1;
  }
  var ratio = (py / ih);
  return (ratio===0)?1:ratio;
}

/*
 * 获取百度地图详细地址
 */
(function($){
	function getLocation(plus,callback){
		try{
			plus.geolocation.getCurrentPosition(function(position){
			console.log(JSON.stringify(position));
			if(position.addresses.length>0){
				callback(position);
			}else{
				callback(false);
			}
			
		},
		function(e){
				console.log("获取定位信息失败:"+e.message);
				callback(false);
		},
		{provider:'baidu'}
		);
			
		}catch(e){
			console.error("获取定位异常:"+e.message);
			callback(false);
		}
		
		
	};
	$.getBaiduLocation=getLocation;
	
})(mui);

	
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核</a>  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌</a>内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器</a>  
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad  
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
//判断：
var and=browser.versions.android;//android
var ios=browser.versions.ios;//ios


//单引号半角转换为全角函数 
function ToDBC(str) { 
	if(str){
		var s = ""; 
		if (str.length == 0) return ""; 
		s = str.replace(/&/g, "＆"); 
		s = s.replace(/</g, "＜"); 
		s = s.replace(/>/g, "＞"); 
		
		s = s.replace(/\'/g, "＇"); 
		s = s.replace(/\"/g, "＂"); 
		s = s.replace(/#/g, "＃");
		return s; 
	}else{
		return str;
	}

} 

/**
 * ajax 字符串格式转化为日期格式
 * @param dateTimeStr
 * @returns {String}
 */
function dateTostr(dateTimeStr){
	var date=new Date(dateTimeStr);
    var setDate=date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
    return setDate;
}

//注销
function logout(){
	sessionStorage.removeItem(tsg_key);
	var wvs=plus.webview.all();
	var wv_index = plus.webview.getWebviewById('index-window');
	var wv_scan = plus.webview.getWebviewById('seatScanResult.html');
	if(wv_index != null){
		wv_index.close();
	}
	if(wv_scan != null){
		wv_scan.close();
	}
	window.location.href = "login.html";
};