import json

def add_unique_periodos(data):
    valid_compositores = [
        composer for composer in data.get("compositores", [])
        if "periodo" in composer and isinstance(composer["periodo"], str)
    ]
    
    periodos = [composer["periodo"] for composer in valid_compositores]
    unique_periodos = list(set(periodos))

    periodo_entries = [{"id": f"P{index+1}", "periodo": periodo} for index, periodo in enumerate(unique_periodos)]
    data["periodos"] = periodo_entries

    return data

def read_json_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def write_json_file(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

data = read_json_file('./compositores.json')
updated_data = add_unique_periodos(data)
write_json_file('./compositores.json', updated_data)

