//china.js
function initData() {
    $.post("/showOther", {
        room : "203"
    },function (data, status) {
        for (var i=0; i<data.length; i++){
            $('#'+data[i].seatNo).attr("fill", "#CC3333")
                .attr("username", data[i].etagId)
                .attr("stuId", data[i].etagMd5)
                .attr("bookTime", data[i].statTime);
        }
        $.post("/show",{
            room : "203"
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
var svg = d3.select("#svg").append("svg").attr("width", "620").attr("height", "600");
var padding = {top : 20, bottom : 20, left: 20, right: 20};
var tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("opacity",0.0);
var g;
var gs;
function show() {
initData();

    dataset1 = [
        {deskname : '70A', state : 1 },{deskname : '70B', state : 1 },
        {deskname : '69A', state : 1 },{deskname : '69B', state : 1 },
        {deskname : '68A', state : 1 },{deskname : '68B', state : 1 },
        {deskname : '67A', state : 1 },{deskname : '67B', state : 1 },
        {deskname : '66A', state : 1 },{deskname : '66B', state : 1 },
        {deskname : '65A', state : 1 },{deskname : '65B', state : 1 },
        {deskname : '64A', state : 1 },{deskname : '64B', state : 1 },
        {deskname : '63A', state : 1 },{deskname : '63B', state : 1 },
        {deskname : '62A', state : 1 },{deskname : '62B', state : 1 },
        {deskname : '61A', state : 1 },{deskname : '61B', state : 1 },
        {deskname : '60A', state : 1 },{deskname : '60B', state : 1 },
        {deskname : '59A', state : 1 },{deskname : '59B', state : 1 }
    ];
    dataset2 = [
        {deskname : '70C', state : 1 },{deskname : '70D', state : 1 },
        {deskname : '69C', state : 1 },{deskname : '69D', state : 1 },
        {deskname : '68C', state : 1 },{deskname : '68D', state : 1 },
        {deskname : '67C', state : 1 },{deskname : '67D', state : 1 },
        {deskname : '66C', state : 1 },{deskname : '66D', state : 1 },
        {deskname : '65C', state : 1 },{deskname : '65D', state : 1 },
        {deskname : '64C', state : 1 },{deskname : '64D', state : 1 },
        {deskname : '63C', state : 1 },{deskname : '63D', state : 1 },
        {deskname : '62C', state : 1 },{deskname : '62D', state : 1 },
        {deskname : '61C', state : 1 },{deskname : '61D', state : 1 },
        {deskname : '60C', state : 1 },{deskname : '60D', state : 1 },
        {deskname : '59C', state : 1 },{deskname : '59D', state : 1 }
    ];
    dataset3 = [
        {deskname : '70E', state : 1 },{deskname : '70F', state : 1 },
        {deskname : '69E', state : 1 },{deskname : '69F', state : 1 },
        {deskname : '68E', state : 1 },{deskname : '68F', state : 1 },
        {deskname : '67E', state : 1 },{deskname : '67F', state : 1 },
        {deskname : '66E', state : 1 },{deskname : '66F', state : 1 },
        {deskname : '65E', state : 1 },{deskname : '65F', state : 1 },
        {deskname : '64E', state : 1 },{deskname : '64F', state : 1 },
        {deskname : '63E', state : 1 },{deskname : '63F', state : 1 },
        {deskname : '62E', state : 1 },{deskname : '62F', state : 1 },
        {deskname : '61E', state : 1 },{deskname : '61F', state : 1 },
        {deskname : '60E', state : 1 },{deskname : '60F', state : 1 },
        {deskname : '59E', state : 1 },{deskname : '59F', state : 1 }
    ];
    dataset4 = [
        {deskname : '58A', state : 1 },{deskname : '58B', state : 1 },
        {deskname : '57A', state : 1 },{deskname : '57B', state : 1 },
        {deskname : '56A', state : 1 },{deskname : '56B', state : 1 },
        {deskname : '55A', state : 1 },{deskname : '55B', state : 1 },
        {deskname : '54A', state : 1 },{deskname : '54B', state : 1 },
        {deskname : '53A', state : 1 },{deskname : '53B', state : 1 },
        {deskname : '52A', state : 1 },{deskname : '52B', state : 1 },
        {deskname : '51A', state : 1 },{deskname : '51B', state : 1 },
        {deskname : '50A', state : 1 },{deskname : '50B', state : 1 },
        {deskname : '49A', state : 1 },{deskname : '49B', state : 1 },
        {deskname : '48A', state : 1 },{deskname : '48B', state : 1 },
        {deskname : '47A', state : 1 },{deskname : '47B', state : 1 }
    ];
    dataset5 = [
        {deskname : '58C', state : 1 },{deskname : '58D', state : 1 },
        {deskname : '57C', state : 1 },{deskname : '57D', state : 1 },
        {deskname : '56C', state : 1 },{deskname : '56D', state : 1 },
        {deskname : '55C', state : 1 },{deskname : '55D', state : 1 },
        {deskname : '54C', state : 1 },{deskname : '54D', state : 1 },
        {deskname : '53C', state : 1 },{deskname : '53D', state : 1 },
        {deskname : '52C', state : 1 },{deskname : '52D', state : 1 },
        {deskname : '51C', state : 1 },{deskname : '51D', state : 1 },
        {deskname : '50C', state : 1 },{deskname : '50D', state : 1 },
        {deskname : '49C', state : 1 },{deskname : '49D', state : 1 },
        {deskname : '48C', state : 1 },{deskname : '48D', state : 1 },
        {deskname : '47C', state : 1 },{deskname : '47D', state : 1 }
    ];
    dataset6 = [
        {deskname : '58E', state : 1 },{deskname : '58F', state : 1 },
        {deskname : '57E', state : 1 },{deskname : '57F', state : 1 },
        {deskname : '56E', state : 1 },{deskname : '56F', state : 1 },
        {deskname : '55E', state : 1 },{deskname : '55F', state : 1 },
        {deskname : '54E', state : 1 },{deskname : '54F', state : 1 },
        {deskname : '53E', state : 1 },{deskname : '53F', state : 1 },
        {deskname : '52E', state : 1 },{deskname : '52F', state : 1 },
        {deskname : '51E', state : 1 },{deskname : '51F', state : 1 },
        {deskname : '50E', state : 1 },{deskname : '50F', state : 1 },
        {deskname : '49E', state : 1 },{deskname : '49F', state : 1 },
        {deskname : '48E', state : 1 },{deskname : '48F', state : 1 },
        {deskname : '47E', state : 1 },{deskname : '47F', state : 1 }
    ];
    dataset7 = [
        {deskname : '46A', state : 1 },{deskname : '46B', state : 1 },
        {deskname : '45A', state : 1 },{deskname : '45B', state : 1 },
        {deskname : '44A', state : 1 },{deskname : '44B', state : 1 },
        {deskname : '43A', state : 1 },{deskname : '43B', state : 1 },
        {deskname : '42A', state : 1 },{deskname : '42B', state : 1 },
        {deskname : '41A', state : 1 },{deskname : '41B', state : 1 },
        {deskname : '40A', state : 1 },{deskname : '40B', state : 1 },
        {deskname : '39A', state : 1 },{deskname : '39B', state : 1 },
        {deskname : '38A', state : 1 },{deskname : '38B', state : 1 },
        {deskname : '37A', state : 1 },{deskname : '37B', state : 1 },
        {deskname : '36A', state : 1 },{deskname : '36B', state : 1 }
    ];
    dataset8 = [
        {deskname : '46C', state : 1 },{deskname : '46D', state : 1 },
        {deskname : '45C', state : 1 },{deskname : '45D', state : 1 },
        {deskname : '44C', state : 1 },{deskname : '44D', state : 1 },
        {deskname : '43C', state : 1 },{deskname : '43D', state : 1 },
        {deskname : '42C', state : 1 },{deskname : '42D', state : 1 },
        {deskname : '41C', state : 1 },{deskname : '41D', state : 1 },
        {deskname : '40C', state : 1 },{deskname : '40D', state : 1 },
        {deskname : '39C', state : 1 },{deskname : '39D', state : 1 },
        {deskname : '38C', state : 1 },{deskname : '38D', state : 1 },
        {deskname : '37C', state : 1 },{deskname : '37D', state : 1 },
        {deskname : '36C', state : 1 },{deskname : '36D', state : 1 }

    ];
    dataset9 = [
        {deskname : '46E', state : 1 },{deskname : '46F', state : 1 },
        {deskname : '45E', state : 1 },{deskname : '45F', state : 1 },
        {deskname : '44E', state : 1 },{deskname : '44F', state : 1 },
        {deskname : '43E', state : 1 },{deskname : '43F', state : 1 },
        {deskname : '42E', state : 1 },{deskname : '42F', state : 1 },
        {deskname : '41E', state : 1 },{deskname : '41F', state : 1 },
        {deskname : '40E', state : 1 },{deskname : '40F', state : 1 },
        {deskname : '39E', state : 1 },{deskname : '39F', state : 1 },
        {deskname : '38E', state : 1 },{deskname : '38F', state : 1 },
        {deskname : '37E', state : 1 },{deskname : '37F', state : 1 },
        {deskname : '36E', state : 1 },{deskname : '36F', state : 1 }

    ];
    dataset10 = [
        {deskname : '35A', state : 1 },{deskname : '35B', state : 1 },
        {deskname : '34A', state : 1 },{deskname : '34B', state : 1 },
        {deskname : '33A', state : 1 },{deskname : '33B', state : 1 },
        {deskname : '32A', state : 1 },{deskname : '32B', state : 1 },
        {deskname : '31A', state : 1 },{deskname : '31B', state : 1 },
        {deskname : '30A', state : 1 },{deskname : '30B', state : 1 },
        {deskname : '29A', state : 1 },{deskname : '29B', state : 1 },
        {deskname : '28A', state : 1 },{deskname : '28B', state : 1 },
        {deskname : '27A', state : 1 },{deskname : '27B', state : 1 },
        {deskname : '26A', state : 1 },{deskname : '26B', state : 1 },
        {deskname : '25A', state : 1 },{deskname : '25B', state : 1 },
    ];
    dataset11 = [
        {deskname : '35C', state : 1 },{deskname : '35D', state : 1 },
        {deskname : '34C', state : 1 },{deskname : '34D', state : 1 },
        {deskname : '33C', state : 1 },{deskname : '33D', state : 1 },
        {deskname : '32C', state : 1 },{deskname : '32D', state : 1 },
        {deskname : '31C', state : 1 },{deskname : '31D', state : 1 },
        {deskname : '30C', state : 1 },{deskname : '30D', state : 1 },
        {deskname : '29C', state : 1 },{deskname : '29D', state : 1 },
        {deskname : '28C', state : 1 },{deskname : '28D', state : 1 },
        {deskname : '27C', state : 1 },{deskname : '27D', state : 1 },
        {deskname : '26C', state : 1 },{deskname : '26D', state : 1 },
        {deskname : '25C', state : 1 },{deskname : '25D', state : 1 },
    ];
    dataset12 = [
        {deskname : '35E', state : 1 },{deskname : '35F', state : 1 },
        {deskname : '34E', state : 1 },{deskname : '34F', state : 1 },
        {deskname : '33E', state : 1 },{deskname : '33F', state : 1 },
        {deskname : '32E', state : 1 },{deskname : '32F', state : 1 },
        {deskname : '31E', state : 1 },{deskname : '31F', state : 1 },
        {deskname : '30E', state : 1 },{deskname : '30F', state : 1 },
        {deskname : '29E', state : 1 },{deskname : '29F', state : 1 },
        {deskname : '28E', state : 1 },{deskname : '28F', state : 1 },
        {deskname : '27E', state : 1 },{deskname : '27F', state : 1 },
        {deskname : '26E', state : 1 },{deskname : '26F', state : 1 },
        {deskname : '25E', state : 1 },{deskname : '25F', state : 1 }

    ];
    dataset13 = [
        {deskname : '24A', state : 1 },{deskname : '24B', state : 1 },
        {deskname : '23A', state : 1 },{deskname : '23B', state : 1 },
        {deskname : '22A', state : 1 },{deskname : '22B', state : 1 },
        {deskname : '21A', state : 1 },{deskname : '21B', state : 1 },
        {deskname : '20A', state : 1 },{deskname : '20B', state : 1 },
        {deskname : '19A', state : 1 },{deskname : '19B', state : 1 },
        {deskname : '18A', state : 1 },{deskname : '18B', state : 1 },
        {deskname : '17A', state : 1 },{deskname : '17B', state : 1 },
        {deskname : '16A', state : 1 },{deskname : '16B', state : 1 },
        {deskname : '15A', state : 1 },{deskname : '15B', state : 1 },
        {deskname : '14A', state : 1 },{deskname : '14B', state : 1 },
        {deskname : '13A', state : 1 },{deskname : '13B', state : 1 }
    ];
    dataset14 = [
        {deskname : '24C', state : 1 },{deskname : '24D', state : 1 },
        {deskname : '23C', state : 1 },{deskname : '23D', state : 1 },
        {deskname : '22C', state : 1 },{deskname : '22D', state : 1 },
        {deskname : '21C', state : 1 },{deskname : '21D', state : 1 },
        {deskname : '20C', state : 1 },{deskname : '20D', state : 1 },
        {deskname : '19C', state : 1 },{deskname : '19D', state : 1 },
        {deskname : '18C', state : 1 },{deskname : '18D', state : 1 },
        {deskname : '17C', state : 1 },{deskname : '17D', state : 1 },
        {deskname : '16C', state : 1 },{deskname : '16D', state : 1 },
        {deskname : '15C', state : 1 },{deskname : '15D', state : 1 },
        {deskname : '14C', state : 1 },{deskname : '14D', state : 1 },
        {deskname : '13C', state : 1 },{deskname : '13D', state : 1 }

    ];
    dataset15 = [
        {deskname : '24E', state : 1 },{deskname : '24F', state : 1 },
        {deskname : '23E', state : 1 },{deskname : '23F', state : 1 },
        {deskname : '22E', state : 1 },{deskname : '22F', state : 1 },
        {deskname : '21E', state : 1 },{deskname : '21F', state : 1 },
        {deskname : '20E', state : 1 },{deskname : '20F', state : 1 },
        {deskname : '19E', state : 1 },{deskname : '19F', state : 1 },
        {deskname : '18E', state : 1 },{deskname : '18F', state : 1 },
        {deskname : '17E', state : 1 },{deskname : '17F', state : 1 },
        {deskname : '16E', state : 1 },{deskname : '16F', state : 1 },
        {deskname : '15E', state : 1 },{deskname : '15F', state : 1 },
        {deskname : '14E', state : 1 },{deskname : '14F', state : 1 },
        {deskname : '13E', state : 1 },{deskname : '13F', state : 1 }

    ];
    dataset16 = [
        {deskname : '12A', state : 1 },{deskname : '12B', state : 1 },
        {deskname : '11A', state : 1 },{deskname : '11B', state : 1 },
        {deskname : '10A', state : 1 },{deskname : '10B', state : 1 },
        {deskname : '9A', state : 1 },{deskname : '9B', state : 1 },
        {deskname : '8A', state : 1 },{deskname : '8B', state : 1 },
        {deskname : '7A', state : 1 },{deskname : '7B', state : 1 },
        {deskname : '6A', state : 1 },{deskname : '6B', state : 1 },
        {deskname : '5A', state : 1 },{deskname : '5B', state : 1 },
        {deskname : '4A', state : 1 },{deskname : '4B', state : 1 },
        {deskname : '3A', state : 1 },{deskname : '3B', state : 1 },
        {deskname : '2A', state : 1 },{deskname : '2B', state : 1 },
        {deskname : '1A', state : 1 },{deskname : '1B', state : 1 }
    ];
    dataset17= [
        {deskname : '12C', state : 1 },{deskname : '12D', state : 1 },
        {deskname : '11C', state : 1 },{deskname : '11D', state : 1 },
        {deskname : '10C', state : 1 },{deskname : '10D', state : 1 },
        {deskname : '9C', state : 1 },{deskname : '9D', state : 1 },
        {deskname : '8C', state : 1 },{deskname : '8D', state : 1 },
        {deskname : '7C', state : 1 },{deskname : '7D', state : 1 },
        {deskname : '6C', state : 1 },{deskname : '6D', state : 1 },
        {deskname : '5C', state : 1 },{deskname : '5D', state : 1 },
        {deskname : '4C', state : 1 },{deskname : '4D', state : 1 },
        {deskname : '3C', state : 1 },{deskname : '3D', state : 1 },
        {deskname : '2C', state : 1 },{deskname : '2D', state : 1 },
        {deskname : '1C', state : 1 },{deskname : '1D', state : 1 }

    ];
    dataset18 = [
        {deskname : '12E', state : 1 },{deskname : '12F', state : 1 },
        {deskname : '11E', state : 1 },{deskname : '11F', state : 1 },
        {deskname : '10E', state : 1 },{deskname : '10F', state : 1 },
        {deskname : '9E', state : 1 },{deskname : '9F', state : 1 },
        {deskname : '8E', state : 1 },{deskname : '8F', state : 1 },
        {deskname : '7E', state : 1 },{deskname : '7F', state : 1 },
        {deskname : '6E', state : 1 },{deskname : '6F', state : 1 },
        {deskname : '5E', state : 1 },{deskname : '5F', state : 1 },
        {deskname : '4E', state : 1 },{deskname : '4F', state : 1 },
        {deskname : '3E', state : 1 },{deskname : '3F', state : 1 },
        {deskname : '2E', state : 1 },{deskname : '2F', state : 1 },
        {deskname : '1E', state : 1 },{deskname : '1F', state : 1 }

    ];
    drawRect(dataset1, 10, 25);
    drawRect(dataset2, 32, 25);
    drawRect(dataset3, 54, 25);
    drawRect(dataset4, 78, 25);
    drawRect(dataset5, 100, 25);
    drawRect(dataset6, 122, 25);
    drawRect(dataset7, 146, 25);
    drawRect(dataset8, 168, 25);
    drawRect(dataset9, 190, 25);
    drawRect(dataset10, 214, 25);
    drawRect(dataset11, 236, 25);
    drawRect(dataset12, 258, 25);
    drawRect(dataset13, 282, 25);
    drawRect(dataset14, 304, 25);
    drawRect(dataset15, 326, 25);
    drawRect(dataset16, 350, 25);
    drawRect(dataset17, 372, 25);
    drawRect(dataset18, 394, 25);


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
