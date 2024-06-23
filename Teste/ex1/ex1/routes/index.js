var express = require('express');
var router = express.Router();
var Contratos = require("../controllers/contratos")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/contratos', function(req, res){
  if(req.query.entidade){
    Contratos.findEntidade(req.query.entidade)
    .then(data => res.status(200).send(data))
    .catch(erro => res.status(500).send(erro))
  }else if(req.query.tipo){
    Contratos.findTipo(req.query.tipo)
    .then(data => res.status(200).send(data))
    .catch(erro => res.status(500).send(erro))
  }else{
    Contratos.list()
    .then(data => res.status(200).send(data))
    .catch(erro => res.status(500).send(erro))
  }
});

router.get('/contratos/entidades', function(req, res){
  Contratos.listEntidades()
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
});

router.get('/contratos/tipos', function(req, res){
  Contratos.listTipos()
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
})

router.post('/contratos', function(req, res){
  Contratos.insert(req.body)
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
})

router.delete('/contratos/:id', function(req ,res){
  Contratos.delete(req.params.id)
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
})

router.put('/contratos/:id', function(req ,res){
  Contratos.edit(req.params.id, req.body)
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
})

router.get('/contratos/:id', function(req, res){
  Contratos.findById(req.params.id)
  .then(data => res.status(200).send(data))
  .catch(erro => res.status(500).send(erro))
})

module.exports = router;
