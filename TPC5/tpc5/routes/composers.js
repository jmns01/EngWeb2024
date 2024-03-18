var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp => {
    var compositores = resp.data;
    res.status(200).render('compositorListPage', { title: 'List of Composers', date : d, lista : compositores});
  })
  .catch(erro => {
    res.status(501).render("error", { "error": erro });
  })
});

router.get('/registo', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render('compositorFormPage', {title : 'Composer Form', date : d})
});

router.post('/registo', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16);
  var result = req.body;
  axios.post("http://localhost:3000/compositores", result)
  .then(resp =>{
    res.status(200).redirect('/')
  })
  .catch(erro =>{
    res.status(500).render('error', {"error" : erro})
  })
});

router.get('/:idCompositor', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
    var compositores = resp.data;
    res.status(200).render("compositorPage", {compositor : compositores, date : d})
  })
  .catch(erro =>{
    console.error('Error making the request:', erro.toJSON());
    res.status(500).render("erro", {"error" : erro})
  })
});

router.get('/edit/:idCompositor', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then(resp => {
      var compositores = resp.data
      console.log(compositores)
      res.status(200).render("compositoresFormEditPage", { title : "Composer Form", compositor : compositores, date: d })
    })
    .catch(erro => {
      res.status(500).render("error", { "error": erro })
    })
});
  
router.post('/edit/:idCompositor', function (req, res, next) {
  var compositores = req.body
  axios.put("http://localhost:3000/compositores/" + req.params.idCompositor, compositores)
    .then(resp => {
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(500).render("error", { "error": erro })
    })
});
  
router.get('/delete/:idCompositor', function (req, res, next) {
  axios.delete("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(505).render("error", { "error": erro })
    })
});
  
  
module.exports = router;