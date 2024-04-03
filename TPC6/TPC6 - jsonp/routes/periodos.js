var express = require('express');
var router = express.Router();
var Periodo = require("../controllers/periodo")

/* GET home page. */
router.get('/', function(req, res) {
  Periodo.list()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(508).jsonp(erro));
});

router.post('/', function(req, res){
  Periodo.insert(req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(509).jsonp(erro))
});

router.post('/edit/:id', function(req, res){
  Periodo.edit(req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(511).jsonp(erro))

});

router.get('/delete/:id', function(req, res){
  Periodo.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(512).jsonp(erro))

});

router.get('/:id', function(req, res){
  Periodo.findById(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(513).jsonp(erro))
});

module.exports = router;