var express = require('express');
var router = express.Router();
var Periodo = require("../controllers/periodo")

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Periodo.list()
  .then(data => res.status(200).render('periodoList', {title : "List of Periods", date : d, lista : data}))
  .catch(erro => res.status(508).render('error', {error : erro}));
});

router.get('/registo', function(req, res) {
  console.log("Entrei no registo")
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render('periodoForm', {date : d, title : 'Periods Form'})
});

router.post('/registo', function(req, res){
  Periodo.insert(req.body)
  .then(data => res.status(200).redirect('/periodos'))
  .catch(erro => res.status(509).render('error', {error : erro}))
});

router.get('/edit/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16);
  Periodo.findById(req.params.id)
  .then(data => res.status(200).render('periodoEdit', {title : 'Period Edit', date : d, periodo : data}))
  .catch(erro => res.status(510).render('error', {error : erro}))
});

router.post('/edit/:id', function(req, res){
  Periodo.edit(req.body)
  .then(data => res.status(200).redirect('/periodos'))
  .catch(erro => res.status(511).render('error', {error : erro}))

});

router.get('/delete/:id', function(req, res){
  Periodo.delete(req.params.id)
  .then(data => res.status(200).redirect('/periodos'))
  .catch(erro => res.status(512).render('error', {error : erro}))

});

router.get('/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16);
  Periodo.findById(req.params.id)
  .then(data => res.status(200).render('periodo', {periodo : data, date : d}))
  .catch(erro => res.status(513).render('error', {error : erro}))
});

module.exports = router;