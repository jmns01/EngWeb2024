const http = require('http');
const url = require('url');
const fs = require('fs');


fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if(err){
        console.log("Erro ao ler json", err);
        return;
    }
    try{
        const data = JSON.parse(jsonString);

        const server = http.createServer((req, res) => {
            const parseUrl = url.parse(req.url, true);
            const path = parseUrl.pathname;
            const trimmedPath = path.replace(/^\/+|\/+$/g, '');
        
            //console.log(trimmedPath);
            if(trimmedPath == "alunos"){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<h1> Lista de Alunos </h1>');
                res.write('<ul>');
                data.alunos.forEach(aluno => {
                    res.write(`<li><a href="/alunos/${aluno.id}">${aluno.nome}</a></li>`);
                });
                res.write('</ul>');
                res.end();
            }
            else if (trimmedPath.startsWith('alunos/')) {
                const id = trimmedPath.split("/")[1]
                console.log(id);
                const aluno = data.alunos.find(a => a.id === id);
                const curso = data.cursos.find(c => c.id === aluno.curso);
                console.log(curso);
                if (aluno) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(`<h1> ${aluno.nome} </h1>`);
                    res.write('<ul>');
                    res.write(`<li>ID: ${aluno.id}</li>`);
                    res.write(`<li>Data de Nascimento: ${aluno.dataNasc}</li>`);
                    if(curso){
                        res.write(`<li><a href="/cursos/${aluno.curso}">Curso: ${curso.designacao}</a></li>`);
                    }
                    else res.write(`<li>Curso: ${aluno.curso}</li>`);
                    res.write(`<li>Ano de Curso: ${aluno.anoCurso}</li>`);
                    res.write(`<li>Instrumento: ${aluno.instrumento}</li>`);
                    res.write('</ul>');
                    res.end();
                } 
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<b> Aluno não encontrado! </b>');
                    res.write('<a href="/alunos">Voltar ao menu principal</a>');
                    res.end();
                }
            } 
            else if (trimmedPath === 'cursos') {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<h1>Lista de Cursos</h1>");
                res.write('<ul>');
                data.cursos.forEach(curso => {
                    res.write(`<li><a href="/cursos/${curso.id}">${curso.designacao}</a></li>`);
                });
                res.write('</ul>');
                res.end();

            } 
            else if (trimmedPath.startsWith('cursos/')) {
                const id = trimmedPath.split("/")[1];
                const curso = data.cursos.find(c => c.id === id);
                if (curso) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(`<h1>${curso.designacao}</h1>`);
                res.write(`<ul>`);
                res.write(`<li>Id: ${curso.id}</li>`);
                res.write(`<li>Duração: ${curso.duracao}</li>`);
                res.write(`<li> <a href="/instrumentos/${curso.instrumento.id}">Instumento: ${curso.instrumento["#text"]}</li>`);
                res.write('</ul>');
                res.end();
                } 
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<b> Curso não encontrado! </b>');
                    res.write('<a href="/cursos">Voltar ao menu principal</a>');
                    res.end();
                }
            }else if(trimmedPath == 'instrumentos'){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<h1>Lista de Instrumentos</h1>");
                res.write('<ul>');
                data.instrumentos.forEach(instrumento =>{
                    res.write(`<li><a href="/instrumentos/${instrumento.id}">${instrumento["#text"]}</a></li>`)
                });
                res.write('</ul>');
                res.end();
            } 
            else if(trimmedPath.startsWith('instrumentos/')){
                const id = trimmedPath.split('/')[1]
                const instrumento = data.instrumentos.find(i => i.id === id);
                if(instrumento){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(`<h1>${instrumento["#text"]}</h1>`);
                    res.write(`<ul>`);
                    res.write(`<li>Id: ${instrumento.id}</li>`);
                    res.write('</ul>');
                    res.end();
                }
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<b> Instrumento não encontrado! </b>');
                    res.write('<a href="/instrumentos">Voltar ao menu principal</a>');
                    res.end();
                }

            }
            else {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<b> Página não encontrado! </b>');
                res.write('<a href="/alunos>Voltar ao menu principal</a>');
                res.end();
          }
        });
        
        const PORT = 3000;
        server.listen(PORT, () => {
          console.log(`Servidor aberto na porta ${PORT}`);
        });
        
    }catch(err){
        console.log("Erro ao fazer parser do json");
    }
});

