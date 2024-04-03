var mongoose = require('mongoose')

var periodoSchema = new mongoose.Schema({
    _id : String,
    periodo : String
}, {versionKey : false})

module.exports = mongoose.model('periodo', periodoSchema, 'periodos')