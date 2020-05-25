'''
1.该脚本使用疫情数据接口获取世界疫情的时间序列数据
2.获取的数据囊括的时间范围为03-34到05-19
3.仅能获取国家级别的数据
'''

import requests
import json
import datetime
import time

# 获取url所对应的内容
def getContext(url, data):
    try:
        res = requests.get(url, params=data)
        res.raise_for_status()
        return res.text
    except:
        print('访问异常...')

# 获取json数据(时间序列）
def getData(begin_time, end_time, step, url, sleep_time = 3):
    data = {}
    while begin_time < end_time:
        # 构造url
        str_date = begin_time.strftime("%Y-%m-%d")
        params = {
            'locationType': 'foreign',
            'curdDate': str_date
        }

        # 获取数据
        str_json = getContext(url, params)
        data[str_date] = json.loads(str_json)["data"]
        print(str_date + "  已爬取完毕...")
        begin_time += step
        time.sleep(sleep_time)
    return data

if __name__ == "__main__":
    begin_time = datetime.datetime(2020, 3, 24)
    end_time = datetime.datetime.now()
    step = datetime.timedelta(days = 1)

    # 接口url
    url = 'https://covid19.zhaodeezhu.com/api/covid19/getHistoryData'

    # 获取数据
    data = getData(begin_time, end_time, step, url)
    json_text = json.dumps(data, ensure_ascii=False)
    print("数据爬取完毕....")

    # 保存成json文件
    with open("data/time_data_world.json", "w", encoding="utf-8") as f:
        f.write(json_text)
    print("数据保存完毕....")