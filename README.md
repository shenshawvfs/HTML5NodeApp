# HTML5 NodeJS App
A full HTML5 Web App with a PHP based AJAX server that works as a
base template for HTML5/CSS3 app using jQuery. Update and go. Client & PHP Server.

Fully ES2018 compatible JS Objects with AJAX samples using fetch, async/await and JQuery post/get.  Setup the template by copying all the files to a new folder.

## Clone the repo from GitHub link
Run this from the command line or use the url in your Git Client of choice.

```
git clone https://github.com/shenshawvfs/HTML5NodeApp.git <my-local-folder>
```

There are 2 main apps/servers here. The ```simple_server.js``` file uses raw node ```.sendFile()``` methods to respond to post and get requests. The second uses a more sophisticated routing scheme to render views and server edges.

Start with the ```simple_server```...

1. Get you local node modules up to date
    ```
    % npm install
    ```
2. Run the app to verify the client works
    ```
    % npm run start
    ```
3. Open a browser and load the app, then start the client inspector.
    ```
    localhost:4000
    ```
    Add breakpoints before and after the ```$.post()``` elements in the constructor.

4. Shut down the server (CTRL-C)
5. Open the ```simple_server.js``` file in VSCode, choose the Debug option and add a breakpoint after each ```this.api.post(...)``` statement.
6. In VSCode, launch the node debugger while simple_server.js is selected
    * note you may have to edit ```launch.json``` so the debugger launches the ```simple_server.js``` file.

7. Refresh ```localhost:4000``` and enter some data. Press validate and follow your data from the client to the server and back.

### Core Files to Modify
- ```server.js``` It all starts here, run the server first so its waiting for requests, otherwise the client won't start or if run through the OS without a server will fail trying to load data from the server.

- ```./server/index.js``` Server side route handler for requests sent to ```/```.  This is the bit of the server that finds your ```index.html``` and sends it back to the browser.  Also handles any of the static bits (css and images).

- ```index.html``` The single page app markup.  No libraries, no frameworks just one html file to rule them all. Once the server is running the first browser request will trigger a get for this file.  Edit your HTML here.

- ```index.js``` Client side JavaScript. Your ```index.html``` should load this just before the end of the body tag. Client side modules are loaded here, and you application and objects

- ```./scripts``` folders, contains all the client side ECMAScript (JavaScript) modules

