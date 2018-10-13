var _key = "";
mui.plusReady(function(){	
	var _key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}
	ajaxLoadData();
});

/**
 * 加载微信sign
 */
var ajaxLoadData = function(){
	var params = {
			"intf_code" : "QRY_WX_SIGN",
			"params":{"url":location.href.split('#')[0]}
	};
	loadData(params,function(result) {
		if (result.result_code == 0) {
			var data = result.result_data;
			initWeixinConfig(data.appid,data.timestamp,data.nonceStr,data.signature);
		}
	}, null);
}
/**
 * 初始化调用weixin js接口调用
 * @param appId
 * @param timestamp
 * @param nonceStr
 * @param signature
 */
function initWeixinConfig(appId,timestamp,nonceStr,signature){
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: appId, // 必填，公众号的唯一标识
	    timestamp: timestamp, // 必填，生成签名的时间戳
	    nonceStr: nonceStr, // 必填，生成签名的随机串
	    signature: signature,// 必填，签名，见附录1
	    jsApiList: ['scanQRCode']// 必填，需要使用的JS接口列表，所有JS接口列表见微信开发文档
	});
}

/**
 * 入座/离座
 */
function seatScan(){
	wx.scanQRCode({
	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    success: function (res) {
	    alert(res);
	    	var etag = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	    	window.location.href = getRootPath();
	    	var url = "seatScanResult.html?etag="+etag+"&userPhysicalCard="+_key;
	    	toPage(url);
	    }
	});
}

