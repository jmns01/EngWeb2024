var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor');

/* GET users listing. */
router.get('/', function(req, res) {
  Compositor.list()
  .then(data => res.status(201).jsonp(data))
  .catch(erro => res.status(501).jsonp(erro))
});

router.post('/', function(req, res){
  Compositor.insert(req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(503).jsonp(erro))
});

router.post('/edit/:id', function(req, res){
  Compositor.edit(req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(505).jsonp(erro))

});

router.get('/delete/:id', function(req, res){
  Compositor.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(506).jsonp(erro))

});

router.get('/:id', function(req, res){
  Compositor.findById(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(507).jsonp(erro))
});

module.exports = router;
