var convertToMillis = function(time) {
    var format = d3.time.format.iso;
    var d = new Date(format.parse(time));
    return d.getTime()
}

var getDateFromMillis = function(time) {
    var day = 86400000;
    var remainder = time % day;
    return new Date(time - remainder);


}

var getLastFriday = function() {
    return new Date(d3.time.friday.offset(new Date(), -2)).getTime();
}

var parseData = function(data) {
    var _data = {};

    data.forEach(function(curr, index, arr) {
        var date = getDateFromMillis(convertToMillis(curr.createdAt));
        if (_data[date] === undefined) {
            _data[date] = {
                "total": curr.estimate
            }
        } else {
            _data[date].total += curr.estimate
        }
    })
    console.log(_data)
}


parseData(data);

var drawAxis = function() {
    var width = 30,
        height = 20;
    var x_scale = d3.scale.linear()
        .range([0, width])
        .domain([0, temps.length]);

    var y_scale = d3.scale.linear()
        .range([height, 0])
        .domain([d3.min(temps), d3.max(temps)]);
}

var drawbars = function() {

    var draw_line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) {
            return x_scale(i);
        })
        .y(function(d) {
            return y_scale(d);
        });

    d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("path").datum(temps)
        .attr("d", draw_line);

}