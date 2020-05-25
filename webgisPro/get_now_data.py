'''
1.获取最新的世界疫情数据
'''

import json
from get_time_data import getContext


if __name__ == "__main__":
    url = "https://covid19.zhaodeezhu.com/api/covid19/getRealTimeForeignData"
    data_json = getContext(url, {})
    data = json.loads(data_json)
    data = data["data"]
    data_json = json.dumps(data, ensure_ascii=False)
    with open('data/now_data_world.json', "w", encoding="utf-8") as f:
        f.write(data_json)
