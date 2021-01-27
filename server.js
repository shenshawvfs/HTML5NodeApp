import Express from 'express'
import HTTP from 'http'
import Path from 'path'
import CookieParser from 'cookie-parser'
//import Logger from 'morgan'

const PORT = 3000;

// Helper classes for use within the server
import ServerResponse from './server/server-response'
//import ServerResponse from './server/server-response';  // use with esm module and nodemon
import FileList from './server/file-list'

import IndexRouter from './server/routes/index'
import ToolRouter from './server/routes/tool'

import LoginHandler from './server/api/login'
import LogoutHandler from './server/api/logout'
import ValidateHandler from './server/api/validate'

class Server {

    constructor() {
        this.api = Express();
        this.api
            //.use(Logger('dev'))
            .use(Express.json())
            .use(Express.urlencoded({ extended: false }))
            .use(CookieParser())
            .use(Express.static(Path.join(__dirname, './')))
            .use(Express.static(Path.join(__dirname, 'server/api')));

        // Add edge handlers here
        this.router = Express.Router();
        this.api
            .use('/', IndexRouter)
            .use('/tool', ToolRouter)
            .use('/api/login', LoginHandler)
            .use('/api/logout', LogoutHandler)
            .use('/api/logout', ValidateHandler);
    }
}

export default new Server();