(function(doc){
	mui.init({
		
	});
	
	var submitForm = function(){
		var password = doc.querySelector("#password").value;
	    var newPassword = doc.querySelector("#newPassword").value;
	    var confirmPassword = doc.querySelector("#confirmPassword").value;
	    if(processNULL(password)==""){
			plus.nativeUI.toast("请输入密码");
			return;
		}
	    if(processNULL(newPassword)==""){
			plus.nativeUI.toast("请输入新密码");
			return;
		}
	    if(processNULL(confirmPassword)==""){
			plus.nativeUI.toast("请输入确认新密码");
			return;
		}
	    
	    var params = getReqParam();
		var onSuccess = function(data){
			if(data.result_code == 0){
				plus.nativeUI.toast(data.result_desc);
				sessionStorage.removeItem(tsg_key);
				plus.webview.currentWebview().close();
			}else{
				plus.nativeUI.toast(data.result_desc);
			}
		    
		};
		var onError = function(data){
			plus.nativeUI.toast(data);
		}
		
		mui.ajaxQuery(params, onSuccess,onError);
	};
	
	// 获取请求参数
	var getReqParam = function(){
		var json = {
			"intf_code" : "UPD_PWD",
			"params" : {
				"userPhysicalCard":getStorageItem(tsg_key),
				"password":doc.querySelector("#password").value,
				"newPassword":doc.querySelector("#newPassword").value,
				"confirmPassword":doc.querySelector("#confirmPassword").value
			}
		}
		return JSON.stringify(json);
	};
	
	//HTML5+ js组件已完全载入，所有要用到HTML5+ API的都必须写在这里。
	mui.plusReady(function(){
		var _key = getStorageItem(tsg_key);
		//当前未获取到登录信息直接跳转到登录页面
		if(_key == null){
			window.location.href = "login.html";
			return ;
		}	
		
		doc.querySelector('#subButton').addEventListener('tap', submitForm);
	});
	
})(document);
