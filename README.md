# node-practice
using node to build rest api

### Intallation
- Have NodeJS and NPM installed
- Have Mongo installed ( or have access to a remote mongo server )
- Run `npm install`
- Run `npm start`

### Building a similar project

- Have the latest NodeJS and mongo-db installed

- Install Express Generator<br/>
`$ npm install express-generator -g`

- Generate an app with ejs view engine<br/>
`$ express node-practice --view=ejs`

- Go to project directory and install initial packages<br/>
`$ cd node-practice`<br/>
`$ npm install`

- Install nodemon to track changes and restart server automatically<br/>
    - `$ npm install nodemon --save`
    - Add the following lines to './package.json'<br/>
    <pre>
    "dev": "nodemon --inspect ./bin/www",
    "test-production": "NODE_ENV=production node ./bin/www"</pre>

- Install dotenv and integrate in the system<br/>
    - `$ npm install dotenv --save`
    - place a '.env' and '.env.example' file in './'. Make sure to gitignore the '.env' file. Set the  PORT variable of the app in the files.
    - Add to '/bin/www'<br/>
    `require('dotenv').config();`

- Install mongoose to connect to mongo database<br/>
    - `$ npm install mongoose --save`
    - Add this line to './bin/www'<br/>
    <pre>var mongoose = require('mongoose');</pre>
    - Set the DB_URI in the './.env' file<br/>
    <pre>DB_URI=mongodb://HOST:DB_PORT/node-practice</pre>
    - Add the following code snippet to './bin/www', which ensures we only take requests when the database is online.
    <pre>
    function connect () {
        mongoose.connect(process.env.DB_URI);
        return mongoose.connection;
    }
    connect()
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    function listen () {
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
    }</pre>

- Install passport, bcrypt-nodejs, jsonwebtoken to authenticate users<br/>
    - `$ npm install bcryptjs jsonwebtoken passport passport-jwt --save`
    - Set passport's JWT_SECRET in the './.env' file 
    - Set up authentication with JWT
    - Make sure passport passes failed auths to regular error handler
- Build the rest of the API in regular fasion
