var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    axios.get("http://localhost:3000/periodos")
    .then(resp => {
      var periodos = resp.data;
      res.status(200).render('periodListPage', { title: 'List of Periods', data : d, lista : periodos});
    })
    .catch(erro => {
      res.status(501).render("error", { "error": erro });
    })
  });

router.get('/registo', function(req, res, next){
    var d = new Date().toISOString().substring(0, 16);
    res.status(200).render('periodoFormPage', {title : 'Period Form', date : d})
});

router.post('/registo', function(req, res, next){
    var d = new Date().toISOString().substring(0, 16);
    var result = req.body;
    axios.post("http://localhost:3000/periodos", result)
    .then(resp =>{
      res.status(200).redirect('/periodos')
    })
    .catch(erro =>{
      res.status(500).render('error', {"error" : erro})
    })
});

router.get('/:idPeriodo', function(req, res, next){
    var d = new Date().toISOString().substring(0, 16);
    axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      var periodos = resp.data;
      res.status(200).render("periodPage", {periodo : periodos, date : d})
    })
    .catch(erro =>{
      console.error('Error making the request:', erro.toJSON());
      res.status(500).render("erro", {"error" : erro})
    })
});

router.get('/edit/:idPeriodo', function (req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
      .then(resp => {
        var periodos = resp.data
        res.status(200).render("periodosFormEditPage", { title : "Period Form", periodo : periodos, date: d })
      })
      .catch(erro => {
        res.status(500).render("error", { "error": erro })
      })
});

router.post('/edit/:idPeriodo', function (req, res, next) {
    var periodos = req.body
    axios.put("http://localhost:3000/periodos/" + req.params.idPeriodo, periodos)
      .then(resp => {
        res.status(201).redirect('/periodos')
      })
      .catch(erro => {
        res.status(500).render("error", { "error": erro })
      })
});

router.get('/delete/:idPeriodo', function (req, res, next) {
    axios.delete("http://localhost:3000/periodos/" + req.params.idPeriodo)
      .then(resp => {
        res.redirect('/periodos')
      })
      .catch(erro => {
        res.status(505).render("error", { "error": erro })
      })
});

module.exports = router;