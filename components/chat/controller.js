const chalk = require('chalk');
const store = require("./store");

// Funcion para agregar un usuario con dos usuarios.
function addChat(users) {
	if ( !users || !Array.isArray(users) ) {
		return Promise.reject('Invalid user list')
	} 
	console.log(arrayS);
	const arrayS = Array.isArray(users);
	console.log(arrayS);
	const chat = {
		users: users,
	}
	return Promise.resolve(store.add(chat));
}

// Funcion para listart todos los chats.
function listChat(chat) {
	return store.list(chat)
}

module.exports = {
	addChat,
	listChat,
}