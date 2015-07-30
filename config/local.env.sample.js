'use strict';

// Copy this file to ./local.env.js and modify as needed.

// This file should not be tracked by git.
// Local environmental settings, secrets, and api keys should be stored here.

module.exports = {
	env:	'development',

	port:	9000,

	mongo: {
		uri:	'mongodb://localhost:27017/clementinejs'
	}
};
