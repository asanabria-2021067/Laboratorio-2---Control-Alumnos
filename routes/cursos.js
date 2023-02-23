const { Router } = require('express');
const { check } = require('express-validator');
const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeCursoPorId, existeCurso } = require('../helpers/db-validators');
const { postCurso, getCursos, putCurso, deleteCurso } = require('../controllers/curso');
const router = Router();

router.get('/mostrar', getCursos);

router.post('/agregar', [
    validarJWT,
    tieneRole('PROFESOR_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    
    validarCampos,
] ,postCurso);

router.put('/editar/:id', [
    validarJWT,
    tieneRole('PROFESOR_ROLE'),
    check('id').custom( existeCursoPorId ),
    check('id', 'No es un ID válido').isMongoId(),
    
    validarCampos
] ,putCurso);


router.delete('/eliminar/:id', [
    validarJWT,
    tieneRole('PROFESOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
] ,deleteCurso);


module.exports = router;


// ROUTES