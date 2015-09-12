'use strict';

// var ClickHandler = require('../app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
   // var clickHandler = new ClickHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });
};
