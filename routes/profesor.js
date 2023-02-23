//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getMisCursos } = require('../controllers/curso');
const { getProfesores, postProfesor, putProfesor, deleteProfesor } = require('../controllers/profesor');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/profesor', getProfesores);

router.post('/agregar/profesor', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol').custom(  esRoleValido ),
    validarCampos,
] ,postProfesor);

router.put('/editar/profesor/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('PROFESOR_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo').custom( emailExiste ),
    validarCampos
] ,putProfesor);


router.delete('/eliminar/profesor/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('PROFESOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteProfesor);

router.get('/miscursos/profesor/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('PROFESOR_ROLE'),
    validarCampos
] ,getMisCursos);
module.exports = router;


// ROUTES