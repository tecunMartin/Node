const db    = require('mongoose');
const chalk = require('chalk');

db.Promise  = global.Promise;

async function connect(url) {
    // Creamos una coneccion con la DB
    db.connect(
        url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(DB   => console.log(chalk.bgGreenBright.black('[db] Conectada con exito')))
    .catch(err => console.log(err)); 
}

module.exports = {
    connect,
}
