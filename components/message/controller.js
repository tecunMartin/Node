const chalk  = require('chalk');
const store  = require("./store");
const Socket = require('../../socket').socket;
const config = require('../../config');

function addMessage( chat, user, message, file ) {
    return new Promise(async ( resolve, reject ) => {
        if( !user || !message || !chat ){
            console.log(chalk.red('[messageController] No hay usuario o mensaje'));
            return reject('Los datos son incorrectos');
        } 

        let fileUrl = ''; 
        if ( file ) {
            fileUrl = `${config.host}${config.publicRoute}/${config.filesRoute}/` + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }
        store.add(fullMessage);

        // 
        Socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}

function getMessages(filterUser) {
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser));
    });
}

function getOneMessage(id) {
    return new Promise(async(resolve, reject)=>{
        const exist = await store.existDB(id);
        console.log(id);
        console.log(exist);
        if ( !id || exist===false ) {
            console.log(chalk.red('[messageController] No se a encontrado un mensaje.'));
            return reject('Not id of params');
        } else {
            const resultado = await store.listOne(id);
            resolve(resultado);
        }
    });
}

function updateMessage (id, message) {
    return new Promise(async (resolve, reject) => {
        console.log(id);
        console.log('[MESSAGE]:',message);
        const exist = await store.existDB(id);
        console.log(exist);
        if ( !id || !message || exist===false ) {
            console.log(chalk.red('[messageController] No se a encontrado un mensaje.'));
            return reject('Invalid data');
        } 

        const resultado = await store.update(id, message);
        resolve(resultado);
    }).catch(e => console.log(e));
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        const exist = await store.existDB(id);
        console.log(id);
        console.log(exist);
        if ( !id || exist===false ) {
            console.log(chalk.red('[messageController] No se encuentra un id.'));
            return reject('ID invalido');
        } else {
            const resultado = await store.delete(id);
            resolve(resultado);
        }
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    getOneMessage,
    deleteMessage,
}