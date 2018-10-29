function sendMessage(ob) {
    var content = $('#content').val();
    var userId = id;
    $.post("/sendMessage",{
        userId : userId,
        sendMessage : content
    }, function (data, status) {
    })
}

