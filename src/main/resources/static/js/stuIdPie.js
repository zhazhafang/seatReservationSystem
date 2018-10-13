
var svgPie = d3.select("#stuIdPie").append("svg").attr("width", "310").attr("height", "260");
var padding = {top : 20, bottom : 20, left: 20, right: 20};
var tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("opacity",0.0);
var g;
var gs;
var width = 280;
var height = 260;
var total = 0;
var stuIdData = [];
var stuIdname = [];
function inituserData() {
    $.post("/user",{
        // param : "203"
    }, function (data, status) {
        total = data.total;
        stuIdname = data.unameList;
        stuIdData = data.unameTotal;
        drawPie(stuIdData, stuIdname, total);
    });
}
function getStuIdPie() {
    inituserData();



}

function drawPie(dataobj,stuIdname ,total, x, y){
    g = svgPie.append("g")
        .attr("transform", "translate(" + padding.top +"," +padding.left +")");
    var colorScale = d3.scaleOrdinal()
        .domain(d3.range(dataobj.length))
        .range(d3.schemeCategory10);
    var pie = d3.pie();
    var innerRadius = 0;
    var outerRadius = 80;
    var arcGenerator = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    var pieData = pie(dataobj);
    svgPie.append('g').attr("transform", "translate(" + padding.top +"," + padding.left+")")
        .selectAll(".g")
        .data(pieData).enter().append("g")
        .attr("transform", "translate(" + width/2 +","+height/2+")")
        .append("path")
        .attr("d", function (d) {
            return arcGenerator(d);
        })
        .attr("fill", function (d, i) {
            return colorScale(i);
        })
        .on("mouseover",function (d, i) {
            var username = stuIdname[i];

            tooltip.html("姓名："+username+"<br>学号数量："+ d.data+"<br>占比：" + (d.data*100/total).toFixed(1) +"%<br>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);

        })
        .on("mousemove",function(d){
            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px");
        })
        .on("mouseout",function(d){
            tooltip.style("opacity",0.0);
        });

    svgPie.append('g').attr("transform", "translate(" + padding.top +","+ padding.left+")")
        .selectAll(".g")
        .data(pieData).enter().append("g")
        .attr("transform", "translate(" +width/2 +","+ height/2 +")")
        .append("text")
        .attr("transform", function (d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d, i) {
            return  stuIdname[i].substring(0,1);
        })
        .on("mouseover",function (d, i) {
            var username = stuIdname[i];

            tooltip.html("姓名："+username+"<br>学号数量："+ d.data+"<br>占比：" + (d.data*100/total).toFixed(1) +"%<br>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);

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
