# HTML5 NodeJS App
A full HTML5 Web App with a PHP based AJAX server that works as a
base template for HTML5/CSS3 app using jQuery. Update and go. Client & PHP Server.

Fully ES2018 compatible JS Objects with AJAX samples using fetch, async/await and JQuery post/get.  Setup the template by copying all the files to a new folder.

## Download the archive from GitHub link

Open the zip archive and extract the contents into a folder (name the folder the name of your app)
- Rookie mistake: Extract the download from Github to a folder called
```/HTML5NodeApp-master```

There are 2 main apps/servers here. The ```simple_server.js``` file uses raw node ```.sendFile()``` methods to respond to post and get requests. The second uses a more sophisticated routing scheme to render views and server edges.

Start with the ```simple_server```...

1. Get you local node modules up to date
    ```json
    % npm install
    ```
2. Run the app to verify the client works
    ```
    % npm run start
    ```
3. Open a browser and load teh app, then start the cleint inspector.
    ```
    localhost:3000
    ```
    Add breakpoints before and after the ```$.post()``` elements in the constructor.

4. Shut down the server (CTRL-C)
5. Open the ```simple_server.js``` file in VSCode, choose the Debug option and add a breakpoint after each ```this.api.post(...)``` statement.
6. In VSCode, launch the node debugger while simple_server.js is selected
    * note you may have to edit ```launch.json``` so the debugger launches the ```simple_server.js``` file.

7. Refresh ```localhost:3000``` and enter some data. Press validate and follow your data from the client to the server and back.

