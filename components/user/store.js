const Model = require("./model");

// Agregamos usuarios a la DB.
function add(user) {
    const myUser = new Model(user);
    return myUser.save();
}

// Creamos la logica para listar usuarios.
async function list() {
    return await Model.find();
}

// Encuentra un User en especifico
async function listOne(id) {
    const user = await Model.findOne({
        _id:id
    }); 
    return user;
}

// Creamos la logica para saber si un usuario existe o no
async function exist(id) {
    const exist = await Model.exists({
        _id:id
    });
    return exist;
}

// Eliminar un usuario
async function remove(id) {
    const deleteU = await Model.findOneAndDelete({
        _id:id,
    });
}

// Modifica el nombre de usuario
async function update(id, name) {
    const updateUser = await Model.findOneAndUpdate(
        { _id:id },
        { name },
        { new: true},
    );
    return updateUser;
}

// Exportamos todas las funciones.
module.exports = {
    add,
    list,
    listOne,
    remove,
    exist,
    update
}