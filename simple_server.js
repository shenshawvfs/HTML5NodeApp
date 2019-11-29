const Express = require('express');
const HTTP = require('http');
const Path = require('path');
const Encrypt = require('bcrypt');

const PORT = 3000;

// Helper classes for use within the server
const ServerResponse = require('./server/server-response.js');
const FileList = require('./server/file-list');  // File management helper

class Server {

    constructor() {
        this.api = Express();
        this.api
            .use( Express.json())
            .use( Express.urlencoded({ extended: false }))
            .use( Express.static( Path.join(__dirname, './') ))
        this.handleGET();
        this.handlePOST();
        this.run();
    }

    handleGET() {
        // GET index page
        this.api.get('/', ( request, response ) => {
            response.sendFile(`${Path.join(__dirname, './')}/index.html`, { title: 'HTML5 App' });
        });

        // GET the editor page
        this.api.get('/tool', ( request, response ) => {
            response.sendFile(`${Path.join(__dirname, './')}/tool/tool.html`, { title: 'HTML5 App Page' });
            //response.render('editor', { title: 'Bunnies & Unicorns Editor' }); // uses the html view renderer
        });
    }

    handlePOST() {
        // POST handler for specific Actions
        // these may best be busted out into separate modules one day - routes
        this.api.post('/api/login', ( request, response ) => {

            // on success, pull together a real response with data (payload) and send it
            let params = request.body;

            /*
            request from the client, already converted to JS object.
                  request.body is the JS object with the requestParams from the client

            Authenticate with username and password
            Here is the actual worker function, this is where you do your server sode processing and
            then generate a json server response to return.

            I'm using bcrypt here, simple form where we use it as teh Encrypt object
                .hash( passwd, rounds, ( err, hash ) => {})
                .compare( testPasswd, hash, ( err, success ) => {})
            */
            const saltRounds = 10;
            let hashedPasswd = Encrypt.hashSync( params.passwd, saltRounds );

            /*
            Here is what we will send back (echo) to the person that called us.
            fill this dictionary with attribute => value pairs, then
            encode as a JSON string, then echo back to caller
            */
            let data = new ServerResponse( -1, "Error: invalid parameters" );

            // Do what you need to do with the info. The following are some examples.
            // This is the real set of actual things we use
            let payload = {
                nickname: (params.nickname === undefined ? "John Doe" : params.nickname),
                id: hashedPasswd
            };

            /*
            Data going back to the client like this...

            responseData = {
                name: "some arbitrary string to help id this data",
                bytes: 0,     // length of the payload in bytes (characters in the string)
                payload: {}, // actual data you want to return to the client, any JS object will do, 4K max size
                error,       // and error code, 0 == no error, all others should indicate where/ what the error is
                errMsg,      // optional error message for the code
            }

            this return structure enables the client to JSON.parse/$.parseJSON the response and then check the error
            attribute to see if the payload is valid...

                // client code
                let response = JSON.parse( responseString );
                if (response.error)
                    // handle the error

            */
            data.update( 0, `You are logged in ${payload.nickname}.`, payload );
            response.send( data.serialized() )
        });

        //  /api/logout
        this.api.post('/api/logout', ( request, response ) => {

            // one more time, without all the long winded comments...
            let params = request.body;
            let data = new ServerResponse( -1, "Error: Missing folder or files" );

            let payload = { // actual data the client asked for
                nickName: params.nickName,
                status: "Logged Out",
            };

            data.update( 0, "Error: OK", payload )
            response.send(  data.serialized() )
        });

        //  /api/validate
        this.api.post('/api/validate', ( request, response ) => {

            let params = request.body;
            let data = new ServerResponse( -1, "Error: Invalid Data" );

            let payload = params;  // Just in this demo case, make a copy of the parameters
            if ( payload.favorite_beverage != "" &&
                payload.favorite_restaurant != "" &&
                (payload.gender == "male" || payload.gender == "female" || payload.gender == "unknown")) {

                payload.json = JSON.stringify( payload );
                data.update( 0, "Valid Data", payload)
            }

            response.send(  data.serialized() )
        });
    }


    _handleListenerError( error ) {
        /**
         * Listen on provided port, on all network interfaces.
        */
        if (error.syscall !== 'listen')
            throw error;

        // handle specific listen errors with friendly messages
        let bind = typeof port === `string`?`Pipe ${port}`:`Port ${port}`;
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

    _handleListenerListening() {

        let addr = this.listener.address();
        let bind = typeof addr === `string`?`pipe ${addr}`:`port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

    run() {
        // Create HTTP server.
        this.api.set('port', PORT );

        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        this.listener.on('error', error => { this._handleListenerError( error ) });
        this.listener.on('listening', () => { this._handleListenerListening() });
    }
}

const server = new Server();