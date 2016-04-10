var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require("gulp-notify");
var plumber         = require('gulp-plumber');
var haml            = require('gulp-haml');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

var hamlOptions = {
};

// Compile haml files
gulp.task('html', function() {
  gulp.src(cfg.haml.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(haml(hamlOptions))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.haml.build));
});

gulp.task('html-build', function() {
  gulp.src(cfg.haml.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(haml(hamlOptions))
    .pipe(htmlreplace({
      js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css'
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.haml.build));
});
