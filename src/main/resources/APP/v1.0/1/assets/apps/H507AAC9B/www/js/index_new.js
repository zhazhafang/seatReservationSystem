(function(doc){
	//mui页面初始化
	mui.init({
	  	subpages : [qiao.h.centerPage('notice_list')]
	});
	
	var detail = null;
	mui.plusReady(function(){
		initAdvert();
		// 详情
		detail = mui.preload(qiao.h.normalPage('detail', {popGesture:'none'}));
	});
	
	
	var initAdvert = function(){
			var params = getReqParam();
			console.log(params);
			var wt=plus.nativeUI.showWaiting("正在加载..."); 
			var onSuccess = function(data){
					wt.close();
					console.log(data.result_code);
				    if(data.result_code== 0){
				    	var _strAdvert = "";
					    for(i=0;i<data.result_data.rows.length;i++){
					    	_strAdvert = _strAdvert+"<li><a href="+data.result_data.rows[i].link+"><img style='width:100%;height:180px;'  src="+resource_url+data.result_data.rows[i].advertUrl+" /><a></li>"
					    }
					    $("#advert").html(_strAdvert);
					   // index_Swipe();
						
					}else{
						plus.nativeUI.toast(data.result_desc);
					}
				};
				var onError = function(data){
					wt.close();
					plus.nativeUI.toast(data);
				}
				
				mui.ajaxQuery(params, onSuccess,onError);
	};

	// 获取请求参数
	var getReqParam = function(){
		var json = {
			"intf_code" : "QRY_ADVERT",
			"params" : {
				
			 }
		}
		return JSON.stringify(json);
	};
	
	
})(document);