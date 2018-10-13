

//meishi开始
$(document).ready(function(){
    $(".meishi").click(function(){
        if ($('.meishi22').hasClass('grade-w-roll')) {
            $('.meishi22').removeClass('grade-w-roll');
        } else {
            $('.meishi22').addClass('grade-w-roll');
        }
    });
});

$(document).ready(function(){
    $(".meishia-w>li").click(function(){
        $(".meishia-t")
            .css("left","50%")
    });
});

$(document).ready(function(){
    $(".meishia-t>li").click(function(){
        $(".meishia-s")
            .css("left","50%")
    });
});





//Regional开始
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')) {
            $('.grade-eject').removeClass('grade-w-roll');
        } else {
            $('.grade-eject').addClass('grade-w-roll');
        }
    });
});

$(document).ready(function(){
    $(".grade-w>li").click(function(){
        $(".grade-t")
            .css("left","50%")
    });
});

$(document).ready(function(){
    $(".grade-t>li").click(function(){
        $(".grade-s")
            .css("left","50%")
    });
});



//Sort1开始

$(document).ready(function(){
    $(".Sort1").click(function(){
        if ($('.Sort-eject1').hasClass('grade-w-roll')) {
            $('.Sort-eject1').removeClass('grade-w-roll');
        } else {
            $('.Sort-eject1').addClass('grade-w-roll');
        }
    });
});

//Sort2开始

$(document).ready(function(){
    $(".Sort2").click(function(){
        if ($('.Sort-eject2').hasClass('grade-w-roll')) {
            $('.Sort-eject2').removeClass('grade-w-roll');
        } else {
            $('.Sort-eject2').addClass('grade-w-roll');
        }
    });
});

//Sort3开始

$(document).ready(function(){
    $(".Sort3").click(function(){
        if ($('.Sort-eject3').hasClass('grade-w-roll')) {
            $('.Sort-eject3').removeClass('grade-w-roll');
        } else {
            $('.Sort-eject3').addClass('grade-w-roll');
        }
    });
});


//判断页面是否有弹出
$(document).ready(function(){
    $(".meishi").click(function(){
        if ($('.Sort-eject1').hasClass('grade-w-roll')){
            $('.Sort-eject1').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".meishi").click(function(){
        if ($('.Sort-eject2').hasClass('grade-w-roll')){
            $('.Sort-eject2').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".meishi").click(function(){
        if ($('.Sort-eject3').hasClass('grade-w-roll')){
            $('.Sort-eject3').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".meishi").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };
    });
});






$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Sort-eject1').hasClass('grade-w-roll')){
            $('.Sort-eject1').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Sort-eject2').hasClass('grade-w-roll')){
            $('.Sort-eject2').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Sort-eject3').hasClass('grade-w-roll')){
            $('.Sort-eject3').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.meishi22').hasClass('grade-w-roll')){
            $('.meishi22').removeClass('grade-w-roll');
        };

    });
});











$(document).ready(function(){
    $(".Sort1").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };

    });
});
$(document).ready(function(){
    $(".Sort1").click(function(){
        if ($('.meishi22').hasClass('grade-w-roll')){
            $('.meishi22').removeClass('grade-w-roll');
        };

    });
});

$(document).ready(function(){
    $(".Sort2").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };

    });
});
$(document).ready(function(){
    $(".Sort2").click(function(){
        if ($('.meishi22').hasClass('grade-w-roll')){
            $('.meishi22').removeClass('grade-w-roll');
        };

    });
});

$(document).ready(function(){
    $(".Sort3").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };

    });
});
$(document).ready(function(){
    $(".Sort3").click(function(){
        if ($('.meishi22').hasClass('grade-w-roll')){
            $('.meishi22').removeClass('grade-w-roll');
        };

    });
});




//js点击事件监听开始

function meishia(wbj){
    var arr = document.getElementById("meishia").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    wbj.style.background = "#eee"
}

function meishib(tbj){
    var arr = document.getElementById("meishib").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "#eee";
    };
}

function meishis(sbj){
    var arr = document.getElementById("meishis").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.borderBottom = "";
    };
    sbj.style.borderBottom = "solid 1px #ff7c08"
}





function grade1(wbj){
    var arr = document.getElementById("gradew").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    wbj.style.background = "#eee"
}

function gradet(tbj){
    var arr = document.getElementById("gradet").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
}

function grades(sbj){
    var arr = document.getElementById("grades").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.borderBottom = "";
    };
    sbj.style.borderBottom = "solid 1px #ff7c08"
}


function Sorts(sbj){
    var arr = document.getElementById("Sort-Sort1").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}
function Sorts(sbj){
    var arr = document.getElementById("Sort-Sort2").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}
function Sorts(sbj){
    var arr = document.getElementById("Sort-Sort3").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}