//资源服务器地址
//var resource_url = "http://211.70.171.14:8001/download/";
var server_url;
var resource_url;
var imei;
var sys_version;
mui.plusReady(function(){
	//接口服务地址
	server_url = getStorageItem("tsg_server_url");
	console.log("config...1"+server_url);
	if(server_url == null){
		console.log("config....2"+server_url);
//		server_url = "http://120.24.172.21:8081/tsgintf/main/service";
		server_url = "http://211.70.171.14:9999/tsgintf/main/service";
		//测试代码
//		server_url = "http://192.168.1.105:9999/tsgintf/main/service";
//		server_url = "http://192.168.1.101:9999/tsgintf/main/service";
//		server_url = "http://192.168.31.242:9999/tsgintf/main/service";
//		server_url = "http://192.3.13.234:9999/tsgintf/main/service";
//		server_url = "http://tsgintf.tunnel.whsz100.com:8080/tsgintf/main/service";
	}
	resource_url = getStorageItem("tsg_resource_url");
	console.log("config...3"+resource_url);
	if(resource_url == null){
		console.log("config....4"+resource_url);
//		 resource_url = "http://192.168.1.105:8002/download";
		 resource_url = "http://211.70.171.14:8001/download";
	}
	
	//获取当前imei
	imei = plus.device.imei;
	setStorageItem("tsg_imei",imei);
	
	//检查网络变化
	document.addEventListener("netchange",wainshow(),false);
});

function wainshow(){
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
		mui.toast("网络异常，请检查网络设置！");
	}
}


//登录数据保存key
var tsg_key = "tsg.loginSession";

//登录用户姓名
var tsg_userName_key = "tsg.userName";

//公告id
var tsg_notice_key = "tsg.noticeId";

//图书馆id
var tsg_library_key = "tsg.libraryId";

//图书馆name
var tsg_libraryname_key ="tsg.libraryName";

//预约时间
var tsg_dateStr_key = "tsg.dateStr";

//开始时间
var tsg_startHour_key = "tsg.startHour";

//结束时间
var tsg_endHour_key = "tsg.endHour";

//最小预约时长
var tsg_orderHoursMin_key = "tsg.orderHoursMin";

//最大预约时长
var tsg_orderHoursMax_key = "tsg.orderHoursMax";


//首页公告列表默认显示条数
var tsg_notice_limit = "5";

//扫描入座/离座消息
var tsg_scan_msg = "tsg.scan.msg";
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


/**
 * 获取上下文路径
 * @returns
 */
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
function loadData(params,successfun,errorfun){
	var url = server_url;
	loadDataUrl(url,params,successfun,errorfun);
}
function loadDataUrl(url,params,successfun,errorfun){
	url = url+"?v=" + new Date().getTime();
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify(params),
		async: true,
		cache: false,
		contentType : "application/json;charset=utf-8",
		dataType: "json",
		success: function(data){
			if(data.result_code == "2"){//未登陆或登陆超时
				window.location.href=getRootPath()+"/view/sg/login.html";
			}else{
				successfun(data);
			}
		},
		error:  errorfun = (errorfun==null || errorfun=="" || typeof(errorfun)=="undefined")?  function(XMLHttpRequest,textStatus,errorThrown){
		//		alert("加载失败,请重新尝试!");
			} : errorfun
	});
}

/**
 * 获取url链接参数
 * 如getUrlArgs().id
 */
function getUrlArgs(){
	var args = {}; 
	var query = location.search.substring(1); 
	var pairs = query.split('&'); 
	for(var i = 0; i < pairs.length; i++){ 
		var pos = pairs[i].indexOf('='); 
		if(pos == -1) continue; 
		var name = pairs[i].substring(0,pos); 
		var value = pairs[i].substring(pos + 1); 
		value = decodeURIComponent(value); 
		args[name] = value; 
	} 
	return args; 
} 

//页面跳转
function toPage(url){
	if(url.indexOf("\?")>0){
		window.location.href = url;
	}else{
		window.location.href = url;
	}
}

/**
 * 通用请求
 * @param {Object} params 如:Encrypt(intf_code,params,page,fileData),
 		var intf_code="O2O_LOGIN";
  		var params = {"USER_ID" : "13900000000","PASSWORD" : "111111"}; 
  		var page= {"PAGE":0,"LIMIT":10};（PAGE从0开始）
 	    var fileData  如base64编码
 * @param {Object} onSuccess 返回参数未解密，需在回调方法中解密 ，如：var obj = JSON.parse(Decrypt(data["RES_DATA"]));
 * @param {Object} onError
 */
mui.ajaxQuery = function(params,onSuccess,onError){
    mui.ajaxQueryRetry("",params,onSuccess,onError,2);
};

mui.ajaxQueryUrl = function(url,params,onSuccess,onError){
    mui.ajaxQueryRetry(url,params,onSuccess,onError,2);
};

/**
 * 通用请求，失败情况下自动重新请求
 * @param {Object} params	  如:Encrypt(intf_code,params,page,fileData),
 		var intf_code="O2O_LOGIN";
  		var params = {"USER_ID" : "13900000000","PASSWORD" : "111111"}; 
  		var page= {"PAGE":0,"LIMIT":10};（PAGE从0开始）
 	    var fileData  如base64编码
 * @param {Object} onSuccess 返回参数未解密，需在回调方法中解密 ，如：var obj = JSON.parse(Decrypt(data["RES_DATA"]));
 * @param {Object} onError
 * @param {Object} retry 最小值1    失败情况下自动重新请求，默认3次
 */
mui.ajaxQueryRetry = function(url,params,onSuccess,onError,retry){
	var url = arguments[0]?arguments[0]:server_url;
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(errorMsg){mui.toast(errorMsg)};
    var retry = arguments[4]?arguments[4]:3;
    console.log(url);
    console.log(params);
    mui.ajax(url, {
        data:params,
        dataType:'json',
        type:'post',
        timeout:10000,
        headers:{'Content-Type':'application/json'},
        success:function(result){
        	onSuccess(result);
        },
        error:function(xhr,type,errorThrown){
            retry--;
            if(retry > 0) return mui.ajaxQueryRetry(url,params,onSuccess, onError, retry);
            onError("网络繁忙，请重新尝试!");
        }
    });
};