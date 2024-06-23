var Contrato = require("../models/contrato")

module.exports.list = () => {
    return Contrato
        .find()
        .sort({_id : 1})
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findOne({_id : id})
        .exec()
}

module.exports.findEntidade = entidade => {
    return Contrato
        .find({entidade_comunicante : entidade})
        .exec()
}

module.exports.findTipo = tipo => {
    return Contrato
        .find({tipoprocedimento : tipo})
        .exec()
}

module.exports.listEntidades = () => {
    return Contrato
        .distinct("NIPC_entidade_comunicante")
        .sort()
        .exec()
}

module.exports.listTipos = () => {
    return Contrato
        .distinct("tipoprocedimento")
        .sort()
        .exec()
}

module.exports.insert = (contrato) => {
    if((Contrato.find({_id : contrato._id}).exec()).length != 1){
        var newContrato = new Contrato(contrato)
        return newContrato.save()
    }
}

module.exports.delete = id => {
    return Contrato
        .deleteOne({_id : id})
        .exec()
}

module.exports.edit = (id, newR) => {
    if((Contrato.find({_id : id}).exec()).length != 1){
        return Contrato
        .findByIdAndUpdate(id, newR)
        .exec()
    }
}


