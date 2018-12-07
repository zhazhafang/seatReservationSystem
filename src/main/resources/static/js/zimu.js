function selectUserInfoFromSchool() {
    var myForm = $('#allUserForm');
    myForm.attr("action","getUserInfoFromSchool");
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

function showLogin(ob) {
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
                            $(that).click(toLogin(ob));
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

function toLogin(ob) {
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
            switch (ob) {
                case 1:selectRecordFromSchool();break;
                case 2:showForm(stuId, password);break;
            }
        }else{
            alert(msg["message"]);
        }
    })
}

function showDel(dbname) {
    layui.use(['laypage', 'layer'], function(){
        var $ = layui.jquery, layer = layui.layer;
        var laypage = layui.laypage
            ,layer = layui.layer;
        var msg = "<form class=\"layui-form\" action=\"\"><div class=\"layui-form-item\" style='margin-top: 30px;'>\n" +
            "    <label class=\"layui-form-label\">数量：</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" id='count' name=\"username\" lay-verify=\"title\" autocomplete=\"off\" placeholder=\"请输入删除数量\" class=\"layui-input\" style='margin-left:-40px;'>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <div class=\"layui-form-item\">\n" +
            "    <label class=\"layui-form-label\" style='width: auto;'>验证码：</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" id='yzm' oninput='checkVcode()' name=\"password\"  placeholder=\"请输入验证码\" autocomplete=\"off\" class=\"layui-input\" style='margin-left:-40px;width: 150px;float: left;'>" +
            "<span class=\"layui-col-xs3\" style='margin: 5px 0px 0px 25px;'><img id='vcode' onclick='flushVcode()' /></span>" +
            "    </div>\n" +
            "  </div></form>";
        var active = {
            setTop: function(){
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 1 //此处以iframe举例
                    ,title: '请输入以下信息确认删除。'
                    ,area: ['390px', '260px']
                    ,shade: 0
                    ,maxmin: true
                    ,offset: [ //为了演示，随机坐标
                        $(window).height()/2-150
                        ,$(window).width()/2-200
                    ]
                    ,content: msg
                    ,btn: ['删除', '关闭'] //只是为了演示
                    ,yes: function(){
                        $(that).click(doDel(dbname));
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
        if (layer.content == null) {
            layer.content = msg;
        }else {
            var othis = $('#delDB'), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
            $('#vcode').attr("src","/static/img/yzm.jpg?" + new Date().getTime());
        }

    });
}

function delDbs(dbname) {
    getVcode();
    showDel(dbname);
    $('.layui-layer-btn0').attr("class", "layui-btn layui-btn-disabled");
}

function flushVcode() {
    getVcode();
    $('#vcode').attr("src","/static/img/yzm.jpg?" + new Date().getTime());
}

function getVcode() {
    $.get('/getVcode', function (data, status) {
        if (status == "success") {
            $('#vcode').attr("src","/static/img/yzm.jpg?" + new Date().getTime());
        }
    });
}
var flag = 0;
function checkVcode() {
    var yzm = $('#yzm').val();
    if (yzm.length == 4) {
        $.post("/checkVcode", {
            vcode:yzm
        },function (msg) {
            if (msg.data == 1) {
                document.getElementById("yzm").style.border = "1px solid gray";
                $('.layui-btn-disabled').attr("class","layui-layer-btn0");
                flag = 1;
            }else {
                document.getElementById("yzm").style.border = "1px solid red";
                $('.layui-layer-btn0').attr("class", "layui-btn layui-btn-disabled");
                flag = 0;
            }
        })
    }
}

function doDel(dbname) {
    var count = $('#count').val();
    if (flag==1) {
        $.post("/doDelDBData",{
            dbname : dbname,
            count : count
        },function (msg) {
            alert(msg.message);
            window.location.reload();
        })
    }else {

    }
}
function cancelBook() {
    var myForm = $('#cancelBookForm');
    $('#cancelCookie').val(localStorage.cookie);
    myForm.submit();
    alert("取消成功！");

}

function updateLogin() {
   showLogin(2);
}
function showForm(stuId, password) {
    document.getElementById('upBtn').style.display = "none";
    document.getElementById('upForm').style.display = "block";
    $.post("/getUpInfo",{
        stuId: stuId
    },function (msg) {
        $('#name').val(msg["userName"]);
        $('#dept').val(msg["dept"]);
        $('#tel').val(msg["mobile"]);
        $('#wechat').val(msg["wechat"]);
    });
    $('#upStuId').val(stuId);
    $('#newPsw').val(password);
    $('#confirmPassword').val(password);
}
function doUpdate() {
    var userPhysicalCard = $('#upStuId').val();
    var userName = $('#name').val();
    var dept = $('#dept').val();
    var newPassword = $('#newPsw').val();
    var confirmPassword = $('#confirmPassword').val();
    var mobile = $('#tel').val();
    var wechat = $('#wechat').val();
    var cookie = localStorage.cookie;

    $.post("/upInfo",{
        userPhysicalCard : userPhysicalCard,
        userName : userName,
        dept : dept,
        newPassword : newPassword,
        confirmPassword : confirmPassword,
        mobile : mobile,
        wechat : wechat,
        cookie : cookie
    }, function (msg) {
        alert(msg["message"]);
        window.location.reload();
    })
}