import requests
import openpyxl
import json
import datetime
import time

# 获取url所指向的内容
def get_text(url):
    try:
        res = requests.get(url)
        res.raise_for_status()
        return res.text
    except:
        print('获取数据失败...')
        return None

# 清洗数据，获取自己所需要的
def data_extract(data, mode, date):
    try:
        result = []
        desc = data['newslist'][0]['desc']
        for name in mode:
            result.append(desc.get(name, '    '))
        result[0] = date

        return result
    except:
        print('清洗数据失败 %s' % date)
        return None

# 获取最终的数据
def get_data(url, mode):
    data = []
    data.append(mode)

    be = datetime.datetime(2020, 2, 12)     # 起始时间
    end = datetime.datetime(2020, 4, 1)    # 结束时间
    step = datetime.timedelta(days = 1)    

    while be <= end:
        time.sleep(7)
        # 构造url
        url_date = be.strftime('%Y-%m-%d')
        url = url[0:-10] + url_date

        # 获取当天数据
        data_json = get_text(url)
        data_all = json.loads(data_json)
        # print(data_all)
        data_day = data_extract(data_all, mode, url_date)     # 提取所需要的数据
        if not data_day:
            be += step
            print("data_day : ", data_day)
            continue

        # 汇总至全部数据中
        data.append(data_day)
        print(url_date + "采集完成....")

        # 下一天
        be += step
    
    return data


if __name__ == "__main__":
    url = r"http://api.tianapi.com/txapi/ncov/index?key=e8b001a789f81332f4bdd195d2fab27c&date=2020-02-12"
    mode = ['createTime', 'confirmedCount', 'currentConfirmedCount', 'suspectedCount', 'curedCount', 'deadCount', 'seriousCount', 'suspectedIncr', 'confirmedIncr', 'curedIncr', 'deadIncr']
    items = ['时间', '累计确诊', '现存确诊', '现存疑似', '累计治愈', '累计死亡', '现存重症', '新增疑似', '较昨日累计确诊', '较昨日新增治愈', '较昨日新增死亡']
    data = get_data(url, mode)
    data[0] = items
    with open('app/data/data_days.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False, indent=4))
    

