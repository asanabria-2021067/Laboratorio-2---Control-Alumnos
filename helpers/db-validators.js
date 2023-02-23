const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
//Este archivo maneja validaciones personalizadas

const esRoleValido = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}

const cursoExiste = async( nombre1 = '' ) => {

    const existeCurso = await Curso.findOne( { nombre1 } );

    if ( !existeCurso ) {
        throw new Error(`El curso:  ${ nombre1 } no está registrado en la DB`);
    }

}

const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeUsuarioPorId = async(id1) => {

    //Verificar si el ID existe
    const existeUser = await Usuario.findById(id1);
    
    if ( !existeUser ) {
        throw new Error(`El id ${ id1 } no existe en la DB`);
    }

}

const existeCursoPorId = async(id2) => {

    //Verificar si el ID existe
    const existeCursoporId = await Curso.findById(id2);

    if ( !existeCursoporId ) {
        throw new Error(`El id ${ id2 } no existe en la DB`);
    }

}

const existeCurso = async( nombre = '' ) => {

    const existeCurso = await Curso.findOne( { nombre } );
    console.log(existeCurso);
    //Si existe (es true) lanzamos excepción
    if ( existeCurso ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

// const rolProfesor = async(id) => {

//     //Verificar si el ID existe
//     const existeUser = await Usuario.findById(id);

//     if ( !existeUser ) {
//         throw new Error(`El id ${ id } no existe en la DB`);
//     }

//     const rolUser = await Usuario.rol
//     if(rol=="ESTUDIANTE_ROLE"){
//         throw new Error(`El rol ${ Usuario.rol } no tiene permisos para ejecutar la accion`);
//     }

// }




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCursoPorId,
    existeCurso
}