var Comment = require('../models/comment');

module.exports.list = function (req, res) {
	Comment
	.find({})
	.sort({ '_id': -1 })
	.limit(5)
	.exec(function (err, results) {
		if (err) throw err;

		res.json(results);
	});
};

module.exports.create = function (req, res) {
	var comment = new Comment(req.body);

	comment.save(function (err, results) {
		if (err) throw err;

		res.json(results);
	});
};