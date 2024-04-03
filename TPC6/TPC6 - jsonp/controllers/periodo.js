var Periodo = require("../models/periodo")

module.exports.list = () => {
    return Periodo
        .find()
        .sort({name : 1})
        .exec()
}

module.exports.findById = id => {
    return Periodo
        .findOne({_id : id})
        .exec()
}

module.exports.insert = periodo => {
    if((Periodo.find({_id : periodo._id}).exec()).length != 1){
        var newPeriodo = new Periodo(periodo)
        return newPeriodo.save()
    }
}

module.exports.edit = periodo => {
    if((Periodo.find({_id : periodo._id}).exec()).length != 1){
        return Periodo.replaceOne({_id : periodo._id}, periodo)
    }
    console.log('Periodo a editar não existe!')
}

module.exports.delete = perId => {
    if((Periodo.find({_id : perId}).exec()).length != 1){
        return Periodo.deleteOne({_id : perId}).exec();
    }
    console.log('Periodo a eliminar não existe!')
}