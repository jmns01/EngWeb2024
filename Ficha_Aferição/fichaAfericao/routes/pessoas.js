var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

router.get('/', function(req, res){
    Pessoa.list()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get("/:id", function(req, res){
    Pessoa.findById(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(501).jsonp(erro))
});

router.post('/', function(req, res){
    console.log(req.body)
    Pessoa.insert(req.body)
    .then(data => res.status(202).jsonp(data))
    .catch(erro => res.status(502).jsonp(erro))
});

router.delete('/:id', function(req, res){
    Pessoa.delete(req.params.id)
    .then(data => res.status(203).jsonp(data))
    .catch(erro => res.status(503).jsonp(erro))
})

module.exports = router;