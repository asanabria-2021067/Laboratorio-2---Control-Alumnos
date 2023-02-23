//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEstudiantes, postEstudiante, putEstudiante, deleteEstudiante, asignacionAlumnoCurso } = require('../controllers/estudiante');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/estudiante', getEstudiantes);

router.post('/agregar/estudiante', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('cursos', 'El limite cursos es de 3').isLength( { min: 0 } , { max: 3 } ),
    check('correo').custom( emailExiste ),
    // check('rol').custom(  esRoleValido ),
    validarCampos,
] ,postEstudiante);

router.put('/editar/estudiante/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('cursos', 'El limite cursos es de 3').isLength( { min: 0 } , { max: 3 } ),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,putEstudiante);


router.delete('/eliminar/estudiante/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ESTUDIANTE_ROLE','PROFESOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteEstudiante);


router.put('/asignar/:id',[
    // validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeCursoPorId ),
    check('cursos', 'El limite cursos es de 3').isLength( { min: 0 } , { max: 3 } ),
    check('cursos', 'No es un ID válido').isMongoId(),
], asignacionAlumnoCurso);

module.exports = router;


// ROUTES