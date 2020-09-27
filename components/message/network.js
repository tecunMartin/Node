const express = require('express');

// Creamos la instancia para declarar multer
const multer = require('multer');

const router = express.Router();
const controller = require('./controller');
const response = require("../../network/response");
const config = require('../../config');

// Construimos multer en una variables
// Preparamos a multer.
const upload = multer({
    dest: `./public/${config.filesRoute}/`,
});

router.get('/',     (req, res) => {
    const filtrerMessage = req.query.user || null;
    controller.getMessages(filtrerMessage)
    .then(messageList => response.success(req, res, messageList, 200))
    .catch(e => response.error(req, res, "Unexpected Error", 500, e));
});

router.get('/:id',  (req, res) => {
    controller.getOneMessage(req.params.id)
    .then(data => response.success(req, res, data, 200))
    .catch(e => response.error(req, res, 'Mensaje no encontrado.', 400, e));
});

router.post('/', upload.single('file'), (req, res) => {

    console.log(req.file);

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then(fullMenssage => response.success(req, res, fullMenssage, 201))
    .catch(e => response.error  (req, res, 'Informacion invalida', 400, 'Error en el controlador para login'));
});

router.patch('/:id',(req, res) => {
/*     console.log(req.params.id); */
    controller.updateMessage(req.params.id, req.body.message)
    .then(data => response.success(req, res, data, 200))
    .catch(e =>   response.error  (req, res, 'Error Interno', 500, e));
});

router.delete('/:id',(req, res) => {
    controller.deleteMessage(req.params.id)
        .then(data => response.success(req, res, `Mensaje ${req.params.id} eliminado.`, 200))
        .catch(e => response.error(req, res, 'Error interno', 500, e));
});

module.exports = router;