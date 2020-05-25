'''
1.该脚本的功能是将爬虫获取的数据更新到shp文件的属性表中，使用的arcgis提供的arcpy模块
2.在arcgis10.2中需要使用python2来运行！！！
3.如果有文字编码方面的错误，可以删除代码中的所有非ascii字符（包括注释），再尝试运行
'''

#-*-coding:utf-8-*-

import arcpy
import json

WORK_PATH = "C:\\Users\\zm\\Desktop\\map_data\\mxd\\world\\"
# json数据路径
json_path = WORK_PATH + "now_data_world.json"
# shp文件的属性数据路径
dbf_path = WORK_PATH + "admin.dbf"


# 读取爬取的数据
data_json = ""
with open(json_path, "r") as f:
    data_json = f.read()
data = json.loads(data_json)

# 更新到属性表中
cursor = arcpy.UpdateCursor(dbf_path)
for row in cursor:
    nation_name = row.getValue("GMI_CNTRY")
    confirm_nums = -1
    for item in data:
        if item["countryShortCode"] == nation_name:
            confirm_nums = item["currentConfirmedCount"]
            break
    if confirm_nums >= 0:
        row.setValue("CONFIRM", confirm_nums)
        cursor.updateRow(row)
    else:
        row.setValue("CONFIRM", 0)
        cursor.updateRow(row)
        print("no data")

del row
del cursor

print("successful")