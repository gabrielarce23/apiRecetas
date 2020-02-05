var mongoose = require('mongoose')

var RecestasSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    preparacion: {
        type: String,
        required: true,
    },
    fecha: {
        type: Number,
        required: true,
        trim: true,
        default: Date.now()
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',
        require: true
    },
    ingredientes: [String]
})

var Receta = mongoose.model('Receta',RecestasSchema)
module.exports = {Receta}