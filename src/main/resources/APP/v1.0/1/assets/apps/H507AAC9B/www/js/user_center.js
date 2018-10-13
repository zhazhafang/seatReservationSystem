(function(doc){
	mui.init({
		
	});
	
	
	//HTML5+ js组件已完全载入，所有要用到HTML5+ API的都必须写在这里。
	mui.plusReady(function(){
		var _key = getStorageItem(tsg_key);
		//当前未获取到登录信息直接跳转到登录页面
		if(_key == null){
			window.location.href = "login.html";
			return ;
		}	
		
		doc.querySelector('#history').addEventListener('tap', function(){
			//打开历史记录
			mui.openWindow({
			  	url: 'history.html', 
			    id:'history'
			});
		});
		
		doc.querySelector('#modifyPass').addEventListener('tap', function(){
			//打开修改密码
			mui.openWindow({
			  	url: 'modify_pass.html', 
			    id:'modify_pass'
			});
		});
		
//		doc.querySelector('#zx').addEventListener('tap', logout);
		doc.querySelector('#zx').addEventListener('tap', function(){
			var btnArray = ['确定', '取消'];
            mui.confirm('确认注销吗？', '提示信息', btnArray, function(e) {
                if (e.index == 0) {
                    logout();
                }
            })
		});
		
		//doc.querySelector('#version').addEventListener('tap',checkVersion);
		
	});
	
})(document);