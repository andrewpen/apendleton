'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
  browserSync = require('browser-sync'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css');


// Lint JavaScript
gulp.task('jshint', function() {
  gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

// Optimize images
gulp.task('images', function() {
  gulp.src('source/img/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'source/css/**/*.css'
  ])
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    // Concatenate and minify styles
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
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
gulp.task('serve', ['jshint', 'images', 'copy-fonts', 'copy'], function() {
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
  gulp.watch(['source/css/**/*.css'], ['styles', browserSync.reload]);
  gulp.watch(['source/images/**/*'], browserSync.reload);
});


gulp.task('default', ['jshint', 'copy-fonts', 'copy']);