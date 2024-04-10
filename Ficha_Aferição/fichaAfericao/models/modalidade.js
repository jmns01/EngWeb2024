var mongoose = require('mongoose')

var modalidadesSchema = new mongoose.Schema({
    _id : Number,
    nome : String,
    praticantes : {
        _id : String,
        nome : String
    }
});

module.exports = mongoose.model('modalidade', modalidadesSchema)