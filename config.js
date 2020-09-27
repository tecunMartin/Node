const model = require("./components/message/model")

const config = {
    dbUrl:       process.env.DB_URL,
    port:        process.env.PORT,
    host:        process.env.HOST,
    publicRoute: process.env.PUBLIC_ROUTE,
    filesRoute:  process.env.FILES_ROUTE,
}

module.exports = config;