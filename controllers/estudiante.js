const { response, request } = require('express');
const bcrypt = require('bcryptjs');
Curso = require('../models/curso');
//Importación del modelo
const Estudiante = require('../models/usuario');

const getMisCursos = async (req = request, res = response) => {
    const _id = req.usuario.id;
    const query = { estado: true, _id: _id };
    const listaEstudiantes = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query).populate('cursos', 'nombre')
    ]);
    res.status(201).json(listaEstudiantes);
}

const getEstudiantes = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true, rol: "ESTUDIANTE_ROLE" };

    const listaEstudiantes = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query).populate('cursos', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Estudiante',
        listaEstudiantes
    });

}

const postEstudiante = async (req = request, res = response) => {
    //Desestructuración
    rol = "ESTUDIANTE_ROLE"
    const { nombre, correo, password, cursos } = req.body;

    const estudianteGuardadoDB = new Estudiante({ nombre, correo, password, rol, cursos });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    estudianteGuardadoDB.password = bcrypt.hashSync(password, salt);

    //-- Validacion para que no se repitan los cursos
    if (cursos.length <= 3) {
        let valorRepetido;
        for (let i = 0; i < cursos.length; i++) {
            for (let j = i + 1; j < cursos.length; j++) {
                if (cursos[i] === cursos[j]) {
                    valorRepetido = cursos[i];
                    break;
                }
            }
        }

        if (valorRepetido) {
            res.status(201).json('NO SE PUEDE INGRESAR UN CURSO YA EXISTENTE');
        } else {
            res.status(201).json('REGISTRO COMPLETADO');
            await estudianteGuardadoDB.save();
        }
    } else {
        res.status(201).json('NO PUEDE ASIGNARSE A MAS DE 3 CURSOS');
    }
}

const putEstudiante = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    if (cursos.length <= 3) {
        let valorRepetido;
        for (let i = 0; i < resto.cursos.length; i++) {
            for (let j = i + 1; j < resto.cursos.length; j++) {
                if (resto.cursos[i] === resto.cursos[j]) {
                    valorRepetido = resto.cursos[i];
                    break;
                }
            }
        }

        if (valorRepetido) {
            res.status(201).json('NO SE PUEDE INGRESAR UN CURSO YA EXISTENTE');
        } else {
            res.status(201).json('REGISTRO COMPLETADO');
            const estudianteEditado = await Estudiante.findByIdAndUpdate(id, resto);
        }
    } else {
        res.status(201).json('NO PUEDE ASIGNARSE A MAS DE 3 CURSOS');
    }

    //Editar al usuario por el id


    res.json({
        msg: 'PUT editar estudiante',
        estudianteEditado
    });

}

const deleteEstudiante = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    // const estudianteEliminado = await Estudiante.findByIdAndDelete( id);
    //Eliminar cambiando el estado a false
    const cursos = [];
    const estudianteEliminado = await Estudiante.findByIdAndUpdate(id, { estado: false }, cursos);


    res.json({
        msg: 'DELETE eliminar estudiante',
        estudianteEliminado
    });
}

const asignacionAlumnoCurso = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, estado, password, correo, ...resto } = req.body;
    //-- Validacion para que no se repitan los cursos 
    if (resto.cursos.length <= 3) {
        let valorRepetido;
        for (let i = 0; i < resto.cursos.length; i++) {
            for (let j = i + 1; j < resto.cursos.length; j++) {
                if (resto.cursos[i] === resto.cursos[j]) {
                    valorRepetido = resto.cursos[i];
                    break;
                }
            }
        }

        if (valorRepetido) {
            res.status(201).json('NO SE PUEDE INGRESAR UN CURSO YA EXISTENTE');
        } else {
            res.status(201).json('REGISTRO COMPLETADO');
            const estudianteEditado = await Estudiante.findByIdAndUpdate(id, resto);
        }
    } else {
        res.status(201).json('NO PUEDE ASIGNARSE A MAS DE 3 CURSOS');
    }
    // //Validar que los elementos del arreglo sean objectId
    // for (let i = 0; i < resto.cursos.length; i++) {
    //     if (Curso.findById(resto.cursos[i])) {
    //         await console.log(`EL ELEMENTO ${resto.cursos[i]} SI es un ObjectId válido de MongoDB.`);
    //     } else {
    //         await console.log(`EL ELEMENTO ${resto.cursos[i]} NO es un ObjectId válido de MongoDB.`);
    //     }
    // }


    //Editar al usuario por el id


}

module.exports = {
    getEstudiantes,
    postEstudiante,
    putEstudiante,
    deleteEstudiante,
    asignacionAlumnoCurso,
    getMisCursos
}


// CONTROLADOR