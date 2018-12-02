function selectFromSchool() {
    var myForm = $('#myForm');
    myForm.action = "/getUserInfoFromSchool";
    myForm.submit();
}