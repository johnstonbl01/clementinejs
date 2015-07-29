'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	del = require('del');

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

gulp.task('clean', function (cb) {
	del(['dist/**/*', '!dist/{Procfile,.git*}'], cb);
});

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

	gulp.src(['./public/scripts/angular.js', './app/directives/**/*.js', './app/controllers/**/*.client.js'])
		.pipe(concat('site.js'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('dist', ['clean', 'minify'], function () {
	gulp.src([
		'public/**/*',
		'!public/{lib{,/**/*},scripts/angular.js}'
	], { base: 'public' })
	  .pipe(gulp.dest('dist/public'));

	gulp.src([
		'app/**/*',
		'!app/css{,/**/*}',
	  '!app/controllers/**/*.client.js',
		'!app/directives{,/**/*}'
	], { base: 'app' })
	  .pipe(gulp.dest('dist/app'));

	gulp.src(['bower.json', 'package.json', 'server.js'])
	  .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'minify', 'dist']);

gulp.task('default', ['watch']);
