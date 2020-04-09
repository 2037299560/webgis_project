'''
    将爬虫得来的json数据写入excel中
'''

import json
import openpyxl
import os

# 加载json文件
json_str = ""
with open('app/data/data_days.json', 'r', encoding='utf-8') as f:
    json_str = f.read()
data = json.loads(json_str)

# 写入excel文件
wb = openpyxl.Workbook()
sheet = wb.get_sheet_by_name(wb.get_sheet_names()[0])
for i in range(len(data)):
    for j in range(len(data[i])):
        sheet.cell(i + 1, j + 1, data[i][j])
wb.save("app/data/data.xlsx")