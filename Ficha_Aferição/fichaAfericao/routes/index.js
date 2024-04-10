var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.write(`
	<h1>Ficha Aferição</h1>
	<br>
	<h2> Autor: João Manuel Novais da Silva - A91671</h2>
	<br>
	<h3>Lista de Pessoas: <a href="/pessoas">/pessoas</a></h3>
	<br>
	<h3>Lista de Modalidades: <a href="/modalidades">/modalidades</a></h3>`);
});

module.exports = router;