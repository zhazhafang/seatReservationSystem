(function(doc){

	//mui页面初始化
	mui.init({
	  gestureConfig:{
	   tap: true, //默认为true
	   doubletap: true, //默认为false
	   longtap: true, //默认为false
	   swipe: true, //默认为true
	   drag: true, //默认为true
	   hold:false,//默认为false，不监听
	   release:false//默认为false，不监听
	  }
	});
	
	//登录
	var loginFun = function(){  
	
var tversion = null;
		var md5username =null;
		var flag = 0;
		var USER_ID = doc.querySelector("#username").value;
		var PASSWORD = doc.querySelector("#password").value;
		
		if(processNULL(USER_ID)==''){
			plus.nativeUI.toast("请输入账号");
			return;
		}
		if(processNULL(PASSWORD)==''){
			plus.nativeUI.toast("请输入密码");
			return;
		}
		var OS_VERSION = plus.os.version;//4.4
		var DEVICE = plus.device.model;//"Nexus 7"
		var UUID = plus.device.uuid;
		var params = getReqParam(USER_ID);
		
		var wt=plus.nativeUI.showWaiting("正在登录..."); 
		var onSuccess = function(data){
			wt.close();
			console.log(data.result_code);
		    if(data.result_code=="0"){
		    	
				setStorageItem("username",USER_ID);
				// 记住密码
				var chkRem =  doc.querySelector("#chkRem");
				if(chkRem.checked){
					setStorageItem("password",PASSWORD);
				}else{
					removeStorageItem("password");
				}
		    	removeStorageItem(tsg_key);
				//登陆成功保存用户信息
				setStorageItem(tsg_key,data.result_data.userPhysicalCard);
				setStorageItem(tsg_userName_key,data.result_data.userName);
				setStorageItem(tsg_orderHoursMin_key,data.result_data.orderHoursMin);	
				setStorageItem(tsg_orderHoursMax_key,data.result_data.orderHoursMax);
		    	if(data.result_data.isValid == 1){//已完善资料
			    	//跳转至主页面
					mui.openWindow({
	               		url:'index.html',
	               		id:'index-window',
	            		createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			            show:{
					      autoShow:true//页面loaded事件发生后自动显示，默认为true
					    //aniShow:animationType,//页面显示动画，默认为”slide-in-right“；
					    //duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					    },
			            waiting:{
			                autoShow:false, //自动显示等待框，默认为true
			                title:'正在加载...'//等待对话框上显示的提示内容
			            } 
			        });
			       plus.nativeUI.toast("恭喜你，登陆成功！");
		    	}else{//跳转完善资料页面
		    		toPage("index.html");
		    	}
			}else{
			 
			 }
		};
		var onError = function(data){
			wt.close();
			plus.nativeUI.toast(data);
		}
		
mui.ajaxQuery(params, onSuccess,onError);
	};
	
	//忘记密码
	var resetPass = function(){
		plus.nativeUI.toast('请联系管理员重置密码!');
		return;
	};
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
if(tversion=='1'){
plus.nativeUI.toast("对不起，你的账号未获得授权！");
}else{
plus.nativeUI.toast("已查询信息，请再次点击登录进行认证。");
}

}  
});  
	}
	
	
	
	// 获取请求参数
	var getReqParam = function(USER_ID){
	msg(USER_ID);

		var json = {
		"intf_code" : "QRY_LOGIN",
			"params" : {
				"userPhysicalCard":doc.querySelector("#username").value,
				"password":doc.querySelector("#password").value,
				"imei":doc.querySelector("#username").value,
				"version":"5.0",
				"tversion":tversion,
				"md5username":md5username
			}
		}
		return JSON.stringify(json);
	};
	
	var setServerUrl = function(){
		var params = getUrlReqParam();
		var onSuccess = function(data){
			var audit_status = data.result_data.auditStatus;//审核状态
			// 测试代码
			//audit_status = '0';
			setStorageItem('audit_status',audit_status);
			var tsg_server_url = data.result_data.urlSource;//生产环境地址
			var tsg_resource_url = data.result_data.resourceUrlSource;
			console.log("audit_status:"+audit_status);
			if(audit_status=='1'){
				server_url = tsg_server_url;
				resource_url = tsg_resource_url;
				setStorageItem("tsg_server_url",tsg_server_url);
				setStorageItem("tsg_resource_url",tsg_resource_url);
			}
		};
		var onError = function(data){
//			plus.nativeUI.toast('服务端接口异常');
			plus.nativeUI.toast('网络异常，请重试');
		}
		if(getStorageItem('audit_status')=='1'){
			server_url = getStorageItem("tsg_server_url");
			resource_url = getStorageItem("tsg_resource_url");
		}else{
			mui.ajaxQuery(params, onSuccess,onError);
		}
		
};
	// 获取请求参数
	var getUrlReqParam = function(){
		var json = {
					"intf_code" : "QRY_URL_SOURCE",
					"params" : {}
			};
		return JSON.stringify(json);
	};
	
	// 从缓存中获取登录用户名和密码
	var getLocalUserName = function(){
		var username = getStorageItem("username");
		var password = getStorageItem("password");
		doc.querySelector("#username").value = username;
		if(password != null){
			doc.querySelector("#password").value = getStorageItem("password");
			doc.querySelector("#chkRem").checked = "checked";
		}
	};
	
	//检查版本
	var checkVersion = function(){
		// 获取本地应用资源版本号
		var platform;
		if ( plus.os.name == "iOS" ) {
		    platform = "1";
	    } else if (plus.os.name == "Android") {
	    	platform = "0";
	    }
	   	plus.runtime.getProperty(plus.runtime.appid,function(inf){
	   		sys_version = inf.version;
			queryVersion(inf.version,platform);
	    });
	};
	
	// 获取请求参数
	var getVersionReqParam = function(platform){
		var json = {
					"intf_code" : "UPD_VERSION",
					"params" : {"platform":platform}
			};
		return JSON.stringify(json);
	};
	
	

	//查询版本，版本号格式必须为1.1
	
	    var onError = function(data){
//	 
	    mui.ajaxQuery(params, onSuccess,onError);
	}
	var installApp = function(path) {
	    plus.nativeUI.showWaiting("安装新版本...");
	    plus.runtime.install(path,{},function(){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件成功！");
	        plus.nativeUI.alert("应用资源更新完成！",function(){
	            plus.runtime.restart();
	        });
	    },function(e){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件失败["+e.code+"]："+e.message);
	        plus.nativeUI.alert("安装新版本失败["+e.code+"]："+e.message);
	    });
	};
	
	//退出
	var exitFun = function(){
		if(mui.os.ios){
           mui.alert('请双击Home键退出程序');
        } else {
           plus.runtime.quit();
        }
	}
	
	//HTML5+ js组件已完全载入，所有要用到HTML5+ API的都必须写在这里。
	mui.plusReady(function(){
		checkVersion();//新版本检查
		setServerUrl();//设置服务器地址
		getLocalUserName();
		//锁屏方向：竖屏正方向
		plus.screen.lockOrientation("portrait-primary");
		doc.querySelector('#login').addEventListener('tap', loginFun);//登录
		doc.querySelector('#resetPass').addEventListener('tap',resetPass);//忘记密码
		mui.back = function(){
			mui.confirm('您要退出应用吗？','提示信息',['退出','取消'],function(e){
				if(e.index == 0){
					exitFun();
				}
			});
			
		};
		
	});[]

})(document);