var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
	email: String,
	comments: String
});

module.exports = mongoose.model('Comment', Comment);
