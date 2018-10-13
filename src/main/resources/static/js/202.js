//china.js
function initData() {
    $.post("/showOther", {
        room : "202"
    },function (data, status) {
        for (var i=0; i<data.length; i++){
            $('#'+data[i].seatNo).attr("fill", "#CC3333")
                .attr("username", data[i].etagId)
                .attr("stuId", data[i].etagMd5)
                .attr("bookTime", data[i].statTime);
        }
        $.post("/show",{
            room : "202"
        }, function (data, status) {
            for (var i=0; i<data.length; i++){
                $('#'+data[i].seatNo).attr("fill", "#00FF33")
                    .attr("username", data[i].day)
                    .attr("stuId", data[i].stuId)
                    .attr("bookTime", data[i].bookTime);
            }
        });
    });

}
const svg = d3.select("#svg").append("svg").attr("width", "650").attr("height", "900");
const padding = {top : 20, bottom : 20, left: 20, right: 20};
var tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("opacity",0.0);
var g;
var gs;
function show() {
initData();

    dataset1 = [
        {deskname : '1A', state : 1 },{deskname : '1B', state : 1 },
        {deskname : '2A', state : 1 },{deskname : '2B', state : 1 },
        {deskname : '3A', state : 1 },{deskname : '3B', state : 1 },
        {deskname : '4A', state : 1 },{deskname : '4B', state : 1 },
        {deskname : '5A', state : 1 },{deskname : '5B', state : 1 },
        {deskname : '6A', state : 1 },{deskname : '6B', state : 1 },
        {deskname : '7A', state : 1 },{deskname : '7B', state : 1 },
        {deskname : '8A', state : 1 },{deskname : '8B', state : 1 },
        {deskname : '9A', state : 1 },{deskname : '9B', state : 1 },
        {deskname : '10A', state : 1 },{deskname : '10B', state : 1 },
        {deskname : '11A', state : 1 },{deskname : '11B', state : 1 }
    ];
    dataset2 = [
        {deskname : '1C', state : 1 },{deskname : '1D', state : 1 },
        {deskname : '2C', state : 1 },{deskname : '2D', state : 1 },
        {deskname : '3C', state : 1 },{deskname : '3D', state : 1 },
        {deskname : '4C', state : 1 },{deskname : '4D', state : 1 },
        {deskname : '5C', state : 1 },{deskname : '5D', state : 1 },
        {deskname : '6C', state : 1 },{deskname : '6D', state : 1 },
        {deskname : '7C', state : 1 },{deskname : '7D', state : 1 },
        {deskname : '8C', state : 1 },{deskname : '8D', state : 1 },
        {deskname : '9C', state : 1 },{deskname : '9D', state : 1 },
        {deskname : '10C', state : 1 },{deskname : '10D', state : 1 },
        {deskname : '11C', state : 1 },{deskname : '11D', state : 1 }
    ];
    dataset3 = [
        {deskname : '12A', state : 1 },{deskname : '12B', state : 1 },
        {deskname : '13A', state : 1 },{deskname : '13B', state : 1 },
        {deskname : '14A', state : 1 },{deskname : '14B', state : 1 },
        {deskname : '15A', state : 1 },{deskname : '15B', state : 1 },
        {deskname : '16A', state : 1 },{deskname : '16B', state : 1 },
        {deskname : '17A', state : 1 },{deskname : '17B', state : 1 },
        {deskname : '18A', state : 1 },{deskname : '18B', state : 1 },
        {deskname : '19A', state : 1 },{deskname : '19B', state : 1 },
        {deskname : '20A', state : 1 },{deskname : '20B', state : 1 },
        {deskname : '21A', state : 1 },{deskname : '21B', state : 1 },
        {deskname : '22A', state : 1 },{deskname : '22B', state : 1 }
    ];
    dataset4 = [
        {deskname : '12C', state : 1 },{deskname : '12D', state : 1 },
        {deskname : '13C', state : 1 },{deskname : '13D', state : 1 },
        {deskname : '14C', state : 1 },{deskname : '14D', state : 1 },
        {deskname : '15C', state : 1 },{deskname : '15D', state : 1 },
        {deskname : '16C', state : 1 },{deskname : '16D', state : 1 },
        {deskname : '17C', state : 1 },{deskname : '17D', state : 1 },
        {deskname : '18C', state : 1 },{deskname : '18D', state : 1 },
        {deskname : '19C', state : 1 },{deskname : '19D', state : 1 },
        {deskname : '20C', state : 1 },{deskname : '20D', state : 1 },
        {deskname : '21C', state : 1 },{deskname : '21D', state : 1 },
        {deskname : '22C', state : 1 },{deskname : '22D', state : 1 }
    ];
    dataset5 = [
        {deskname : '23A', state : 1 },{deskname : '23B', state : 1 },
        {deskname : '24A', state : 1 },{deskname : '24B', state : 1 },
        {deskname : '25A', state : 1 },{deskname : '25B', state : 1 },
        {deskname : '26A', state : 1 },{deskname : '26B', state : 1 },
        {deskname : '27A', state : 1 },{deskname : '27B', state : 1 },
        {deskname : '28A', state : 1 },{deskname : '28B', state : 1 },
        {deskname : '29A', state : 1 },{deskname : '29B', state : 1 },
        {deskname : '30A', state : 1 },{deskname : '30B', state : 1 },
        {deskname : '31A', state : 1 },{deskname : '31B', state : 1 },
        {deskname : '32A', state : 1 },{deskname : '32B', state : 1 },
        {deskname : '33A', state : 1 },{deskname : '33B', state : 1 }
    ];
    dataset6 = [
        {deskname : '23C', state : 1 },{deskname : '23D', state : 1 },
        {deskname : '24C', state : 1 },{deskname : '24D', state : 1 },
        {deskname : '25C', state : 1 },{deskname : '25D', state : 1 },
        {deskname : '26C', state : 1 },{deskname : '26D', state : 1 },
        {deskname : '27C', state : 1 },{deskname : '27D', state : 1 },
        {deskname : '28C', state : 1 },{deskname : '28D', state : 1 },
        {deskname : '29C', state : 1 },{deskname : '29D', state : 1 },
        {deskname : '30C', state : 1 },{deskname : '30D', state : 1 },
        {deskname : '31C', state : 1 },{deskname : '31D', state : 1 },
        {deskname : '32C', state : 1 },{deskname : '32D', state : 1 },
        {deskname : '33C', state : 1 },{deskname : '33D', state : 1 }

    ];
    dataset7 = [
        {deskname : '34A', state : 1 },{deskname : '34B', state : 1 },
        {deskname : '35A', state : 1 },{deskname : '35B', state : 1 },
        {deskname : '36A', state : 1 },{deskname : '36B', state : 1 },
        {deskname : '37A', state : 1 },{deskname : '37B', state : 1 },
        {deskname : '38A', state : 1 },{deskname : '38B', state : 1 },
        {deskname : '39A', state : 1 },{deskname : '39B', state : 1 },
        {deskname : '40A', state : 1 },{deskname : '40B', state : 1 },
        {deskname : '41A', state : 1 },{deskname : '41B', state : 1 },
        {deskname : '42A', state : 1 },{deskname : '42B', state : 1 },
        {deskname : '43A', state : 1 },{deskname : '43B', state : 1 },
        {deskname : '44A', state : 1 },{deskname : '44B', state : 1 }
    ];
    dataset8 = [
        {deskname : '34C', state : 1 },{deskname : '34D', state : 1 },
        {deskname : '35C', state : 1 },{deskname : '35D', state : 1 },
        {deskname : '36C', state : 1 },{deskname : '36D', state : 1 },
        {deskname : '37C', state : 1 },{deskname : '37D', state : 1 },
        {deskname : '38C', state : 1 },{deskname : '38D', state : 1 },
        {deskname : '39C', state : 1 },{deskname : '39D', state : 1 },
        {deskname : '40C', state : 1 },{deskname : '40D', state : 1 },
        {deskname : '41C', state : 1 },{deskname : '41D', state : 1 },
        {deskname : '42C', state : 1 },{deskname : '42D', state : 1 },
        {deskname : '43C', state : 1 },{deskname : '43D', state : 1 },
        {deskname : '44C', state : 1 },{deskname : '44D', state : 1 }
    ];

    dataset9 = [
        {deskname : '45A', state : 1 },{deskname : '45B', state : 1 },
        {deskname : '46A', state : 1 },{deskname : '46B', state : 1 },
        {deskname : '47A', state : 1 },{deskname : '47B', state : 1 },
        {deskname : '48A', state : 1 },{deskname : '48B', state : 1 },
        {deskname : '49A', state : 1 },{deskname : '49B', state : 1 },
        {deskname : '50A', state : 1 },{deskname : '50B', state : 1 },
        {deskname : '51A', state : 1 },{deskname : '51B', state : 1 },
        {deskname : '52A', state : 1 },{deskname : '52B', state : 1 },
        {deskname : '53A', state : 1 },{deskname : '53B', state : 1 }
    ];
    dataset10 = [
        {deskname : '45C', state : 1 },{deskname : '45D', state : 1 },
        {deskname : '46C', state : 1 },{deskname : '46D', state : 1 },
        {deskname : '47C', state : 1 },{deskname : '47D', state : 1 },
        {deskname : '48C', state : 1 },{deskname : '48D', state : 1 },
        {deskname : '49C', state : 1 },{deskname : '49D', state : 1 },
        {deskname : '50C', state : 1 },{deskname : '50D', state : 1 },
        {deskname : '51C', state : 1 },{deskname : '51D', state : 1 },
        {deskname : '52C', state : 1 },{deskname : '52D', state : 1 },
        {deskname : '53C', state : 1 },{deskname : '53D', state : 1 }


    ];
    dataset11 = [

        {deskname : '54A', state : 1 },{deskname : '54B', state : 1 },
        {deskname : '55A', state : 1 },{deskname : '55B', state : 1 },
        {deskname : '56A', state : 1 },{deskname : '56B', state : 1 },
        {deskname : '57A', state : 1 },{deskname : '57B', state : 1 },
        {deskname : '58A', state : 1 },{deskname : '58B', state : 1 },
        {deskname : '59A', state : 1 },{deskname : '59B', state : 1 },
        {deskname : '60A', state : 1 },{deskname : '60B', state : 1 },
        {deskname : '61A', state : 1 },{deskname : '61B', state : 1 }
    ];
    dataset12= [

        {deskname : '54C', state : 1 },{deskname : '54D', state : 1 },
        {deskname : '55C', state : 1 },{deskname : '55D', state : 1 },
        {deskname : '56C', state : 1 },{deskname : '56D', state : 1 },
        {deskname : '57C', state : 1 },{deskname : '57D', state : 1 },
        {deskname : '58C', state : 1 },{deskname : '58D', state : 1 },
        {deskname : '59C', state : 1 },{deskname : '59D', state : 1 },
        {deskname : '60C', state : 1 },{deskname : '60D', state : 1 },
        {deskname : '61C', state : 1 },{deskname : '61D', state : 1 }
    ];
    dataset13 = [
        {deskname : '62A', state : 1 },{deskname : '62B', state : 1 },
        {deskname : '63A', state : 1 },{deskname : '63B', state : 1 },
        {deskname : '64A', state : 1 },{deskname : '64B', state : 1 },
        {deskname : '65A', state : 1 },{deskname : '65B', state : 1 },
        {deskname : '66A', state : 1 },{deskname : '66B', state : 1 },
        {deskname : '67A', state : 1 },{deskname : '67B', state : 1 }
    ];
    dataset14= [

        {deskname : '62C', state : 1 },{deskname : '62D', state : 1 },
        {deskname : '63C', state : 1 },{deskname : '63D', state : 1 },
        {deskname : '64C', state : 1 },{deskname : '64D', state : 1 },
        {deskname : '65C', state : 1 },{deskname : '65D', state : 1 },
        {deskname : '66C', state : 1 },{deskname : '66D', state : 1 },
        {deskname : '67C', state : 1 },{deskname : '67D', state : 1 },
    ];

    dataset15 = [

        {deskname : '68A', state : 1 },{deskname : '68B', state : 1 },
        {deskname : '69A', state : 1 },{deskname : '69B', state : 1 },
        {deskname : '70A', state : 1 },{deskname : '70B', state : 1 },
        {deskname : '71A', state : 1 },{deskname : '71B', state : 1 },
        {deskname : '72A', state : 1 },{deskname : '72B', state : 1 }

    ];
    dataset16= [
        {deskname : '68C', state : 1 },{deskname : '68D', state : 1 },
        {deskname : '69C', state : 1 },{deskname : '69D', state : 1 },
        {deskname : '70C', state : 1 },{deskname : '70D', state : 1 },
        {deskname : '71C', state : 1 },{deskname : '71D', state : 1 },
        {deskname : '72C', state : 1 },{deskname : '72D', state : 1 }
    ];
    dataset17 = [
        {deskname : '73A', state : 1 },{deskname : '73B', state : 1 },
        {deskname : '74A', state : 1 },{deskname : '74B', state : 1 },
        {deskname : '75A', state : 1 },{deskname : '75B', state : 1 },
        {deskname : '76A', state : 1 },{deskname : '76B', state : 1 }
    ];
    dataset18 = [
        {deskname : '73C', state : 1 },{deskname : '73D', state : 1 },
        {deskname : '74C', state : 1 },{deskname : '74D', state : 1 },
        {deskname : '75C', state : 1 },{deskname : '75D', state : 1 },
        {deskname : '76C', state : 1 },{deskname : '76D', state : 1 }
    ];
    
    drawRect(dataset1, 10, 30);
    drawRect(dataset2, 32, 30);
    drawRect(dataset3, 54, 30);
    drawRect(dataset4, 78, 30);
    drawRect(dataset5, 100, 30);
    drawRect(dataset6, 122, 30);
    drawRect(dataset7, 146, 30);
    drawRect(dataset8, 168, 30);
    drawRect(dataset9, 190, 30);
    drawRect(dataset10, 214, 30);
    drawRect(dataset11, 236, 30);
    drawRect(dataset12, 258, 30);
    drawRect(dataset13, 282, 30);
    drawRect(dataset14, 304, 30);
    drawRect(dataset15, 326, 30);
    drawRect(dataset16, 350, 30);
    drawRect(dataset17, 372, 30);
    drawRect(dataset18, 394, 30);


}

function drawRect(dataobj, x, y){
    g = svg.append("g")
        .attr("transform", "translate(" + padding.top +"," +padding.left +")");
    gs = g.selectAll("rect").data(dataobj).enter().append("g");
    gs.append("rect")
        .attr("x", function (d, i) {
            return i*y;

        })
        .attr("y", function (d) {
            return x;
        })
        .attr("width", 15)
        .attr("height", 20)
        .attr("id", function (d) {
            return d.deskname;
        })
        .attr("fill", function (d) {
            return "#4788fb";
        })
        .on("mouseover",function (d) {
            var username = $(this).attr("username");
            var stuId = $(this).attr("stuId");
            var bookTime = $(this).attr("bookTime");
            if (stuId != null) {
                tooltip.html("姓名："+username+"<br>学号："+ stuId+"<br>"+"开始时间："+bookTime)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity",1.0);
            }
        })
        .on("mousemove",function(d){
            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px");
        })
        .on("mouseout",function(d){
            tooltip.style("opacity",0.0);
        });
    gs.append("text")
        .attr("x", function (d, i) {
            return i*y;
        })
        .attr("y", function (d) {
            return x;
        })
        .attr("dx", 1)
        .attr("dy", 12)
        .attr("font-size" , 8)
        .attr("color", "#fff")
        .text(function (d) {
            return d.deskname;
        })
        .on("mouseover",function (d) {
            var username = $('#'+d.deskname).attr("username");
            var stuId = $('#'+d.deskname).attr("stuId");
            var bookTime = $('#'+d.deskname).attr("bookTime");
            if (stuId != null) {
                tooltip.html("姓名："+username+"<br>学号："+ stuId+"<br>"+"开始时间："+bookTime)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity",1.0);
            }
        })
        .on("mousemove",function(d){
            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px");
        })
        .on("mouseout",function(d){
            tooltip.style("opacity",0.0);
        });
}
