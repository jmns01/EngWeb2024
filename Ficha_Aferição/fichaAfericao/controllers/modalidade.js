var Modalidade = require('../models/modalidade');

module.exports.list = () => {
    return Modalidade
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.getByName = name => {
    return Modalidade
        .aggregate([
            { $match: { nome : name } },
            { $project: { praticantes: 1, _id: 0 } },
            { $unwind: "$praticantes" },
            { $sort: { "praticantes.nome": 1 } },
            { $group: { _id: null, praticantes: { $push: "$praticantes" } } },
            { $project: { _id: 0, praticantes: 1 } }
        ])
}