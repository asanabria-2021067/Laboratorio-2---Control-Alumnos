const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre es obligatorio']
    },
    capacidadMinima: {
        type: Number,
        required: [true , "La capacidad minima es obligatoria"]
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    estado:{
        type: Boolean,
        default: true
    }
});


module.exports = model('Curso', CursoSchema);