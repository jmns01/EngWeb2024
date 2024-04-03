var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor');

/* GET users listing. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Compositor.list()
  .then(data => res.status(200).render('compositorList', {title : "List of Composers", date : d, lista : data}))
  .catch(erro => res.status(501).render('error', {error : erro}))
});

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render('compositorForm', {date : d, title : 'Compositors Form'})
});

router.post('/registo', function(req, res){
  Compositor.insert(req.body)
  .then(data => res.status(200).redirect('/compositores'))
  .catch(erro => res.status(503).render('error', {error : erro}))
});

router.get('/edit/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16);
  Compositor.findById(req.params.id)
  .then(data => res.status(200).render('compositorEdit', {title : 'Composer Edit', date : d, compositor : data}))
  .catch(erro => res.status(504).render('error', {error : erro}))
});

router.post('/edit/:id', function(req, res){
  Compositor.edit(req.body)
  .then(data => res.status(200).redirect('/compositores'))
  .catch(erro => res.status(505).render('error', {error : erro}))

});

router.get('/delete/:id', function(req, res){
  Compositor.delete(req.params.id)
  .then(data => res.status(200).redirect('/compositores'))
  .catch(erro => res.status(506).render('error', {error : erro}))

});

router.get('/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16);
  Compositor.findById(req.params.id)
  .then(data => res.status(200).render('compositor', {compositor : data, date : d}))
  .catch(erro => res.status(507).render('error', {error : erro}))
});

module.exports = router;
