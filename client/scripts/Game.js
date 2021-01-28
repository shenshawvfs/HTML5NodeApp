/**
 * Game Singleton MAIN
 * 
 * @copyright: (C) 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author:    Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version:   1.2.0
 * 
 * @summary:   Framework Singleton Class to contain a web app
 * 
 */
'use strict';

// Constants
var SECONDS_AS_MS      = 1000;   
var TARGET_FPS         = 60;
var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
var UPDATE_MIN_MS      = 2000;

export default class Game {
	
    constructor() {
        // the local object contains all the private members used in this class       
        let my = this.__private__ =  {            
            tick:  0,  // Start with tick 0
            start: null
        };
    
        $('#nickname-form').on('submit', event => {            
            event.preventDefault();
            
            let request = $(event.target).serialize();                
            $.post('server/login', request )
                .then( jsonResponse => {
                    
                    let result = $.parseJSON( jsonResponse );
                    if (result.error)
                        return;
                    
                    $('#results-area').html( result.msg );    
                });
        });
        
        // Async/Await version
        /*
        $('#nickname-form').on('submit', async event => {            
            event.preventDefault();
            
            let request = $(event.target).serialize();                
            let jsonResponse = await $.post('server/login', request );
            
            let result = $.parseJSON( jsonResponse );
            if (result.error)
                return;
            
            $('#results-area').html( result.msg );    
        });
        */
    }
        
    iterate() {
		// This is the simplest loop possible. - use Game.js for an app that needs a more complex render loop
        let my = this.__private__;
        
        interval = setInterval( event => {
        	
        	this.update();
        	this.render();
        	
        }, TARGET_MS_PER_TICK );
	}
    	   
	run( timeElapsed ) {
        let my = this.__private__;
        
        if (!my.start) 
            my.start = timeElapsed;
        
        let progress = timeElapsed - my.start;
        this.update( progress );
        this.render( progress )
        
        if (progress < UPDATE_MIN_MS)
	    	    
	    window.requestAnimationFrame( deltaTime => { this.run( deltaTime ) });
	}

	
	update( timeElapsed ) {
        //Update the app/simulation model 
    }

    
    render( timeElapsed ) {
        // Refresh the view - canvas and dom elements       
    }
        
}


