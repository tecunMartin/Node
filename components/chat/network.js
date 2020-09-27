const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require("../../network/response");

// Metodo para agregar un chat
router.post('/', ( req, res ) => 
	controller.addChat(req.body.users)
	.then (data => response.success(req, res, data, 200))
	.catch(e    => response.error  (req, res, 'Error interno', 500, e))
);

// Consultar todoso los chats
router.get('/:userId', ( req, res ) => 
	controller.listChat(req.params.userId)
	.then (users => response.success(req, res, users, 200) )
	.catch(e     => response.error  (req, res, 'Error interno', 500, e))
);

module.exports = router;