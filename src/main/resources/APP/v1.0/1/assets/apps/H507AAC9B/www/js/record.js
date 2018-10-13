/**
 * 初始化页面判断当前是否有用户登录
 */
var checkSubmitFlg = false; 
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
 
	var _json = {
			"intf_code" : "QRY_RECORD",
			"params" : {
				"userPhysicalCard":_key,
				"flag":"0"
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
				var _recordList = "";
			    for(i=0;i<data.result_data.rows.length;i++){
			    	var _recordStat = data.result_data.rows[i].status;
			    	var opeartionName="完成";
			    	var _status = _recordStat;
			    	if(_recordStat=='1'){
			    		_recordStat = '预约成功';
			    		opeartionName="入座";
			    	}else if(_recordStat=='2'){
			    		_recordStat = '已就坐';
			    		opeartionName="离席";
			    	}else if(_recordStat=='3'){
			    		_recordStat = '预约取消';
			    	}else if(_recordStat=='4'){
			    		_recordStat = '已失效';
			    	}else if(_recordStat=='5'){
			    		_recordStat = '已暂离';
			    		opeartionName="入座";
			    	}else if(_recordStat=='6'){
			    		_recordStat = '已结束';
			    	}
			    	if(_status == '1' || _status == '2' || _status == '5'){
				    	_recordList = _recordList+
			    		'<table class="yy_table">'+
						  '<tr>'+
						    '<td class="span pl15">预约时间</td>'+
						    '<td align="left" >'+dateTostr(data.result_data.rows[i].appointmentDate) +'&nbsp;&nbsp;'+ data.result_data.rows[i].statTime+'至'+data.result_data.rows[i].endTime+'</td>'+
						    '</tr>'+
						  '<tr>'+
						    '<td class="span pl15">预约位置</td>'+
						    '<td align="left" >【'+data.result_data.rows[i].libName+'】'+data.result_data.rows[i].roomName+'【'+data.result_data.rows[i].deskNo+'】'+data.result_data.rows[i].seatNo+'</td>'+
						    '</tr>'+
						  '<tr>'+
						    '<td class="span pl15">预约状态</td>'+
						    '<td align="left" >'+_recordStat+'</td>'+
						  '</tr>'+
						  '<tr>'+
						    '<td colspan="2" align="center" class="span">'+
						    '<div class="btnbox"><a href="javascript:void(0);" onclick="seatDown('+data.result_data.rows[i].id+','+data.result_data.rows[i].status+');" class="redbtn1">'+opeartionName+'</a></div>'+
						    '<div class="btnbox"><a href="javascript:void(0);" onclick="cancel('+data.result_data.rows[i].id+','+data.result_data.rows[i].status+');"  class="redbtn2">取消</a></div></td>'+
						   '</tr>'+
						  '</table>';
			    	}else{
				    	_recordList = _recordList+
			    		'<table class="yy_table">'+
						  '<tr>'+
						    '<td class="span pl15">预约时间</td>'+
						    '<td align="left" >'+dateTostr(data.result_data.rows[i].appointmentDate) +'&nbsp;&nbsp;'+ data.result_data.rows[i].statTime+'至'+data.result_data.rows[i].endTime+'</td>'+
						    '</tr>'+
						  '<tr>'+
						    '<td class="span pl15">预约位置</td>'+
						    '<td align="left" >【'+data.result_data.rows[i].libName+'】'+data.result_data.rows[i].roomName+'【'+data.result_data.rows[i].deskNo+'】'+data.result_data.rows[i].seatNo+'</td>'+
						    '</tr>'+
						  '<tr>'+
						    '<td class="span pl15">预约状态</td>'+
						    '<td align="left" >'+_recordStat+'</td>'+
						  '</tr>'+
						  '<tr>'+
						    '<td colspan="2" align="center" class="span">&nbsp;</td>'+
						   '</tr>'+
						  '</table>';
			    		
			    	}
			    }
			    $("#recordList").html(_recordList);
			}else {
				plus.nativeUI.toast("获取预约信息失败");
			}
		},
		error : function(data) {
			//plus.nativeUI.toast("sorry,未找到预约信息");
		}
	});
});


/**
 * 点击入座调用扫一扫
 * @param id
 */
function seatDown(id,status){
	if(status=='3' || status =='4' || status=='6'){
		plus.nativeUI.toast("已完成");
		return;
	}
	clicked('barcode_scan.html',true,true);
}

/**
 * 取消预约
 * @param id
 */
function cancel(id,status){
	if(checkSubmitFlg == true){
		plus.nativeUI.toast("请勿重复提交操作");
		return;
	}
	if(status !='1'){
		plus.nativeUI.toast("当前状态不允许取消");
		return;
	}
	var _json = {
			"intf_code" : "UPD_RECORD",
			"params" : {
				"id":id
			}
	};
	checkSubmitFlg = true;
	plus.nativeUI.toast("操作中，请稍等",100);
	$.ajax({
		type : "post",
		url : server_url+"?v=" + (new Date()).valueOf(),
		cache: false,
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(_json),
		dataType : "json",
		success : function(data) {
			checkSubmitFlg = false;
			if(data.result_code == 0){ 
				plus.nativeUI.toast("取消成功");
				window.location.href = "record.html";
				return ;
			}else {
				plus.nativeUI.toast("取消成功");
			}
		}
   });
}





