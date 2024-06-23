import csv
import json

def read_csv(filename):
    data = []
    with open(filename, 'r', encoding='utf-8') as file:
        lines = csv.DictReader(file, delimiter=';')
        for row in lines:
            for key, value in row.items():
                if '\n' in value:
                    row[key] = value.replace('\n', ' ')
            data.append(row)
    return data

def convert_json(fcsv, json):
    with open(json, 'w', encoding='utf-8') as file:
        json.dump(fcsv, file, ensure_ascii=False, indent=4)


fcsv = read_csv('contratos2024.csv')
convert_json(fcsv, 'contratos.json')
