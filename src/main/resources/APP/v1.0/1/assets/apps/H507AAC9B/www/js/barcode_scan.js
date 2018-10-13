mui.init();
var ws=null,wo=null;
var scan=null,domready=false;
var _key = null;
var tversion = null;
var md5username = null;
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	_key = getStorageItem(tsg_key);
	msg(_key);
	 function msg(data){
	 var params = "stuID="+data;
	 
$.ajax({  
type: "post",  
url: "http://119.29.207.55/key.php",  
dataType: "json",  
data: params,  
success: function(msg){  
tversion = msg.tversion;
md5username = msg.md5username;
}  
});  
	}
	
	plus.nativeUI.toast("请不要在就座状态进行下一时段的入座扫描，否则会造成当前座位离座");

	// 获取窗口对象
	ws=plus.webview.currentWebview();
	wo=ws.opener();

	// 开始扫描
	ws.addEventListener('show',function(){
		scan=new plus.barcode.Barcode('bcid');
	    scan.onmarked=onmarked;
	    scan.start({conserve:true,filename:"_doc/barcode/"});
	});
	//页面关闭刷新首页
	refreshMain();
	// 显示页面并关闭等待框
    ws.show("pop-in");
    wo.evalJS("closeWaiting()");
}
if(window.plus){	
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded",function(){
	domready=true;
	plusReady();
},false);
// 二维码扫描成功
function onmarked(type,result,file){
    switch(type){
    	case plus.barcode.QR:
    	type = "QR";
    	break;
    	case plus.barcode.EAN13:
    	type = "EAN13";
    	break;
    	case plus.barcode.EAN8:
    	type = "EAN8";
    	break;
    	default:
    	type = "其它"+type;
    	break;
    }
    result = result.replace(/\n/g, '');
    var etag = result; 
	scanSeat(etag,_key);
}

/**
 * 关闭页面
 */
function back(){
	plus.webview.currentWebview().close();
}

	//入座/离座
	var scanSeat = function(etag,_key){
		var params = getReqParam(etag,_key);
		var onSuccess = function(data){
				setStorageItem(tsg_scan_msg,data.result_desc);
				clicked('seatScanResult.html',false,false);
				//隐藏页面
				setTimeout(function() {
					plus.webview.currentWebview().close();
				}, 1000);
		};
		var onError = function(data){
			plus.nativeUI.toast("连接服务器失败，请检查一下您的网络情况");
		}
		
		mui.ajaxQuery(params, onSuccess,onError);
	};

// 获取请求参数
	var getReqParam = function(etag,_key){
		var json = {
			"intf_code" : "UPD_SCAN_SEAT",
			"params":{
				"etag":etag,
				"userPhysicalCard":_key,
				"tversion":tversion,
				"md5username":md5username
			}
		};
		return JSON.stringify(json);
	};