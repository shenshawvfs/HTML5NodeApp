/*
Node Express Server (MEVN Stack)
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
'use strict';

import Express from 'express'
import Path from 'path'

const Router = Express.Router();

/* GET home page. */
Router.get('/', ( request, response, next ) => {

    /**
     * request.params vs request.query vs request.data
     */
    const url = `${Path.join(__dirname, '../client/index.html')}`;
    response.sendFile( url, { title: "App" });
})

/* GET editor home */
Router.get('/editor', ( request, response, next ) => {
    // GET the editor page
    console.log("fetching editor");
    const url = `${Path.join(__dirname, './editor/index.html')}`;
    response.sendFile( url, { title: "Editor"});
})

export default Router