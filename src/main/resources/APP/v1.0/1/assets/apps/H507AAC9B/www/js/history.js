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
	
	var _json = {
			"intf_code" : "QRY_RECORD",
			"params" : {
				"userPhysicalCard":_key,
				"flag":"1"
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
				var _recordHistoryList = "";
			    for(i=0;i<data.result_data.rows.length;i++){
			    	var _recordStat = data.result_data.rows[i].status;
			    	if(_recordStat=='1'){
			    		_recordStat = '预约成功';
			    	}else if(_recordStat=='2'){
			    		_recordStat = '已就坐';
			    	}else if(_recordStat=='3'){
			    		_recordStat = '预约取消';
			    	}else if(_recordStat=='4'){
			    		_recordStat = '已失效';
			    	}else if(_recordStat=='5'){
			    		_recordStat = '已暂离';
			    	}else if(_recordStat=='6'){
			    		_recordStat = '已结束';
			    	}
			    	_recordHistoryList = _recordHistoryList+
			    	 '<table class="list_table">'+
			    	 '<tr>'+
			    	    '<td class="span pl15">预约时间</td>'+
			    	    '<td align="left" >'+dateTostr(data.result_data.rows[i].appointmentDate) +'&nbsp;&nbsp;'+ data.result_data.rows[i].statTime+'至'+data.result_data.rows[i].endTime+'</td>'+
			    	    '</tr>'+
			    	  '<tr>'+
			    	   ' <td class="span pl15">预约位置</td>'+
			    	    '<td align="left" >【'+data.result_data.rows[i].libName+'】'+data.result_data.rows[i].roomName+'【'+data.result_data.rows[i].deskNo+'】'+data.result_data.rows[i].seatNo+'</td>'+
			    	    '</tr>'+
			    	  '<tr>'+
			    	    '<td class="span pl15">预约状态</td>'+
			    	   ' <td align="left" >'+_recordStat+'</td>'+
			    	 ' </tr>'+
			    	  '</table>';
			    }
			    $("#recordHistoryList").html(_recordHistoryList);
			}else {
				plus.nativeUI.toast("获取预约历史信息失败");
			}
		},
		error : function(data) {
			plus.nativeUI.toast("sorry,未找到历史预约信息");
		}
	});
});

