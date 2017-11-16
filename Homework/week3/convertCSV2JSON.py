import csv
import json

csvfile = open('bitcoin_price.csv', 'r')
jsonfile = open('bitcoin_price.json', 'w')

headers = ("Date","Marketcap")
reader = csv.DictReader( csvfile, headers)
data =[]
for row in reader:
    data.append(row)
json.dump(data, jsonfile)
