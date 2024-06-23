# Exercicio 1

## 1.1

- Foi feito um script para converter o dataset de csv para json
- Decidi alterar o nome do campo "idcontrato" para _id usando o ctrl+f e replace

- Para importar o ficheiro json para o mongoDB
<code>
    docker run -d -p 27017:27017 --name ex1 mongo
    docker cp contratos.json ex1:/tmp
    docker exec -it ex1 bash
    mongoimport -d contratos -c contratos /tmp/contratos.json --jsonArray
</code>

- Para testar se tudo correu bem fiz
<code>
    docker exec -it ex1 mongosh
    > show dbs
        admin      40.00 KiB
        config     12.00 KiB
        contratos   5.78 MiB
        local      40.00 KiB
    > use contratos
    > show collections
        contratos
</code>

- Assim aseguramos a presistência dos dados