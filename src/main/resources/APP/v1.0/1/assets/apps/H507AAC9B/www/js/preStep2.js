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
	var dateStr = getUrlArgs().dateStr;
	var libraryId = getUrlArgs().libraryId;
	var startHour = getUrlArgs().startHour;
	var endHour = getUrlArgs().endHour;
	setStorageItem(tsg_dateStr_key,dateStr);
	setStorageItem(tsg_library_key,libraryId);
	setStorageItem(tsg_startHour_key,startHour);
	setStorageItem(tsg_endHour_key,endHour);
	queryRoomFree(dateStr,libraryId,startHour,endHour);
});


/**
 * 查询可预定的时间
 */
function queryRoomFree(dateStr,libraryId,startHour,endHour){
	var _json = {
			"intf_code" : "QRY_PRE_ROOM",
			"params" : {
				"dateStr":dateStr,
				"libraryId":libraryId,
				"startHour":startHour,
				"endHour":endHour
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
				var listData = data.result_data;
				if(listData!=null){
					var _str = "";
					listData.forEach(function(item,i) {
						if(item.freeCount == 0){
							_str = _str + '<table class="yy_table"><tr><td align="left" class="pl15">'
							+item.roomName
							+'空余：'
							+item.freeCount
							+'</td><td align="left" ><img src="images/right.png" height="24" /></td></tr></table>';
				
						}else{
							_str = _str + '<table class="yy_table"><tr><td align="left" class="pl15">'
							+item.roomName
							+'空余：'
							+item.freeCount
							+'</td><td align="left" ><a href="#" onclick="seatDetail(\''+item.roomId+'\')"> <img src="images/right.png" height="24" /></a></td></tr></table>';
				
						}
						
					});
					$("#roomList").html(_str);
				}
			}else {
				plus.nativeUI.toast("获取整馆座位概况失败");
			}
		},
		error : function(data) {
//			plus.nativeUI.toast("系统异常，请重试!");
			plus.nativeUI.toast('网络异常，请重试');
		}
	});
}

/**
 * 进入阅览室详情
 * @param roomId
 */
function seatDetail(roomId){	
	var dateStr = getStorageItem(tsg_dateStr_key);
	var startHour = getStorageItem(tsg_startHour_key);
	var endHour = getStorageItem(tsg_endHour_key);
	var url = "preStep3.html?dateStr=" + dateStr+"&roomId="+roomId+"&startHour="+startHour+"&endHour="+endHour;
	toPage(url);
}

