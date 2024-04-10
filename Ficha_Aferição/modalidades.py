import json
import requests

def get_pessoas(url):
    response = requests.get(url)
    if response.ok:
        return response.json()
    return [] 

def get_lista_participantes(data, sport):
    lista = []
    for entry in data:
        if sport in entry.get("desportos", []):
            lista.append({
                "_id" : entry["_id"],
                "nome" : entry['nome']
                })
    return lista

def build_modalidades(data):
    estrutura = []
    unique_sports = set()
    for entry in data:
        for sport in entry.get("desportos", []):
            if sport not in unique_sports:
                unique_sports.add(sport)
                estrutura.append({
                    "_id": len(estrutura),
                    "nome": sport,
                    "praticantes": get_lista_participantes(data, sport)
                })
    with open('./modalidades.json', 'w', encoding='utf-8') as file:
        json.dump(estrutura, file, ensure_ascii=False, indent=4)

def main():
    data = get_pessoas('http://localhost:7777/pessoas')
    if data:
        build_modalidades(data)

if __name__ == "__main__":
    main()
