'use strict';
require('./app/config/config');
let express = require('express');
let mongo = require('mongodb');
let routes = require('./app/routes/index.js');

let PORT = process.env.PORT || 3000;
let app = express();

mongo.connect(process.env.MONGODB_URI, function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   routes(app, db);

   app.listen(PORT, function () {
      console.log(`Node.js listening on port ${PORT}...`);
   });

});
