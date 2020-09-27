const express = require ('express');
const message = require ('../components/message/network');
const user    = require ('../components/user/network');
const chatss  = require ('../components/chat/network');

const routes = function( server ) {
    server.use('/message',  message );
    server.use('/user'   ,  user    );
    server.use('/chat'   ,  chatss  );
}

module.exports = routes;