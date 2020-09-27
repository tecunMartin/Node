const mongoose = require("mongoose");
const model = require("./model");
const store = require("./store");

function addUser(name) {
    if ( !name ) {
        return Promise.reject('Invalid name');
    }
    const user = {
        name,
    }
    return Promise.resolve(store.add(user));
}

// Creamos la logica para encontrar un usuario
function getOneUser(id) {
    return new Promise(async(resolve, reject) => {
        const exist = await store.exist(id);
        if ( !id || exist===false ) {
            reject('No se encuentra el ID o no viene en el parametro');
        } else {
            resolve(store.listOne(id));
        }
    });
}

// Listar todos los user.
async function listUsers() {
    return await store.list();
}

// Eliminar un usuario
function deleteUser(id) {
    return new Promise(async(resolve, reject) => {
        const exist = await store.exist(id);
        if ( !id || exist===false ) {
            reject('No se encuentra el ID o no existe');
        } else {
            resolve(store.remove(id));
        }
    });
}

// Controlador para modificar el nombre de usuario
function updateUser(id, name) {
    return new Promise(async(resolve, reject) => {
        const exist = await store.exist(id);
        if ( !id || exist===false || !name ) {
            reject('No se encuentra el id o no existe.');
        } else {
            resolve(store.update(id, name));
        }
    });
}

module.exports = {
    addUser,
    listUsers,
    getOneUser,
    deleteUser,
    updateUser,
}
