mui.init();
var _key = "";
mui.plusReady(function(){	
	var _key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}
//	var etag = getUrlArgs().etag;
//	ajaxLoadData(etag,_key);
//	var ws = plus.webview.currentWebview();
	var msg = getStorageItem(tsg_scan_msg);
	$('#msgTitle').html(msg);
});

/**
 * 调用入座/离座接口
 */
var tversion = null;
var md5username = null;
var ajaxLoadData = function(etag,_key){
	var params = {
			"intf_code" : "UPD_SCAN_SEAT",
			"params":{
				"etag":etag,
				"userPhysicalCard":_key
			}
	};
	loadData(params,function(result) {
		$('#msgTitle').html(result.result_desc);

	}, null);
}
