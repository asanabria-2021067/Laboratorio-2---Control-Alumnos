const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Profesor = require('../models/usuario');

const getProfesores = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaProfesores = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Profesor',
        listaProfesores
    });

}

const postProfesor = async (req = request, res = response) => {

    //Desestructuración
    rol="PROFESOR_ROLE";
    const { nombre, correo, password} = req.body;
    const profesorGuardadoDB = new Profesor({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    profesorGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await profesorGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Profesor',
        profesorGuardadoDB
    });

}


const putProfesor = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, asignado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const profesorEditado = await Profesor.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar profesor',
        profesorEditado
    });

}

const deleteProfesor = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const profesorEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const profesorEliminado = await Profesor.findByIdAndUpdate(id, { asignado: false });

    res.json({
        msg: 'DELETE eliminar profesor',
        profesorEliminado
    });
}

module.exports = {
    getProfesores,
    postProfesor,
    putProfesor,
    deleteProfesor
}


// CONTROLADOR