import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

headers = ("year", "datetime", "city", "state", "shape", "duration", "comments", "latitude", "longitude")
reader = csv.DictReader( csvfile, headers)
data =[]
for row in reader:
    data.append(row)
json.dump(data, jsonfile)
