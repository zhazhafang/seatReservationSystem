var _key = "";
var scan = null;
mui.plusReady(function(){	
	var _key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}

//	// 创建支持
	var filter = [plus.barcode.QR];
	scan = new plus.barcode.Barcode("barcode", filter );
	
});


/**
 * 入座/离座
 */
function seatScan(){
//	wx.scanQRCode({
//	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//	    success: function (res) {
//	    	var etag = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//	    	window.location.href = getRootPath();
//	    	var url = "seatScanResult.html?etag="+etag+"&userPhysicalCard="+_key;
//	    	toPage(url);
//	    }
//	});
startRecognize();

}

function startRecognize() {
	scan = new plus.barcode.Barcode('barcode');
	scan.onmarked = onmarked; 
}

function startScan() {
	scan.start();
}

function onmarked( type, result ) {
	var text = '未知: ';
	switch(type){
		case plus.barcode.QR:
		text = 'QR: ';
		break;
	}
	alert( text+result );
}
