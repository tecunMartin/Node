const Model = require("./model");

// Funcion para añadir mensajes a la DB.
const addMessage = message => {
    const myMessage = new Model(message);
    myMessage.save();
}

// Funciones para listar mensajes de la DB.
function getMessage(filterUser) {

    return new Promise((resolve, reject) => {
        let filter = {};            
        if ( filterUser!==null ) {
            filter = { user: filterUser };
        }
        Model.find(filter)
        .populate('user')
        .exec((error, populated)=>{
            if (error) {
                reject(error);
            }
            resolve(populated);
        });
    });

}

// Funcion para modificar un mensaje
async function updateText (id, message) {
    const foundMessage = await Model.findOne({
        _id:id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

// Funcion para encontrar un mensaje
async function getOneMessage(id) {
    const message = await Model.findOne({
        _id:id
    });
    return message;
}

// Funcion para eliminar un mensaje / HECHO POR MI.
async function deleteMessage(id) {
    const message = await Model.findOneAndDelete({
        _id:id
    });
    return message;
}
/* Como lo hizo el profe de platzi */
function removeMessage(id) {
    return Model.deleteOne({
        _id:id
    });
}

async function existDB(id) {
    const exist = await Model.exists({
        _id:id
    });
    return exist;
}

module.exports = {
    add:    addMessage,
    list:   getMessage,
    update: updateText,
    listOne:getOneMessage,
    delete: deleteMessage,
    existDB:existDB
    /* delete */
}