import json


def gerar_lista_filmes(filepath):
    converted=[]
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f.readlines():
            data = json.loads(line)
            
            converted.append({
                'id': data['_id'].get('$oid', 'N/A'),
                'title': data.get('title', 'N/A'),
                'year': int(data.get('year', 'N/A')),
                'cast': fix_cast(data.get('cast', [])),
                'genres': data.get('genres', [])
            })
    return converted
                

def fix_cast(lista):
    i=0
    newlist=[]
    if len(lista)==0: return lista # Caso de não haver cast

    while i<len(lista):
        if lista[i].startswith('('):
            if not lista[i].endswith(')'): 
                j=i
                entry=""
                while not lista[j].endswith(')'):
                    if len(lista[j]): entry += lista[j] # para não haver "( Voice)" e sim "(Voice)"
                    else: entry += " " + lista[j]
                    j+=1
                i=j
                entry += " " + lista[j]
                newlist[-1] += " " + entry
            else: newlist.append(lista[i])
        else: newlist.append(lista[i])
        i+=1
    return newlist

def ator_pertence(lista_cast, ator):
    for entry in lista_cast:
        if ator == entry['name']: return True
    return False

def genre_pertence(lista_genre, genre):
    for entry in lista_genre:
        if genre == entry['name']: return True
    return False

def get_movies_actor(lista_filmes, ator):
    movies_participated=[]
    for entry in lista_filmes:
        if ator in entry['cast']:
            movies_participated.append(entry['title'])
    return movies_participated

def get_movies_genre(lista_filmes, genre):
    movies_genre=[]
    for entry in lista_filmes:
        if genre in entry['genres']:
            movies_genre.append(entry['title'])
    return movies_genre


def filtrar_nome(ator):
    splited = ator.split(" ")
    final=[]
    for parts in splited:
        if not parts.startswith('('):
            final.append(parts)
    return " ".join(final)

def gerar_lista_cast(lista_filmes):
    lista_cast=[]
    id=0
    for entry in lista_filmes:
        for ator in entry['cast']:
            if not ator_pertence(lista_cast, ator):
                lista_cast.append({
                    'id': id,
                    'name': filtrar_nome(ator),
                    'in_movies' : get_movies_actor(lista_filmes, ator)
                })
                id += 1
    return lista_cast

def gerar_lista_generos(lista_filmes):
    list_generos=[]
    id=0
    for entry in lista_filmes:
        for genre in entry['genres']:
            if not genre_pertence(list_generos, genre):
                list_generos.append({
                    'id' : id,
                    'name' : genre,
                    'movies' : get_movies_genre(lista_filmes, genre)
                })
                id += 1
    return list_generos

with open('lista_filmes.json', 'w') as ff:
    lista_filmes = gerar_lista_filmes('./filmes.json')
    json.dump(lista_filmes, ff, indent=4)
  
with open('lista_cast.json', 'w') as fc:
    lista_cast = gerar_lista_cast(lista_filmes)
    json.dump(lista_cast, fc, indent=4)

with open('lista_generos.json', 'w') as fg:
    lista_generos = gerar_lista_generos(lista_filmes)
    json.dump(lista_generos, fg, indent=4)

final = {
    'movies' : lista_filmes,
    'cast' : lista_cast,
    'genres' : lista_generos
}

with open('db.json', 'w') as db:
    json.dump(final, db, indent=4)
