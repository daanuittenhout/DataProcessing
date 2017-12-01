import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

headers = ("date","Netherlands","Belgium", "Luxembourg", "NetherlandsGNI","BelgiumGNI", "LuxembourgGNI","NetherlandsGNIPPP","BelgiumGNIPPP", "LuxembourgGNIPPP" )
reader = csv.DictReader( csvfile, headers)
data =[]
for row in reader:
    data.append(row)
json.dump(data, jsonfile)
