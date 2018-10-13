
	var arr1 = new Array();
	var arr2 = new Array();
	var arr3 = new Array();
	var _key = null;
	var dateStr = null;
	var roomId = null;
	var startHour = null;
	var endHour = null;
	var checkSubmitFlg = false; 
	var x = 100;
mui.plusReady(function(){
		_key = getStorageItem(tsg_key);
		//当前未获取到登录信息直接跳转到登录页面
		if(_key == null){
			window.location.href = "login.html";
			return ;
		}	
		
		dateStr = getUrlArgs().dateStr;
		roomId = getUrlArgs().roomId;
		startHour = getUrlArgs().startHour;
		endHour = getUrlArgs().endHour;
		qryPreSeat(roomId,dateStr,startHour,endHour);
	});
	
	function zoomIn(){
		x = x + 10;
		document.getElementById("planView").style.zoom=x+"%";
	}
	
	function zoomOut(){
		if(x > 20){
			x = x - 10;
			document.getElementById("planView").style.zoom=x+"%";
		}
	}
	
	function qryPreSeat(roomId,dateStr,startHour,endHour){
		var _json = {
				"intf_code" : "QRY_PRE_SEAT",
				"params" : {
					"roomId" : roomId,
					"dateStr" : dateStr,
					"startHour" : startHour,
					"endHour" : endHour
				}
		};
		$.ajax({
			type : "post",
			url : server_url+"?v=" + (new Date()).valueOf(),
			cache: false,
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(_json),
			dataType : "html",
			success : function(data) {
				$('#planView').html(data);
				// 默认按照宽度比例进行缩放
				var width1 = $("#planView").width();
				var width2 = $("#roomplanDiv").width();
				x = width1/width2 * 100;
				document.getElementById("planView").style.zoom=x+"%";
				// 已预占的
				for(var i=0;i<preSeatList.length;i++){
					arr1.push(preSeatList[i].seatNo);
				}
				
				for(var i=0;i<seatList.length;i++){ 
//					if(seatList[i].state == 2){//使用中
//						arr2.push(seatList[i].seatNo);
//					}
					if(seatList[i].state == 3){//禁用
						arr3.push(seatList[i].seatNo);
					}
				} 
				setSeatState(_key);
				var _id = document.getElementById('deskImg1');
　　　　			window.scrollTo(_id.offsetLeft,_id.offsetTop);
			},
			error : function(data) {
//				plus.nativeUI.toast("系统异常，请重试!");
				plus.nativeUI.toast('网络异常，请重试');
			}
		});
	}

	function setSeatState(userPhysicalCard){
		$('#roomplanDiv font').each(function(){
			if($.inArray($(this).html(), arr1)!=-1){
				if($(this).parent().attr('class')=='table_left3'){
					$(this).parent().attr('class','table_left1');
				}
				if($(this).parent().attr('class')=='table_right3'){
					$(this).parent().attr('class','table_right1');
				}
			}
			
			if($.inArray($(this).html(), arr2)!=-1){
				if($(this).parent().attr('class')=='table_left3'){
					$(this).parent().attr('class','table_left1');
				}
				if($(this).parent().attr('class')=='table_right3'){
					$(this).parent().attr('class','table_right1');
				}
			}
			if($.inArray($(this).html(), arr3)!=-1){
				if($(this).parent().attr('class')=='table_left3'){
					$(this).parent().attr('class','table_left2');
				}
				if($(this).parent().attr('class')=='table_right3'){
					$(this).parent().attr('class','table_right2');
				}
			}
			// 空闲座位添加点击事件
			if($.inArray($(this).html(), arr1)==-1 && $.inArray($(this).html(), arr2)==-1 && $.inArray($(this).html(), arr3)==-1){
				$(this).parent().on('hold',function(e){
					var btnArray = ['确定','取消'];
					var seatNo = $(this).find('font').html();
					var message = '您已经选择了'+seatNo+'号座位';
					mui.confirm(message,'提示信息',btnArray,function(e){
						if(e.index == 0){ //确认
							if($(this).attr('class')=='table_left3'){
								$(this).attr('class','table_left_hover');
							}
							if($(this).attr('class')=='table_right3'){
								$(this).attr('class','table_right_hover');
							}
							doPreSeat(seatNo,roomId,dateStr,userPhysicalCard,startHour,endHour);
						}
					});
					
					e.preventDefault();
				});
				
				$(this).parent().on('tap',function(e){
					plus.nativeUI.toast("请长按选择预占座位");
				});

			}	
		});
		    //touch缩放
//			var target = document.getElementById("roomplanDiv");
//			target.style.webkitTransition = 'all ease 0.05s';
//			touch.on(target, 'touchstart', function(ev) {
//				ev.preventDefault();
//			});
//			var initialScale = 1;
//			var currentScale;
//			touch.on(target, 'pinchend', function(ev) {
//				currentScale = ev.scale - 1;
//				currentScale = initialScale + currentScale;
//				currentScale = currentScale > 3 ? 3 : currentScale; //自己调节可以放大的最大倍数
//				currentScale = currentScale < 0.2 ? 0.2 : currentScale; //自己调节可以缩小的最小倍数
//				this.style.webkitTransform = 'scale(' + currentScale + ')';
//			});
//			touch.on(target, 'pinchend', function(ev) {
//				initialScale = currentScale;
//			});
			//touch拖动
//			var dx, dy;
//			touch.on(target, 'drag', function(ev) {
//				dx = dx || 0;
//				dy = dy || 0;
//				var offx = dx + ev.x + "px";
//			var offy = dy + ev.y + "px";
//				this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
//			});
//			touch.on(target, 'dragend', function(ev) {
//				dx += ev.x;
//				dy += ev.y;
//			});
	}
	
	function doPreSeat(seatNo,roomId,dateStr,userPhysicalCard,startHour,endHour){
		if(checkSubmitFlg == true){
			plus.nativeUI.toast("请勿重复提交操作");
			return ;
		}
		if(seatNo == "" || roomId == "" || dateStr == ""){
			plus.nativeUI.toast("请选择座位");
			return ;
		}
		checkSubmitFlg = true;
		
		var _json = {
				"intf_code" : "UPD_PRE_SEAT",
				"params" : {
					"seatNo" : seatNo,
					"roomId" : roomId,
					"dateStr" : dateStr,
					"startHour" : startHour,
					"endHour" : endHour,
					"userPhysicalCard" : userPhysicalCard
				}
		};
		
		plus.nativeUI.toast("操作中，请稍等",100);
		$.ajax({
			type : "post",
			url : server_url+"?v=" + (new Date()).valueOf(),
			cache: false,
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(_json),
			dataType : "json",
			success : function(data) {
				if(data.result_code == '0'){
					toPage('record.html');
				}else{
					plus.nativeUI.toast(data.result_desc);
					plus.webview.currentWebview().reload();
				}
				checkSubmitFlg = false;
			},
			error : function(data) {
//				plus.nativeUI.toast("系统异常，请重试!");
				plus.nativeUI.toast('网络异常，请重试');
			}
		});
	}