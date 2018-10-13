(function(doc){
	mui.init({
		
	});
	
	var submitForm = function(){
	    var dept = doc.querySelector("#dept").value;
	    var newPassword = doc.querySelector("#newPassword").value;
	    var confirmPassword = doc.querySelector("#confirmPassword").value;

	    if(processNULL(dept)==""){
			plus.nativeUI.toast("请输入部门/班级");
			return;
		}
	    if(processNULL(newPassword)==""){
			plus.nativeUI.toast("请输入密码");
			return;
		}
	    if(processNULL(confirmPassword)==""){
			plus.nativeUI.toast("请输入确认密码");
			return;
		}
	    
	    var params = getReqParam();
		var onSuccess = function(data){
			if(data.result_code == 0){
				plus.nativeUI.toast(data.result_desc);
				//完善资料后重新登录
				toPage("login.html");
			}
		    plus.nativeUI.toast(data.result_desc);
		    
		};
		var onError = function(data){
			plus.nativeUI.toast(data);
		}
		
		mui.ajaxQuery(params, onSuccess,onError);
	};
	
	// 获取请求参数
	var getReqParam = function(){
		var json = {
			"intf_code" : "UPD_USER",
			"params" : {
				"userPhysicalCard":getStorageItem(tsg_key),
				"userName":getStorageItem(tsg_userName_key),
				"dept":doc.querySelector("#dept").value,
				"newPassword":doc.querySelector("#newPassword").value,
				"confirmPassword":doc.querySelector("#confirmPassword").value,
				"mobile":doc.querySelector("#mobile").value,
				"wechat":doc.querySelector("#wechat").value
			}
		}
		return JSON.stringify(json);
	};
	
	//HTML5+ js组件已完全载入，所有要用到HTML5+ API的都必须写在这里。
	mui.plusReady(function(){
		var _key = getStorageItem(tsg_key);
		var _userName = getStorageItem(tsg_userName_key);
		//当前未获取到登录信息直接跳转到登录页面
		if(_key == null){
			window.location.href = "login.html";
			return ;
		}	
		doc.querySelector("#userPhysicalCard").innerHTML = _key;
		doc.querySelector("#userName").innerHTML = _userName;
		doc.querySelector('#subButton').addEventListener('tap', submitForm);
	});
	
})(document);
