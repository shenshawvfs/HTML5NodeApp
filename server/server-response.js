/**
 * ServerResponse
 *
 * @copyright: (C) 2014-2022 Kibble Online Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.2.0
 *
 */
'use strict';

export default class ServerResponse {

    constructor( error = 0, errMsg = "No Error" ) {

        let my = this.__private__ = {
            name: "",
            bytes: 0,
            payload: {},
            error,
            errMsg,
        }
        this.update( error, errMsg );
        this.payload = {};  // use a an object so it can be serialized easily
    }

    set name( filename ) { this.__private__.name = filename }

    update( errorCode = 0, errorMessage = "No Error", dataToSend = {} ) {

        let my = this.__private__;

        my.error = errorCode;
        my.errMsg = errorMessage;
        my.payload = dataToSend;
        my.bytes = my.payload.length;
    }

    serialized() { return JSON.stringify( this.__private__ ) }
}
