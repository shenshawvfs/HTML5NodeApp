const Express = require('express');
const HTTP = require('http');
const Path = require('path');
const CookieParser = require('cookie-parser');
const Logger = require('morgan');

const PORT = 3000;

// Helper classes for use within the server
const ServerResponse = require('./server/server-response');
//import ServerResponse from './server/server-response';  // use with esm module and nodemon
const FileList = require('./server/file-list');

const IndexRouter = require('./server/routes/index');
const ToolRouter = require('./server/routes/tool');

const LoginHandler = require('./server/api/login');
const LogoutHandler = require('./server/api/logout');
const ValidateHandler = require('./server/api/validate');

class Server {

    constructor() {
        this.api = Express();
        this.api
            .use( Logger('dev'))
            .use( Express.json())
            .use( Express.urlencoded({ extended: false }))
            .use( CookieParser())
            .use( Express.static( Path.join(__dirname, './') ))
            .use( Express.static( Path.join(__dirname, 'server/api') ));

        // Add edge handlers here
        this.router = this.api.Router();
        this.api
            .use('/', IndexRouter )
            .use('/tool', ToolRouter )
            .use('/api/login', LoginHandler)
            .use('/api/logout', LogoutHandler )
            .use('/api/logout', ValidateHandler );
    }
}

const server = new Server();

module.exports = server;
