import Express from 'express';
import { fileURLToPath } from 'url'
import HTTP from 'http';
import Path from 'path';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';

const PORT = 3000;
const __filename = fileURLToPath( import.meta.url );
const __dirname = Path.resolve();

// Helper classes for use within the server
// import ServerResponse  from './server/server-response';
//import ServerResponse from './server/server-response';  // use with esm module and nodemon
// import FileList  from './server/file-list';

import IndexRouter  from './server/routes/index.js';
import ToolRouter  from './server/routes/tool.js';

import LoginHandler  from './server/api/login.js';
import LogoutHandler  from './server/api/logout.js';
import ValidateHandler  from './server/api/validate.js';

class Server {

    constructor() {
        this.api = Express();
        this.router = Express.Router();
        this.api
            .use( Logger('dev'))
            .use( Express.json())
            .use( Express.urlencoded({ extended: false }))
            .use( CookieParser())
            .use( Express.static( Path.join(__dirname, './') ))
            .use( Express.static( Path.join(__dirname, 'server/api') ));

        // Add edge handlers here
        this.api
            .use('/', IndexRouter )
            .use('/tool', ToolRouter )
            .use('/api/login', LoginHandler)
            .use('/api/logout', LogoutHandler )
            .use('/api/logout', ValidateHandler );

        this.run();
    }


    #_handleListenerError( error ) {
        /**
         * Listen on provided port, on all network interfaces.
        */
        if (error.syscall !== 'listen')
            throw error;

        // handle specific listen errors with friendly messages
        let bind = typeof this.port === `string`?`Pipe ${this.port}`:`Port ${this.port}`;
        switch (error.code) {

            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit (1 );
                break;

            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;

            default:
                throw error;
        }
    }


    #_handleListenerListening() {

        let addr = this.listener.address();
        let bind = typeof addr === `string`?`pipe ${addr}`:`port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

    run() {
        // Create HTTP server.
        this.api.set('port', this.port );

        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        this.listener.on('error', error => this.#_handleListenerError( error ));
        this.listener.on('listening', () => this.#_handleListenerListening());
    }
}

const server = new Server();
