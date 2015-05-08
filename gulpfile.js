'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');

function restartTime () {
	function checkTime(i) {
        return (i < 10) ? '0' + i : i;
    }
	var today = new Date(),
		hrs = checkTime(today.getHours()),
		min = checkTime(today.getMinutes()),
		sec = checkTime(today.getSeconds());

	return hrs + ':' + min + ':' + sec;
}

gulp.task('watch', function () {
	nodemon({ script: 'server.js', ext: 'jade js css' })
		.on('restart', function() {
			console.log('Server restarted at ' + restartTime() + '!');
		});
});

gulp.task('minify', function () {
	gulp.src('./app/css/*.sass')
		.pipe(sass({
			indentedSyntax: true,
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./app/css'))
		.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./public/css'));

	gulp.src(['./public/scripts/angular.js', './app/directives/materialRipple.js', './app/controllers/linkCtrlr.client.js', './app/controllers/commentCtrlr.client.js'])
		.pipe(concat('site.js'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('default', ['watch']);
