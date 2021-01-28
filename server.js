/*
Node Express Server (MEVN Stack)
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
'use strict';

import Express from 'express'

import CORS from 'cors'
import Path from 'path'
import HTTP from 'http'
import FileSystem from 'fs'

const PORT = 4000;


// Helper classes for use within the server
import CrossOriginConfig from './server/corsConfig'
import Payload from './server/Result'

import Index from './server/index'
import Tools from './server/api/tools'
import Authentication from './server/api/authenticate'

class Server {

    constructor( api, port = PORT ) {
        this.api = Express();
        this.router = Express.Router();
        this.port = port;
        this.title = "Server title here"

        const crossOrigin = new CrossOriginConfig();

        this.api
            .use( crossOrigin.cors ).options('/*', crossOrigin.header )
            .use( Express.json() )
            .use( Express.urlencoded({ extended: false }) )
            .use( Express.static( Path.join(__dirname, './client') ) ) // css, images

            // handle get requests for main pages
            .use('/', Index )

            // Add edge handlers here
            .use('/tool', Tools )
            .use('/api', Authentication );

        this.run()
    }

    run() {
        // Create HTTP server.
        this.api.set('port', this.port );

        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        this.listener.on('error', error => { this.__handleListenerError( error ) });
        this.listener.on('listening', event => { this.__handleListenerListening() });
    }

    // Internal methods
    __corsHandler( request, response ) {
        // CORS Requests send and options request first, this is the response
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.sendStatus( 200 );
    }

    __dataPath( userid ) {
        return `${Path.dirname( FileSystem.realpathSync(__filename))}/data/${userid}`
    }

    __handleListenerError( error ) {
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

    __handleListenerListening() {

        let addr = this.listener.address();
        let bind = typeof addr === `string`?`pipe ${addr}`:`port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }
}

const server = new Server()

/** @licence:
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */