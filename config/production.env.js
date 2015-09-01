'use strict';

module.exports = {
	env:	process.env.NODE_ENV,

	port:	process.env.PORT || 8080,

	mongo: {
		uri:	process.env.MONGOLAB_URI ||
					process.env.MONGOHQ_URL ||
					undefined
	}
};
