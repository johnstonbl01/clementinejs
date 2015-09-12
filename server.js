'use strict';

var express = require('express');
var db = require('mongodb');

var app = express();

db.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
   app.use('/public', express.static(process.cwd() + '/app/public'));

   app.listen(3000, function () {
      console.log('Node.js listening on port 3000...');
   });
});
