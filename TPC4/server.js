var http = require('http')
var axios = require('axios')
var templates = require('./templates.js')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if((req.url == "/") || (req.url == "/compositores")){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(response => {
                            var comp = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.composersListPage(comp, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/" + idAluno)
                        .then( response => {
                            let c = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.composerPage(c, d))
                        })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.composerFormPage(d))
                    res.end()
                }
                // GET /compositores?periodo={periodo} --------------------------------------------------------------------
                else if(req.url.startsWith('/compositores?periodo=')){
                    const periodo = req.url.split('=')[1];
                    axios.get(`http://localhost:3000/compositores?periodo=${periodo}`)
                        .then(resp => {
                            const composers = resp.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.composersPeriodPage(composers, periodo, d));
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(`<p>Não foi possível obter a lista de compositores do período ${periodo}: ${error}</p>`);
                            res.end();
                        });
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                        .then(function(resp){
                            var c = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.composerFormEditPage(c, d))
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idCompositor, d))
                        })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    var idCompositor = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                        .then(resp => {
                            console.log("Delete " + idCompositor + " :: " + resp.status);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Registration deleted:' + idCompositor  + '</p>')
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idCompositor, d))
                        })
                }
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                    .then(resp => {
                        var per = resp.data;
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.periodosListPage(per, d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos... Erro: " + erro)
                        res.end()
                    })
                }
                else if(/\/periodos\/P[0-9]+$/i.test(req.url)){
                    var perId = req.url.split('/')[2]
                    console.log(perId)
                    axios.get('http://localhost:3000/periodos/' + perId)
                    .then(resp =>{
                        console.log("Estou no then")
                        let p = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.periodoPage(p, d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(`<p>Não foi possível obter o periodo ${perId} ... Erro: ` + erro)
                        res.end()
                    })
                }
                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }
                else if(/\/periodos\/edit\/C[0-9]+$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodos/' + idPeriodo)
                        .then(function(resp){
                            var p = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.periodoFormEditPage(p, d))
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idPeriodo, d))
                        })
                }
                else if(/\/periodos\/delete\/C[0-9]+$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + idPeriodo)
                        .then(resp => {
                            console.log("Delete " + idPeriodo + " :: " + resp.status);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Registration deleted:' + idPeriodo  + '</p>')
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idPeriodo, d))
                        })
                    }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resp => {
                                    console.log(result)
                                    console.log(resp.data);
                                    res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write('<p>Registo inserido:' + JSON.stringify(resp.data)  + '</p>')
                                    res.end();
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/compositores/' + result.id, result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<p>Registo alterado:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to insert record...", d))
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                if(req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/periodos', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<p>Registo inserido:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/periodos\/edit\/C[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/periodos/' + result.id, result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<p>Registo alterado:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to insert record...", d))
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



