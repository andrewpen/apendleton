'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
  browserSync = require('browser-sync');


// Lint JavaScript
gulp.task('jshint', function() {
  gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

// Copy all files at the root level (source)
gulp.task('copy', function() {
  gulp.src([
    'source/*',
    '!source/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
});

// Copy all font files at the root level (source)
gulp.task('copy-fonts', function() {
  gulp.src([
    'source/fonts/*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/fonts'))
});

// Watch files for changes & reload
gulp.task('serve', ['jshint', 'copy-fonts', 'copy'], function() {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'AP',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['source']
  });

  gulp.watch('source/javascript/**/*.js', ['jshint']);
});


gulp.task('default', ['jshint', 'copy-fonts', 'copy']);