function selectUserInfoFromSchool() {
    var myForm = $('#allUserForm');
    myForm.action = "/getUserInfoFromSchool";
    myForm.submit();
}

function selectRecordFromSchool() {
    var recordForm = $('#recordForm');
    $('#setCookie').val(localStorage.cookie);
    recordForm.attr("action","getRecordFromSchool");
    recordForm.submit();
}

function checkLogin() {
    var flag = $('#flag').val();
    if (flag == 2) {
        showLogin();
    }
}

function showLogin() {

        layui.use(['laypage', 'layer'], function(){
            var $ = layui.jquery, layer = layui.layer;
            var laypage = layui.laypage
                ,layer = layui.layer;
            var msg = "<form class=\"layui-form\" action=\"\"><div class=\"layui-form-item\" style='margin-top: 30px;'>\n" +
                "    <label class=\"layui-form-label\">学号：</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "      <input type=\"text\" id='loginStuId' name=\"username\" lay-verify=\"title\" autocomplete=\"off\" placeholder=\"请输入标题\" class=\"layui-input\" style='margin-left:-40px;'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">密码：</label>\n" +
                "    <div class=\"layui-input-block\">\n" +
                "      <input type=\"password\" id='loginPsw' name=\"password\" placeholder=\"请输入密码\" autocomplete=\"off\" class=\"layui-input\" style='margin-left:-40px;'>\n" +
                "    </div>\n" +
                "  </div></form>";
            var active = {
                setTop: function(){
                    var that = this;
                    //多窗口模式，层叠置顶
                    layer.open({
                        type: 1 //此处以iframe举例
                        ,title: '请登录座位预约系统账号！'
                        ,area: ['390px', '260px']
                        ,shade: 0
                        ,maxmin: true
                        ,offset: [ //为了演示，随机坐标
                            $(window).height()/2-150
                            ,$(window).width()/2-200
                        ]
                        ,content: msg
                        ,btn: ['登录', '关闭'] //只是为了演示
                        ,yes: function(){
                            $(that).click(toLogin());
                        }
                        ,btn2: function(){
                            layer.closeAll();
                        }

                        ,zIndex: layer.zIndex //重点1
                        ,success: function(layero){
                            layer.setTop(layero); //重点2
                        }
                    });
                }
            };
            var othis = $('#tips'), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
}
function toLogin() {
    var stuId = $('#loginStuId').val();
    var password = $('#loginPsw').val();
    $.post("/toLogin",{
        stuId : stuId,
        password : password
    },function (msg) {
        if (msg["status"]==1){
            alert(msg["message"]);
            localStorage.cookie = msg["setCookie"];
            layer.closeAll();
            selectRecordFromSchool();
        }else{
            alert(msg["message"]);
        }
    })
}