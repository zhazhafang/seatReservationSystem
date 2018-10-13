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
	document.getElementById("zx").addEventListener('tap', function(){
		var btnArray = ['确定', '取消'];
		mui.confirm('确认注销吗？', '提示信息', btnArray, function(e) {
            if (e.index == 0) {
                logout();
            }
        })
	});
		
	//获取首页轮播图开始#############################################
	$.ajax({
		type : "post",
		url : server_url+"?v=" + (new Date()).valueOf(),
		cache: false,
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(GetJsonAdvertData()),
		dataType : "json",
		success : function(data) {
			if(data.result_code == 0){
				var _strAdvert = "";
			    for(i=0;i<data.result_data.rows.length;i++){
			    	_strAdvert = _strAdvert+"<li><a href="+data.result_data.rows[i].link+"><img style='width:100%;height:180px;'  src="+resource_url+data.result_data.rows[i].advertUrl+" /><a></li>"
			    }
			    $("#advert").html(_strAdvert);
			    index_Swipe();
			}else {
				alert("获取轮播图信息失败");
			}
		},
		error : function(data) {
//			plus.nativeUI.toast('加载数据异常，请重试');
			plus.nativeUI.toast('网络异常，请重试');
		}
	});
	//获取首页轮播图结束#############################################
	queryNoticeList(tsg_notice_limit);//默认查询条数
});

/**
 * 查询公告列表
 */
function queryNoticeList(count){
	//获取公告信息开始###############################################
	$.ajax({
		type : "post",
		url : server_url+"?v=" + (new Date()).valueOf(),
		cache: false,
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(GetJsonNoticeData(count)),
		dataType : "json",
		success : function(data1) {
			if(data1.result_code == 0){
				var _str = "";
			    for(i=0;i<data1.result_data.rows.length;i++){
			    	var _msgTitle = data1.result_data.rows[i].msgTitle
			    	if(_msgTitle.length>10){
			    		_msgTitle=_msgTitle.substring(0,5)+"..."
			    	}
			    	_str = _str+'<tr><td onclick="queryNoticeDetailData('+data1.result_data.rows[i].id+')">&nbsp;&nbsp;'+_msgTitle+"</td>"
			    	           +'<td align="right" >'+dateTostr(data1.result_data.rows[i].operationTime)+"&nbsp;&nbsp;</td></tr>"
			    }
			    if(parseInt(data1.result_data.limit) < parseInt(data1.result_data.total)){
			    	_str = _str + '<td colspan="2" align="center"><a href="javascript:void(0); onclick=readMore('+data1.result_data.limit+');">查看更多</a><img src="images/down.png" height="24" /></td>'
			    }
			    $("#notice").html(_str);
			}else {
				alert("获取公告信息失败");
			}
		},
		error : function(data1) {
//			plus.nativeUI.toast('加载数据异常，请重试');
			plus.nativeUI.toast('网络异常，请重试');
		}
	});
	//获取公告信息结束###############################################	
}

function GetJsonAdvertData() {
	var json = {
		"intf_code" : "QRY_ADVERT",
		"params" : {
			
		 }
	}
	return json;
}

function GetJsonNoticeData(count) {
	var json = {
		"intf_code" : "QRY_NOTICE",
		"params" : {
			"limit":count
		 }
	}
	return json;
}

/**
 * 根据id查询公告详情
 * @param id
 */
function queryNoticeDetailData(id){
	sessionStorage.setItem(tsg_notice_key,id);					
	window.location.href = "noticeDetail.html";
	return ;
}

/**
 * 查看更多
 * @param count
 */
function readMore(count){
	var _count = parseInt(count) + parseInt(tsg_notice_limit);
	queryNoticeList(_count);
}