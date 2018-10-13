// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false,
		
	},
	gestureConfig : {
		longtap:true
	}
});

mui.plusReady(function(){
	// 获取列表
	initNotice();
	
	// 查看详情
//	qiao.on('#notice tr', 'tap', function(){
//		qiao.h.fire('noticeDetail', 'id', {id:$(this).data('id')});
//	});
});


var initNotice = function(){
	var params = getReqParam(tsg_notice_limit);
	console.log(params);
	var wt=plus.nativeUI.showWaiting("正在加载..."); 
	var onSuccess = function(data1){
			wt.close();
			console.log(data1.result_code);
		    if(data1.result_code== 0){
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
				
			}else{
				plus.nativeUI.toast(data1.result_desc);
			}
		};
		var onError = function(data1){
			wt.close();
			plus.nativeUI.toast(data1);
		}
		
		mui.ajaxQuery(params, onSuccess,onError);
};

// 获取请求参数
var getReqParam = function(count){
	var json = {
		"intf_code" : "QRY_NOTICE",
		"params" : {
			"limit":count
		 }
	}
	return JSON.stringify(json);
};
