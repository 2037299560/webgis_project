/**
 * 根据2020-03-24至2020-05-20期间的疫情数据使用echarts绘制图表
 */
$.ajaxSettings.async = false;

function get_history_data(url) {
    var res = null;
    $.get(url, function(result, status) {
        res = result.data;
    });
    return res;
}

var api = "https://covid19.zhaodeezhu.com/api/covid19/getHistoryTypeCount?locationType=foreign&curdDate=2020-";
var datas = [];
var confirm = [];
var dead = [];
var cure = [];
var time = [];

for(var i = 24; i <= 31; ++ i) {
    var day = i.toString();
    var url = api + "3-" + day;
    var data = get_history_data(url)[0];
    data.time = "3-" + day;
    datas.push(data);
}
for(var i = 1; i <= 30; ++ i) {
    var day = i.toString();
    var url = api + "4-" + day;
    var data = get_history_data(url)[0];
    data.time = "4-" + day;
    datas.push(data);
}
for(var i = 1; i <= 20; ++ i) {
    var day = i.toString();
    var url = api + "5-" + day;
    var data = get_history_data(url)[0];
    data.time = "5-" + day;
    datas.push(data);
}

for(var i = 0; i < datas.length; ++ i) {
    var data = datas[i];
    if(i % 5 == 0) {
        confirm.push(data.confirmedCount);
        dead.push(data.deadCount);
        cure.push(data.curedCount);
        time.push(data.time);
    }
}


var dom = document.getElementById("chart");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    title: {
        text: '世界疫情发展图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['确诊人数', '死亡人数', '治愈人数']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: time,
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '确诊人数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: confirm,
        },
        {
            name: '死亡人数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: dead,
        },
        {
            name: '治愈人数',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: cure,
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}