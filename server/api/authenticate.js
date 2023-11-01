/*
Node Express Server (MEVN Stack)
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
'use strict';

import Express from 'express'
const Router = Express.Router();

import Path from 'path'

Router.post('/login', ( request, response, next ) => {

    const result = {
        error: "OK",
        code: 0,
        payload: {
            ...request.body,
            errMsg: "respond with a resource"
        }
    }
    response.send( result )
});

Router.post('/logout', ( request, response, next ) => {

    response.render('index', { title: 'Bunnies N Unicorns' })
})

Router.post('/validate', ( request, response, next ) => {

    /*let params = {
        ...request.params,  // optional stuff from the actual URI "validate:userid?""
        ...request.query,   // stuff from the query ?a=b&c=d&...
        ...request.body     // JSON data posted...
    }*/
    const result = {
        error: "OK",
        code: 0,
        payload: { ...request.body }
    }

    result.payload.favorite_beverage = "coke";  // change one thing

    response.send( result )
});

export default Router