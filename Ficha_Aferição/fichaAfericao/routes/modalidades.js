var express = require('express');
var router = express.Router();
var Modalidade = require('../controllers/modalidade')

router.get('/', function(req, res){
    Modalidade.list()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:modalidade', function(req, res){
    Modalidade.getByName(req.params.modalidade)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(501).jsonp(erro))
})


module.exports = router;