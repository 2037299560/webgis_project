/**
 * 从网络接口获取数据构建表格
 */

$.ajaxSettings.async = false;
WORD_REAL_TIME_URL = "https://covid19.zhaodeezhu.com/api/covid19/getRealTimeForeignData"


// 从json文件获取数据，直接返回js对象
function get_data(file_name) {
    var file_content = null;
    $.get(file_name, function(result, status) {
        if(status == "success") {
            file_content = result.data;
        } else {
            console.log(status + "获取数据失败");
        }
    });
    return file_content;
}

// 筛选需要的数据
function build_data(orgin_data) {
    // console.log(orgin_data);
    orgin_data.sort(sortByDeadCount);
    function sortByDeadCount(a, b) {
        return b.deadCount - a.deadCount;
    }
    return orgin_data;
}

// 创建表格
function create_table(data) {

    var table = document.createElement("table");
    table.setAttribute("class", "table");

    // 设置标题
    var title = document.createElement("caption");
    title.innerText = "疫情严重程度排行(按死亡人数)"
    table.appendChild(title);

    // 表头
    var thead = document.createElement("thead");
    var th1 = document.createElement("th");
    th1.innerText = "国家";
    var th2 = document.createElement("th");
    th2.innerText = "所属大洲";
    var th3 = document.createElement("th");
    th3.innerText = "死亡人数";
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    table.appendChild(thead);

    // 表格主体
    var tbody = document.createElement("tbody");
    for(var i = 0; i < data.length; ++ i) {
        var tr = document.createElement("tr")
        if(i < 3) {
            tr.setAttribute("class", "danger");
        } else if(i >=3 && i < 10) {
            tr.setAttribute("class", "warning");
        } else if(i >= 10 && i < 100){
            tr.setAttribute("class", "active");
        } else {
            tr.setAttribute("class", "success");
        }
        var str = "";
        str += "<td>" + data[i].provinceName + "</td>";
        str += "<td>" + data[i].continents + "</td>";
        str += "<td>" + data[i].deadCount + "</td>";
        tr.innerHTML = str;
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
}



var fatherElement = document.getElementById("data-table");

var orgin_data = get_data(WORD_REAL_TIME_URL);
var data = build_data(orgin_data);
var table = create_table(data);
fatherElement.appendChild(table);

