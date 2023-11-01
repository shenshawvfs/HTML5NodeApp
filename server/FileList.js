/**
 * FileList
 *
 * @copyright: (C) 2014-2022 Kibble Online Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.2.0
 *
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
}