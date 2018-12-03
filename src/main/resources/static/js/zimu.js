function selectUserInfoFromSchool() {
    var myForm = $('#allUserForm');
    myForm.action = "/getUserInfoFromSchool";
    myForm.submit();
}

function selectRecordFromSchool() {
    var recordForm = $('#recordForm');
    recordForm.attr("action","getRecordFromSchool");
    recordForm.submit();
}