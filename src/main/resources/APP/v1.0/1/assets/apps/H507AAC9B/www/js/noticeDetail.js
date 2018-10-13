/**
 * 初始化页面判断当前是否有用户登录
 */
mui.plusReady(function(){	
	var _key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}	
	
	var _noticeId = sessionStorage.getItem(tsg_notice_key);	
	if(_noticeId == null) return ;
	
	var _json = {
			"intf_code" : "QRY_NOTICE_DETAIL",
			"params" : {
				"id":_noticeId,
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
				 var _msgTitle = data.result_data.msgTitle;
				 $("#msgTitle").html(_msgTitle);
				 var _operationTime = data.result_data.operationTime;
				 var _count = data.result_data.count;
				 $("#msgDate").html("发布时间："+dateTostr(_operationTime)+"&nbsp;&nbsp;&nbsp;&nbsp;阅读次数："+_count);
				 var _msgContent = data.result_data.msgContent;
				 $("#msgContent").html(_msgContent);
			}else {
				layer.open({
					content : "获取公告详情失败",
					time : 1
				});
			}
		},
		error : function(data) {
			layer.open({
				content : "sorry,未找到公告内容,请查看其它内容",
				time : 1
			});
		}
	});
});

