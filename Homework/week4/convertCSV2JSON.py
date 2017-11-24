import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data1.json', 'w')

headers = ("country","popgrowth","gdpgrowth","population")
reader = csv.DictReader( csvfile, headers)
data =[]
for row in reader:
    data.append(row)
json.dump(data, jsonfile)
