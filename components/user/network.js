const express = require('express');
const response = require("../../network/response");
const controller = require('./controller');
const router = express.Router();

// Crear un usuario para la db.
router.post('/', (req, res) =>
    controller.addUser(req.body.name)
    .then (data => response.success(req, res, data, 201))
    .catch(err  => response.error  (req, res, 'Error interno', 200, err))
);

// Busca un usuario especifico.
router.get('/:id', (req, res) => 
    controller.getOneUser(req.params.id)
    .then (data => response.success(req, res, data, 200))
    .catch(e => response.error(req, res, 'Error interno', 500, e))
);

// Lista todos los datos de la DB.
router.get('/',(req, res) => {
    controller.listUsers()
    .then(data => response.success(req, res, data, 200))
    .catch(e => response.error(req, res, 'Error interno', 500, e));
});

// Logica para eliminar una DB.
router.delete('/:id', (req, res) => 
    controller.deleteUser(req.params.id)
    .then (data => response.success(req, res, 'User eliminado!!', 200))
    .catch(e => response.error(req, res, 'Error interno', 500, e))
);

// Modificar el nombre de el usuario
router.patch('/:id', (req, res) => 
    controller.updateUser(req.params.id, req.body.name)
    .then (data => response.success(req, res, data, 200))
    .catch(e    => response.error  (req, res, 'Error interno', 500, e))
);

module.exports = router;