import csv
import json

csv_file = 'pairings.csv'
json_file = 'flavour_pairings.json'

data = []

with open(csv_file, 'r') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        data.append(row)

with open(json_file, 'w') as file:
    json.dump(data, file, indent=4)
