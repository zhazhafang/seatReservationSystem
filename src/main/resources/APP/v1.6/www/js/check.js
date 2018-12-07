function checkInfo() {
    if(localStorage.username == "null" || localStorage.username == null || localStorage.tel == "null" || localStorage.tel == null
        ||localStorage.username == ""||localStorage.tel == ""){
        alert("请先完善信息！");
        window.location = "person.html";
    }
}

function checkMessage() {
    var userId = localStorage.id;
    var receiveMessage = "";
    $.ajax({
        type : "post",
        url  : "http://119.29.207.55/app/getMessage.php",
        dataType : "json",
        data : {
          userId : userId
        },
        success : function(msg){
            localStorage.messageId = msg.id;
            message = msg.sendMessage;
            messageTime = msg.time;
            receiveMessage = msg.receiveMessage;
            if (message != null) {
                if (receiveMessage == "" || receiveMessage == null) {
                    $('#showMessage').click();
                }
            }
        }
    });
}

function sendMessage() {
    var id = localStorage.messageId;
    var content = $('#receiveMessage').val();
    $.ajax({
        type : "post",
        url  : "http://119.29.207.55/app/receiveMessage.php",
        dataType : "json",
        data : {
            id : id,
            receiveMessage : content
        },
        success : function(msg){

        }
    });
}