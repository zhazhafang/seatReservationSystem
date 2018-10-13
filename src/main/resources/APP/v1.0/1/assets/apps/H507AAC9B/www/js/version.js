(function(doc){
	mui.init({
		
	});
	
	
	//检查版本
	var checkVersion = function(){
		// 获取本地应用资源版本号
		var platform;
		if ( plus.os.name == "iOS" ) {
		    platform = "1";
	    } else if (plus.os.name == "Android") {
	    	platform = "0";
	    }
	   	plus.runtime.getProperty(plus.runtime.appid,function(inf){
			queryVersion(inf.version,platform);
	    });
	};
	
	// 获取请求参数
	var getVersionReqParam = function(platform){
		var json = {
					"intf_code" : "UPD_VERSION",
					"params" : {"platform":platform}
			};
		return JSON.stringify(json);
	};
	
	//查询版本，版本号格式必须为1.1
	var queryVersion = function(c_version,platform){
		var params = getVersionReqParam(platform);
	    var onSuccess = function(data){
	    	if(data.result_code=="0"){
	    		var versionObj = data.result_data;
					if(processNULL(versionObj)!=""){
	    				var version = versionObj.versionNum;//服务端，最新版本号
	    				console.log("c_version:"+c_version+",version:"+version);
	    				var s_l_v = version.split(".")[0];//服务端，最新的大版本号
	    				var s_s_v = version.split(".")[1];//服务端，最新的小版本号
	    				
	    				var c_l_v = c_version.split(".")[0];//app端，大版本号
	    				var c_s_v = c_version.split(".")[1];//app端，小版本号
	    				console.log("version:"+version+",版本号,app端大版本号c_l_v:"+c_l_v+",小版本号c_s_v:"+c_s_v+",服务端最新的大版本号s_l_v:"+s_l_v+",最新的小版本号s_s_v:"+s_s_v);
	    				var fileDownloadUrl = versionObj.fileDownloadUrl;
	    				var updateDesc = versionObj.updateDesc;
	    				if(processNULL(updateDesc)==""){ 
	    					updateDesc = "检测到新版本，请更新到最新版本!"; 
	    				}
						if(parseInt(c_l_v)<parseInt(s_l_v)){
							//小于服务器当前版本大版本号，全量升级
							mui.confirm(updateDesc,'提示',['升级','退出'],function(e){
								if(e.index == 0){
									openURL(fileDownloadUrl);
								} 
								exitFun();
							});
						}
						if(parseInt(c_l_v)==parseInt(s_l_v)){
							if(parseInt(c_s_v) < parseInt(s_s_v)){ //增量升级
	    						mui.confirm(updateDesc,'提示',['升级','取消'],function(e){
									if(e.index == 0){
										downloadApp(fileDownloadUrl);
									} 
								});
	    					}else{
	    						plus.nativeUI.toast("当前已是最新版本");
	    					}
						}

	    			}else{
	    				plus.nativeUI.toast("未检测到新版本");
	    			}
	    	}
	    };
	    var onError = function(data){
//	    	plus.nativeUI.toast('服务端接口异常');
			plus.nativeUI.toast('网络异常，请重试');
		}
	    mui.ajaxQuery(params, onSuccess,onError);
	}
	
	var downloadApp = function(fileDownloadUrl) {
		var wt=plus.nativeUI.showWaiting("下载新版本...");
		plus.downloader.createDownload(fileDownloadUrl, {filename:"_doc/update/"}, function(d,status){
			wt.close();
	        if ( status == 200 ) { 
	            console.log("下载wgt成功："+d.filename);
	            installApp(d.filename); // 安装wgt包
	        } else {
	            console.log("下载wgt失败！");
	            plus.nativeUI.alert("下载wgt失败！");
	        }
	    }).start();
	    
	};
	var installApp = function(path) {
	    plus.nativeUI.showWaiting("安装新版本...");
	    plus.runtime.install(path,{},function(){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件成功！");
	        plus.nativeUI.alert("应用资源更新完成！",function(){
	            plus.runtime.restart();
	        });
	    },function(e){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件失败["+e.code+"]："+e.message);
	        plus.nativeUI.alert("安装新版本失败["+e.code+"]："+e.message);
	    });
	};
	
	//退出
	var exitFun = function(){
		if(mui.os.ios){
           mui.alert('请双击Home键退出程序');
        } else {
           plus.runtime.quit();
        }
	}
	
	//HTML5+ js组件已完全载入，所有要用到HTML5+ API的都必须写在这里。
	mui.plusReady(function(){
		var _key = getStorageItem(tsg_key);
		//当前未获取到登录信息直接跳转到登录页面
		if(_key == null){
			window.location.href = "login.html";
			return ;
		}
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
			$('#currentVersion').html(inf.version);
	    });
		
		doc.querySelector('#updateVersion').addEventListener('tap',checkVersion);
		
	});
	
})(document);