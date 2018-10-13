var startHH,startMM,endHH,endMM;
var _orderHoursMax,_orderHoursMin;
var errorTip = "当前没有时间可以选择";
mui.plusReady(function(){
	var _key = getStorageItem(tsg_key);
	//当前未获取到登录信息直接跳转到登录页面
	if(_key == null){
		window.location.href = "login.html";
		return ;
	}	
	
	_orderHoursMin = getStorageItem(tsg_orderHoursMin_key);
	_orderHoursMax = getStorageItem(tsg_orderHoursMax_key);
	
	document.getElementById("zx").addEventListener('tap', function(){
		var btnArray = ['确定', '取消'];
		mui.confirm('确认注销吗？', '提示信息', btnArray, function(e) {
            if (e.index == 0) {
                logout();
            }
        })
	});
		
		
	//默认展示上次选择的图书馆
	var _libraryId = getStorageItem(tsg_library_key);
	var _libraryName = getStorageItem(tsg_libraryname_key);
	if(_libraryId != null){
		$('#libraryId').val(_libraryId);
		$('#libraryName').val(_libraryName);
	}
	
	var openHourJsonData;
	
	var addParams = {
			expectTime: "",
			userPhysicalCard: _key,
			appointName: "",
			appointNameTxt: ""
		}
	
	var _NOW = new Date,
		_DELAY = 4;
	
	function getMyDay(dateStr){
		var dateStr1 = dateStr.replace(/-/g,"/");
		var date = new Date(dateStr1);
		var week;
		if(date.getDay()==0) week= 7
		if(date.getDay()==1) week= 1
		if(date.getDay()==2) week= 2
		if(date.getDay()==3) week= 3
		if(date.getDay()==4) week= 4
		if(date.getDay()==5) week= 5
		if(date.getDay()==6) week= 6
		return week;
	}

	function formatDate(mill) {
		var d = new Date(mill);
		var year = d.getFullYear(),
			month = d.getMonth()+1,
			day = d.getDate(),
			week = d.getDay();
		var hour = d.getHours(),
			minutes = d.getMinutes();
		return {
			year: year,
			month: month,
			day: day,
			week: week,
			hour: hour,
			minutes: minutes
		}
	}
	
	function dateAhead(days) {
		var mill = _NOW * 1;
		var ahead = [];
		for(var i=0;i<days;i++) {
			var aheadMill = mill + 24*60*60*1000*i;
			var aheadDate = formatDate(aheadMill);
			ahead.push(aheadDate)
		}
		return ahead;
	}
	
	function relDate(i,week) {
		var map = ["日","一","二","三","四","五","六"];
		var rel = "";
		if(i==0)
			rel = "(今天)"
		else if(i==1)
			rel = "(明天)"
		else
			rel = "(周"+map[parseInt(week)]+")";
		return rel;
	}
	
	function getAhead(acount) {
		var aheadCount = acount || 7;
		var d = {
			displayValue:[],
			value:[]
		};
		var daah = dateAhead(aheadCount);
		for(var i=0,len=daah.length;i<len;i++) {
			var item = daah[i];
			var dStr = item["month"]+"月"+item["day"]+"日 "+relDate(i,item["week"]),
				dVal = item["year"]+"-"+item["month"]+"-"+item["day"];
			d["displayValue"].push(dStr);
			d["value"].push(dVal)
		}
		return d;
	}
	
	function prefix(n) {
		return n.toString().length < 2 ? "0"+n : n;
	}
	
	function getCompleteTime() {
		var start = 8, end = 18;
		var t = [];
		for(var i=start; i<end; i++) {
			t.push(prefix(i)+":00");
			t.push(prefix(i)+":30");
		}
		return t;
	}
	
	function getFullMinutes(time) { 
		var hour = time.substring(0,2);
		var min = time.substring(3,5);
		var fullminites = Number(hour) * 60 + Number(min);
		return fullminites; 
	}
	
	function getDateStr(AddDayCount) { 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1; 
		var d = dd.getDate(); 
		return y+"-"+m+"-"+d; 
	}
	
	function getTodayTime() {
		var t = [];
		var end = 18;
		var today = dateAhead(1)[0],
			_nowHour = parseInt(today["hour"],10),
			_nowMinutes = parseInt(today["minutes"],10);
		var _laterHours = _nowHour+_DELAY;
		if(_laterHours<8) {
			t = getCompleteTime();
		} else {
			if(_nowMinutes<30) {
				for(;_laterHours<end;_laterHours++) {
					t.push(prefix(_laterHours)+":30");
					if(_laterHours+1<end)
						t.push(prefix(_laterHours+1)+":00");
				}
			}else {
				_laterHours += 1;
				for(;_laterHours<end;_laterHours++) {
					t.push(prefix(_laterHours)+":00");
					t.push(prefix(_laterHours)+":30");
				}
			}
			
		}
		return t;
	}
	
	// 选择结束时间
	var endOrderHour = (function(){
		
		function init() {
			
			var orderDate = $('#dateStrId').val();
			var week = getMyDay(orderDate);
			var type = $('#typeStrId').val();
			var startHourStr = $('#startHourStrId').val();
			var t = [];
			if(type == "0"){
				t = ["当前没有时间可选"];
			}else{
				var startFullMinites = getFullMinutes(startHourStr);
				var orderMinitesMin = 60 * Number(_orderHoursMin);
				var orderMinitesMax = 60 * Number(_orderHoursMax);
				var startHour,endHour;
				if(openHourJsonData!=null && openHourJsonData.length > 0){
					for(i=0;i<openHourJsonData.length;i++){
						var item = openHourJsonData[i];
						if(item.day == week && item.type == type){
							startHour = item.startHour;
							endHour = item.endHour;
							break;
						}
					}
				}
				startMM = startHour.substring(3,5);
				var today = dateAhead(1)[0];
				var _nowHour = parseInt(today["hour"],10);
				if(startMM == "30"){
	//				startHH = Number(startHour.substring(0,2)) + 1;
					startHH = Number(startHour.substring(0,2));
					if(startHH > _nowHour || getDateStr(0) != orderDate){
						//结束时间不能选择
						//t.push(startHour);
					}
					endHH = Number(endHour.substring(0,2));
					for(var i= (startHH+1); i<=endHH; i++) {
						if(i > _nowHour || getDateStr(0) != orderDate){
							if(((getFullMinutes(prefix(i)+":00") - startFullMinites) >= orderMinitesMin 
									&& (getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
									&& (getFullMinutes(prefix(i)+":00") - startFullMinites) % 60 == 0
									&& getFullMinutes(prefix(i)+":00") <= getFullMinutes(endHour))
								|| 
								((getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
								&& getFullMinutes(prefix(i)+":00") == getFullMinutes(endHour))){
								t.push(prefix(i)+":00");
							}
							if(((getFullMinutes(prefix(i)+":30") - startFullMinites) >= orderMinitesMin
									&& (getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
									&& (getFullMinutes(prefix(i)+":30") - startFullMinites) % 60 == 0
									&& getFullMinutes(prefix(i)+":30") <= getFullMinutes(endHour))
								|| 
								((getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
								&& getFullMinutes(prefix(i)+":30") == getFullMinutes(endHour))){
								t.push(prefix(i)+":30");
							}
						}
					}
				}else{
					startHH = Number(startHour.substring(0,2));
					endHH = Number(endHour.substring(0,2));
					for(var i=startHH; i<=endHH; i++) {
						if(i > _nowHour || getDateStr(0) != orderDate){
							if(((getFullMinutes(prefix(i)+":00") - startFullMinites) >= orderMinitesMin 
									&& (getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
									&& (getFullMinutes(prefix(i)+":00") - startFullMinites) % 60 == 0
									&& getFullMinutes(prefix(i)+":00") <= getFullMinutes(endHour))
								|| 
								((getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
								&& getFullMinutes(prefix(i)+":00") == getFullMinutes(endHour))){
								t.push(prefix(i)+":00");
							}
							if(((getFullMinutes(prefix(i)+":30") - startFullMinites) >= orderMinitesMin 
									&& (getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
									&& (getFullMinutes(prefix(i)+":30") - startFullMinites) % 60 == 0
									&& getFullMinutes(prefix(i)+":30") <= getFullMinutes(endHour))
								|| 
								((getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
								&& getFullMinutes(prefix(i)+":30") == getFullMinutes(endHour))){
								t.push(prefix(i)+":30");
							}
						}
					}
				}
	//			endMM = endHour.substring(3,5);
	//			if(endMM == "00"){
	//				t.pop();
	//			}
				if(t.length == 0){
					t.push(errorTip);
				}
			}

			$("#J_demand_endHour").picker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-left close-picker">取消</button>\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择结束时间</h1>\
				</header>',
				cols: [
					{
					  textAlign: 'center',
					  values: t
					}
				],
				onOpen: function(picker) {
					var orderDate = $('#dateStrId').val();
					var week = getMyDay(orderDate);
					var type = $('#typeStrId').val();
					var startHourStr = $('#startHourStrId').val();
					var t = [];
					if(type == "0"){
						t = ["当前没有时间可选"];
					}else{
						var startFullMinites = getFullMinutes(startHourStr);
						var orderMinitesMin = 60 * Number(_orderHoursMin);
						var orderMinitesMax = 60 * Number(_orderHoursMax);
						var startHour,endHour;
						if(openHourJsonData!=null && openHourJsonData.length > 0){
							for(i=0;i<openHourJsonData.length;i++){
								var item = openHourJsonData[i];
								if(item.day == week && item.type == type){
									startHour = item.startHour;
									endHour = item.endHour;
									break;
								}
							}
						}
						startMM = startHour.substring(3,5);
						var today = dateAhead(1)[0];
						var _nowHour = parseInt(today["hour"],10);
						
						if(startMM == "30"){
	//						startHH = Number(startHour.substring(0,2)) + 1;
							startHH = Number(startHour.substring(0,2));
							if(startHH > _nowHour || getDateStr(0) != orderDate){
								//结束时间不能选择
								//t.push(startHour);
							}
							endHH = Number(endHour.substring(0,2));
							for(var i= (startHH+1); i<=endHH; i++) {
								if(i > _nowHour || getDateStr(0) != orderDate){
									if(((getFullMinutes(prefix(i)+":00") - startFullMinites) >= orderMinitesMin 
											&& (getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
											&& (getFullMinutes(prefix(i)+":00") - startFullMinites) % 60 == 0
											&& getFullMinutes(prefix(i)+":00") <= getFullMinutes(endHour))
										|| 
										((getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
										&& getFullMinutes(prefix(i)+":00") == getFullMinutes(endHour))){
											t.push(prefix(i)+":00");
									}
									if(((getFullMinutes(prefix(i)+":30") - startFullMinites) >= orderMinitesMin 
											&& (getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
											&& (getFullMinutes(prefix(i)+":30") - startFullMinites) % 60 == 0
											&& getFullMinutes(prefix(i)+":30") <= getFullMinutes(endHour))
										|| 
										((getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
										&& getFullMinutes(prefix(i)+":30") == getFullMinutes(endHour))){
										t.push(prefix(i)+":30");
									}
								}
							}
						}else{
							startHH = Number(startHour.substring(0,2));
							endHH = Number(endHour.substring(0,2));
							for(var i=startHH; i<=endHH; i++) {
								if(i > _nowHour || getDateStr(0) != orderDate){
									if(((getFullMinutes(prefix(i)+":00") - startFullMinites) >= orderMinitesMin 
											&& (getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
											&& (getFullMinutes(prefix(i)+":00") - startFullMinites) % 60 == 0
											&& getFullMinutes(prefix(i)+":00") <= getFullMinutes(endHour))
										|| 
										((getFullMinutes(prefix(i)+":00") - startFullMinites) <= orderMinitesMax
										&& getFullMinutes(prefix(i)+":00") == getFullMinutes(endHour))){
											t.push(prefix(i)+":00");
									}
									if(((getFullMinutes(prefix(i)+":30") - startFullMinites) >= orderMinitesMin 
											&& (getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
											&& (getFullMinutes(prefix(i)+":30") - startFullMinites) % 60 == 0
											&& getFullMinutes(prefix(i)+":30") <= getFullMinutes(endHour))
										|| 
										((getFullMinutes(prefix(i)+":30") - startFullMinites) <= orderMinitesMax
										&& getFullMinutes(prefix(i)+":30") == getFullMinutes(endHour))){
										t.push(prefix(i)+":30");
									}
								}
							}
						}
	//					endMM = endHour.substring(3,5);
	//					if(endMM == "00"){
	//						t.pop();
	//					}
						if(t.length == 0){
							t.push(errorTip);
						}
					}
					
					picker.cols[0].replaceValues(t);
					picker.updateValue();
				},
				onClose: function(p) {
					$('#endHourStr').val(p.value[0]);
					$('#endHourStrId').val(p.value[0]);
				}
			});
			$('#endHourStr').val(t[0]);
			$('#endHourStrId').val(t[0]);
		}
		return {
			init: init
		}
	})();
	
	// 选择开始时间
	var orderHour = (function(){
		
		function init() {
			
			var orderDate = $('#dateStrId').val();
			var week = getMyDay(orderDate);
			var type = $('#typeStrId').val();
			var t = [];
			if(type == "0"){
				t = ["当前没有时间可选"];
			}else{
				var startHour,endHour;
				if(openHourJsonData!=null && openHourJsonData.length > 0){
					for(i=0;i<openHourJsonData.length;i++){
						var item = openHourJsonData[i];
						if(item.day == week && item.type == type){
							startHour = item.startHour;
							endHour = item.endHour;
							break;
						}
					}
				}
				startMM = startHour.substring(3,5);
				var today = dateAhead(1)[0];
				var _nowHour = parseInt(today["hour"],10);
				if(startMM == "30"){
	//				startHH = Number(startHour.substring(0,2)) + 1;
					startHH = Number(startHour.substring(0,2));
					if(startHH > _nowHour || getDateStr(0) != orderDate){
						t.push(startHour);
					}
					endHH = Number(endHour.substring(0,2));
					for(var i= (startHH+1); i<=endHH; i++) {
						if(i > _nowHour || getDateStr(0) != orderDate){
							t.push(prefix(i)+":00");
							t.push(prefix(i)+":30");
						}
					}
				}else{
					startHH = Number(startHour.substring(0,2));
					endHH = Number(endHour.substring(0,2));
					for(var i=startHH; i<=endHH; i++) {
						if(i > _nowHour || getDateStr(0) != orderDate){
							t.push(prefix(i)+":00");
							t.push(prefix(i)+":30");
						}
					}
				}
				endMM = endHour.substring(3,5);
				if(endMM == "00"){
					t.pop();
				}
				if(t.length == 0){
					t.push(errorTip);
				}
			}
			
			$("#J_demand_startHour").picker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-left close-picker">取消</button>\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择开始时间</h1>\
				</header>',
				cols: [
					{
					  textAlign: 'center',
					  values: t
					}
				],
				onOpen: function(picker) {
					var orderDate = $('#dateStrId').val();
					var week = getMyDay(orderDate);
					var type = $('#typeStrId').val();
					var t = [];
					if(type == 0){
						t = ["当前没有时间可选"];
					}else{
						var startHour,endHour;
						if(openHourJsonData!=null && openHourJsonData.length > 0){
							for(i=0;i<openHourJsonData.length;i++){
								var item = openHourJsonData[i];
								if(item.day == week && item.type == type){
									startHour = item.startHour;
									endHour = item.endHour;
									break;
								}
							}
						}
						startMM = startHour.substring(3,5);
						var today = dateAhead(1)[0];
						var _nowHour = parseInt(today["hour"],10);
						
						if(startMM == "30"){
	//						startHH = Number(startHour.substring(0,2)) + 1;
							startHH = Number(startHour.substring(0,2));
							if(startHH > _nowHour || getDateStr(0) != orderDate){
								t.push(startHour);
							}
							endHH = Number(endHour.substring(0,2));
							for(var i= (startHH+1); i<=endHH; i++) {
								if(i > _nowHour || getDateStr(0) != orderDate){
									t.push(prefix(i)+":00");
									t.push(prefix(i)+":30");
								}
							}
						}else{
							startHH = Number(startHour.substring(0,2));
							endHH = Number(endHour.substring(0,2));
							for(var i=startHH; i<=endHH; i++) {
								if(i > _nowHour || getDateStr(0) != orderDate){
									t.push(prefix(i)+":00");
									t.push(prefix(i)+":30");
								}
							}
						}
						endMM = endHour.substring(3,5);
						if(endMM == "00"){
							t.pop();
						}
						if(t.length == 0){
							t.push(errorTip);
						}
					}
					
					picker.cols[0].replaceValues(t);
					picker.updateValue();
				},
				onClose: function(p) {
					$('#startHourStr').val(p.value[0]);
					$('#startHourStrId').val(p.value[0]);
					$('#endHourStr').val("");
					$('#endHourStrId').val("");
					endOrderHour.init();
				}
			});
		}
		return {
			init: init
		}
	})();
	
	// 选择预约时段
	var orderType = (function(){
		var items = {};
		var today = dateAhead(1)[0],
			_nowHour = parseInt(today["hour"],10),
			_nowMinutes = parseInt(today["minutes"],10);
		function getValueByDisplayValue(displayValue) {
			var value = "";
			for(var id in items)
				if(items[id] == displayValue) {
					value = id;
					break;
				}
			return value;
		}
		
		function init() {
//			var pValues,
//				pDisplayValues;
//			
//			var orderDate = $('#dateStrId').val();
//			var week = getMyDay(orderDate);
//			var d = {
//				displayValue:[],
//				value:[]
//			};
//			
//			if(openHourJsonData!=null && openHourJsonData.length > 0){
//				for(i=0;i<openHourJsonData.length;i++){
//					var item = openHourJsonData[i];
//					if(item.day == week){
//						if(getDateStr(0) != orderDate){
//							items[item.type] = item.typeName;
//							d["displayValue"].push(item.typeName);
//							d["value"].push(item.type)
//						}else{
//							startHour = item.startHour;
//							endHour = item.endHour;
//							_nowHour = parseInt(today["hour"],10),
//							_nowMinutes = parseInt(today["minutes"],10);
//							//结束时间前30分钟就不能预定了
//							if(getFullMinutes(prefix(_nowHour) + ":" + _nowMinutes) < (getFullMinutes(endHour) - 30)){
//								items[item.type] = item.typeName;
//								d["displayValue"].push(item.typeName);
//								d["value"].push(item.type);
//							}else{
//								items["0"] = "当前没有时间段可选";
//								d["displayValue"].push("当前没有时间段可选");
//								d["value"].push("0");
//							}
//						}
//					}
//				}
//			}
//			
//			pValues = d.value;
//			pDisplayValues = d.displayValue;

			$("#J_demand_type").picker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-left close-picker">取消</button>\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择预约时段</h1>\
				</header>',
				cols: [
					{
					  textAlign: 'center',
					  values: ['上午','下午']
					}
				],
				onOpen: function(picker) {
					var orderDate = $('#dateStrId').val();
					var week = getMyDay(orderDate);
					var d = {
						displayValue:[],
						value:[]
					};
					
					if(openHourJsonData!=null && openHourJsonData.length > 0){
						for(i=0;i<openHourJsonData.length;i++){
							var item = openHourJsonData[i];
							if(item.day == week){
								if(getDateStr(0) != orderDate){
									items[item.type] = item.typeName;
									d["displayValue"].push(item.typeName);
									d["value"].push(item.type)
								}else{
									startHour = item.startHour;
									endHour = item.endHour;
									_nowHour = parseInt(today["hour"],10),
									_nowMinutes = parseInt(today["minutes"],10);
									//结束时间前30分钟就不能预定了
									if(getFullMinutes(prefix(_nowHour) + ":" + _nowMinutes) < (getFullMinutes(endHour) - 30)){
										items[item.type] = item.typeName;
										d["displayValue"].push(item.typeName);
										d["value"].push(item.type);
									}else{
										items["0"] = "当前没有时间段可选";
										d["displayValue"].push("当前没有时间段可选");
										d["value"].push("0");
									}
								}
							}
						}
					}
					
					picker.cols[0].replaceValues(d.displayValue);
					picker.updateValue();
				},
				onClose: function(p) {
					var displayValue = p.value[0],
					value = getValueByDisplayValue(displayValue);
					$('#typeStr').val(displayValue);
					$('#typeStrId').val(value);
					$('#startHourStr').val("");
					$('#endHourStr').val("");
					$('#startHourStrId').val("");
					$('#endHourStrId').val("");
					orderHour.init();
				}
			});
		}
		return {
			init: init
		}
	})();
		
		
	// 选择预约时间	
	var orderDate = (function(){

		function init() {
			var today = dateAhead(1)[0],
				todayStr = today["year"]+"-"+today["month"]+"-"+today["day"];
				_nowHour = parseInt(today["hour"],10),
				_nowMinutes = parseInt(today["minutes"],10);

			var pHours,
				cHours = getCompleteTime(),
				tHours = getTodayTime();

			var pValues,
				pDisplayValues;

//			if(_nowHour+_DELAY > 17 || (_nowHour+_DELAY == 17 && _nowMinutes >= 30)) {
//				pValues = getAhead(8).value;
//				pDisplayValues = getAhead(8).displayValue;
//				pValues.shift();
//				pDisplayValues.shift();
//				pHours = cHours;
//			}else{
				pValues = getAhead().value;
				pDisplayValues = getAhead().displayValue;
				pHours = tHours;
//			}

			var libraryId = $('#libraryId').val();
			if(libraryId == ''){
				plus.nativeUI.toast("请先选择场馆!");
			}
			var _qryjson = {
					"intf_code" : "QRY_OPENHOURS",
					"params" : {
						"libraryId": libraryId
					}
			};
			plus.nativeUI.toast("查询数据中，请稍等",100);
			$.ajax({
				type : "post",
				url : server_url+"?v=" + (new Date()).valueOf(),
				cache: false,
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(_qryjson),
				dataType : "json",
				success: function(res) {
					if(res.result_code != 0) {
						plus.nativeUI.toast("加载图书馆开放时间失败");
						return;
					}
					openHourJsonData = res.result_data;
				},
				error: function() {
					plus.nativeUI.toast("加载图书馆开放时间失败");
				}
			})

			$("#J_demand_date").picker({
				toolbarTemplate: '<header class="bar bar-nav">\
				<button class="button button-link pull-left close-picker">取消</button>\
				<button class="button button-link pull-right close-picker">确定</button>\
				<h1 class="title">选择预约时间</h1>\
				</header>',
				cols: [
					{
					  textAlign: 'center',
					  values: pValues,
					  displayValues: pDisplayValues
					}
				],
				onClose: function(p) {
					var displayValue = p.value[0];
					$('#dateStr').val(displayValue);
					$('#dateStrId').val(displayValue);
					$('#typeStr').val("");
					$('#startHourStr').val("");
					$('#endHourStr').val("");
					$('#typeStrId').val("");
					$('#startHourStrId').val("");
					$('#endHourStrId').val("");
					orderType.init();
				}
			});
		}
		return {
			init: init
		}
	})();
	
	// 选择场馆
	var library = (function(){
		var items = {};
		function getValueByDisplayValue(displayValue) {
			var value = "";
			for(var id in items)
				if(items[id] == displayValue) {
					value = id;
					break;
				}
			return value;
		}
		function init() {
			var _json = {
					"intf_code" : "QRY_PRE_LIBRARY",
					"params" : {
						"userPhysicalCard":addParams.userPhysicalCard
					}
			};
			$.ajax({
				type : "post",
				url : server_url+"?v=" + (new Date()).valueOf(),
				cache: false,
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(_json),
				dataType : "json",
				success: function(res) {
					if(res.result_code != 0) {
						plus.nativeUI.toast("加载图书馆列表失败");
						return;
					}
					var _data = res.result_data,
						_displayValues = [];
					for (var i=0,len=_data.length;i<len;i++) {
						items[_data[i]['libraryId']] = _data[i]['libName'];
						_displayValues.push(_data[i]['libName']);
					}
					$("#J_demand_library").picker({
						toolbarTemplate: '<header class="bar bar-nav">\
						<button class="button button-link pull-left close-picker">取消</button>\
						<button class="button button-link pull-right close-picker">确定</button>\
						<h1 class="title">选择场馆</h1>\
						</header>',
						cols: [
							{
							  textAlign: 'center',
							  values: _displayValues
							}
						],
						onClose: function(p) {
							var displayValue = p.value[0],
								value = getValueByDisplayValue(displayValue);
							addParams.appointName = value;
							addParams.appointNameTxt = displayValue;
							$('#libraryId').val(addParams.appointName);
							$('#libraryName').val(addParams.appointNameTxt);
							setStorageItem(tsg_library_key,addParams.appointName);
							setStorageItem(tsg_libraryname_key,addParams.appointNameTxt);
							orderDate.init();
						}
					});
				},
				error: function() {
					plus.nativeUI.toast("加载图书馆列表失败");
					
				}
			})
		}
		return {
			init: init
		}
	})();
	$('#dateStr').val("");
	$('#typeStr').val("");
	$('#startHourStr').val("");
	$('#endHourStr').val("");
	$('#dateStrId').val("");
	$('#typeStrId').val("");
	$('#startHourStrId').val("");
	$('#endHourStrId').val("");
	library.init();
	if($('#libraryId').val()!=""){
		orderDate.init();	
	}
})();

/**
 * 预约座位第二步
 */
function queryLibroom(){
	var dateStr = $('#dateStrId').val();
	var libraryId = $('#libraryId').val();
	var startHour = $('#startHourStrId').val();
	var endHour = $('#endHourStrId').val();
	var type = $('#typeStrId').val();
	if(libraryId == ''){
		plus.nativeUI.toast("请选择场馆!");
		return;
	}
	if(dateStr == ''){
		plus.nativeUI.toast("请选择预约时间!");
		return;
	}
	if(type == "0"){
		$.toast("时间选择不正确，请重新选择!");
		return;
	}
	if(startHour == '' || startHour == errorTip){
		plus.nativeUI.toast("请选择开始时间!");
		return;
	}
	if(endHour == '' || endHour == errorTip){
		plus.nativeUI.toast("请选择结束时间!");
		return;
	}
	if(startHour >= endHour){
		plus.nativeUI.toast("开始时间只能小于结束时间!");
		return;
	}
	if(startHour < (prefix(startHH)+":"+startMM) || startHour > (prefix(endHH)+":"+endMM)){
		plus.nativeUI.toast("开始时间不合法!");
		return;
	}
	if(endHour < (prefix(startHH)+":"+startMM) || endHour > (prefix(endHH)+":"+endMM)){
		plus.nativeUI.toast("结束时间不合法!");
		return;
	}
	var orderMinitesMin = 60 * Number(_orderHoursMin);
	var orderMinitesMax = 60 * Number(_orderHoursMax);
	var realStartMM = startHour.substring(3,5);
	var realStartHH = startHour.substring(0,2);
	var realEndMM = endHour.substring(3,5);
	var realEndHH = endHour.substring(0,2);
	var startMin = Number(realStartHH) * 60 + Number(realStartMM);
	var endMin = Number(realEndHH) * 60 + Number(realEndMM);
	var diff = endMin - startMin;
	if(endHour != (prefix(endHH)+":"+endMM)){
		if(diff < orderMinitesMin || diff > orderMinitesMax || diff % 60 != 0){
			$.toast("预约时间只能在" + _orderHoursMin + "到" + _orderHoursMax + "小时内，且必须为整数小时!");
			return;
		}
	}
//	else{
//		if(diff < 60){
//			plus.nativeUI.toast("当结束时间为闭馆时间时，您至少需要预约1小时!");
//			return;
//		}
//	}

	var _json = {
			"intf_code" : "QRY_PRE_SEAT_CHECK",
			"params" : {
				"userPhysicalCard":getStorageItem(tsg_key),
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
		dataType : "json",
		success : function(data) {
			if(data.result_code == 0){
				var url = "preStep2.html?dateStr=" + dateStr+"&libraryId="+libraryId+"&startHour="+startHour+"&endHour="+endHour;
				toPage(url);
			}else {//有预约记录，不进入下一步页面
				plus.nativeUI.toast(data.result_desc);
				return;
			}
		},
		error : function(data) {
			plus.nativeUI.toast('网络异常，请重试');
			return;
		}
	});
}

function prefix(n) {
	return n.toString().length < 2 ? "0"+n : n;
}