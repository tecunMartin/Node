const Model = require("./model");

// Crea un chat.
async function add(chat) {
	const myChat = new Model(chat);
	return myChat.save();
}

// lista un chat
async function list(userId) {
	return new Promise((resolve, reject) => {
		let filtro = {};

		if ( userId ) {
			filtro = {
				users: userId,
			}
		}
		Model.find(filtro)
			.populate('users')
			.exec((err, populated) => {
				if (err) {
					reject(err);
					return false;
				}
				resolve(populated)
			})
	});
}

module.exports = {
	add, 
	list
}