var Pessoa = require('../models/pessoa')

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = id => {
    return Pessoa
        .findOne({_id : id})
        .exec()
}

module.exports.insert = pessoa =>{
    if((Pessoa.find({_id : pessoa._id}).exec()).length != 1){
        var newPessoa = new Pessoa(pessoa)
        return newPessoa.save()
    }
}

module.exports.delete = id => {
    if((Pessoa.find({_id : id}).exec()).length != 1){
        return Pessoa.deleteOne({_id : id}).exec();
    }
    console.log("Pessoa " + id + " eliminada!")
}