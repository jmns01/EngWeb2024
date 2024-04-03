var Compositor = require('../models/compositor')

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = id => {
    return Compositor
        .findOne({_id : id})
        .exec()
}

module.exports.insert = compositor => {
    if((Compositor.find({_id : compositor._id}).exec()).length != 1){
        var newCompositor = new Compositor(compositor)
        return newCompositor.save()
    }
}

module.exports.edit = compositor => {
    if((Compositor.find({_id : compositor._id}).exec()).length != 1){
        return Compositor.replaceOne({_id : compositor._id}, compositor)
    }
    console.log('Compositor a editar não existe!')
}

module.exports.delete = compId => {
    if((Compositor.find({_id : compId}).exec()).length != 1){
        return Compositor.deleteOne({_id : compId}).exec();
    }
    console.log('Compositor a eliminar não existe!')
}