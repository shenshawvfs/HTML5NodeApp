/**
 * App Singleton MAIN
 *
 * @copyright: (C) 2014-2019 Kibble Online Inc in cooperation with Vancouver Film School. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.2.0
 *
 */
'use strict';


// Constants
const SECONDS_AS_MS = 1000;
const TARGET_FPS = 60;
const TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
const UPDATE_MIN_MS = 2000;


// Define the App Controller
export default class App {

    constructor() {

        // Do some initialization of the member variables for the app
        let my = this.__private__ = {
            done:   false,
            userId: 0,
            dataFromForm: {}
	    };


        // Define the Event handlers for the app
        $('#nickname-form').on('submit', event => {
            event.preventDefault();

            // Do your thing here when the user presses the submit button on this form.
            let requestParams = $(event.target).serialize();
            $.post('/api/login/', requestParams)
                .then( jsonResponse => {
                    // this callback is triggered WHEN we get a response
                    let response = $.parseJSON( jsonResponse );

                    if (!response.error) {

                        my.userId = response.payload.id;
                        $('#results-area').html(`Welcome ${response.payload.nickname}, ${response.errMsg} <br/>`);
                    }
                })
        });

        $("#validate-form").on('submit', event => {
            /*
             Note the calls in the handler MUST use the app class to
             reference the post/response calls so that they can be
             resolved at run time
             */
            event.preventDefault();
            this.__validate( event )
                .then( response => response.payload )
                .then( data => this.__success( data ))
                .catch( response => {

                    my.done = true;
                    console.log(`Form submit failes.<br />`);
                    console.log(`Returned json: ${response.json}` );
                })
            })
    }

	run() {
        // Run the app
	    // One way to make private things easier to read as members
        let my = this.__private__;
        const LONG_POLL = 5000;
        let timer = window.setInterval( time => {

            this.__update();
            this.__render();

        }, LONG_POLL )
	}

    __success( data ) {

        this.dataFromForm = data;

        console.log(`Form submitted successfully.<br />`);
        console.log(`Returned json: ${data.json}` );
    }

    __validate( event ) {

        return new Promise(( resolve, reject ) => {

            let requestParams = $(event.target).serialize();

            $.post('/api/validate', requestParams )
                .then( jsonResponse => {
                    // this callback is triggered WHEN we get a response
                    let response = $.parseJSON( jsonResponse );

                    if (response.error)
                        reject( response );

                    // only get this if the response is error free
                    resolve( response.payload )
                });
        })
	}


	update() {
        // Update the app/simulation model
    	// is the app finished running?
    	let my = this.__private__;
    }

    // Internal Methods
    __render() {
        // Refresh the view - canvas and dom elements
        let my = this.__private__;
        let form = my.dataFromForm;

        // compose the view markup based on JSON data we recieved
        let markup = "Favorite beverage: " + form.favorite_beverage;
        markup += "<br />Favorite restaurant: " + form.favorite_restaurant;
        markup += "<br />Gender: " + form.gender;
        markup += "<br />JSON: " + form.json;

        // Display the markup in the result section
        $("#results-area").html( markup );
    }

}  // Run the unnamed function and assign the results to app for use.
