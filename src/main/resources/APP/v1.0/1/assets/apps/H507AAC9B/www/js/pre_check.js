/**
 * 初始化页面判断当前是否有用户登录
 */
var _key;
mui.plusReady(function(){	
	_key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}	
});

/**
 * 查询是否有预约记录
 */
function checkPreRecord(){
	var _json = {
			"intf_code" : "QRY_PRE_SEAT_CHECK",
			"params" : {
				"userPhysicalCard":_key
			}
	};
	
	$.ajax({
		type : "post",
		url : server_url+"?v=" + (new Date()).valueOf(),
		cache: false,
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(_json),
		dataType : "json",
		success : function(data) {
			if(data.result_code == 0){
				toPage("preStep1.html");
			}else {//有预约记录，不进入下一步页面
				plus.nativeUI.toast(data.result_desc);
			}
		},
		error : function(data) {
//			plus.nativeUI.toast("系统异常，请重试!");
			plus.nativeUI.toast('网络异常，请重试');
		}
	});
}