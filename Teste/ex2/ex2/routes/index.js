var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:16000/contratos")
    .then(resp => {
      var contratos = resp.data
      res.status(200).render("contratosList", {title : "Lista de Comtratos", lista : contratos , date : d})
    })
    .catch(erro => res.status(501).render('error', {error : erro}))
});

router.get('/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:16000/contratos/" + req.params.id)
  .then(resp => {
    var contrato = resp.data
    res.status(200).render("contrato", {title : `Contrato ${contrato._id}`, c : contrato, date : d})
  })
  .catch(erro => res.status(501).render('error', {error : erro}))
})

router.get('/entidades/:nipc', function(req,res){
  var d = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:16000/contratos?entidade=" + req.params.nipc)
  then(resp => {
    var entidade = resp.data
    res.status(200).render("entidade", {title : `Entidade ${entidade.entidade_comunicante} : ${entidade.NIPC_entidade_comunicante}`, lista : entidade, date : d})
  })
  .catch(erro => res.status(501).render('error', {error : erro}))
})


module.exports = router;
