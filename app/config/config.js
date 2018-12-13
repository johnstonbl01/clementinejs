/*
    Only for development, don't commit config.json
    This file runs at the start and configures all the environment variables 
    only for development.

    For Production, Make sure to set up all the global variables in the config.json
    as set as global variables in your server like aws, gcp, heroku etc.
*/

let env = process.env.NODE_ENV || 'development';
console.log('******' + env + '*******');

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

