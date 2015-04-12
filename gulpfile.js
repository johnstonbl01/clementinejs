var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css');

var currentTime = new Date();

gulp.task('watch', function () {
	nodemon({ script: 'server.js', ext: 'jade js css' })
		.on('restart', function() {
			console.log('Server restarted at ' + currentTime.getHours() + ':' + currentTime.getMinutes() + '!');
		});
});

gulp.task('sass', function () {
	gulp.src('./app/css/*.sass')
		.pipe(sass({
			indentedSyntax: true,
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./app/css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['watch']);