/*
Node Express Server (MEVN Stack)
Copyright (c) 2019-2020. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
'use strict';

import Path from 'path'
import FileSystem from 'fs'

export default class FileList {

    constructor( userid = "test_user",  relativePath = "") {

        this.relativePath = relativePath;
        this.userid = userid;
        this.fileList = [];
    }

    get fullPath() { return `${Path.dirname( FileSystem.realpathSync(__filename))}/data/${this.userid}${this.relativePath}` }

    fetch() {

        return new Promise(( resolve, reject ) => {
            // Node FS lib, readdir asynchronous, with types returns 'dirent' objects
            FileSystem.readdir( this.fullPath, { withFiletypes: true }, ( err, fnameList ) => {
                    if (err) reject( err );

                    let assert = true;
                    for (let entry of fnameList) {

                        // check each dirent object for the file type json, then add thos base names to the list
                        if (entry.endsWith(".json")) {
                            this.fileList.push( entry.replace(".json",""))
                        }
                    }
                    resolve( this.fileList )
                })
        })
    }


    myThing() {

        return new Promise(( resolve,reject )=>{})
    }

}