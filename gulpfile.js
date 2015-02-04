var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var compileJsx = function(stream){
    return stream
        .pipe(plumber())
        .pipe(browserify({transform: 'reactify'}))
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('public/'))
};

gulp.task('compile', function () {
    return compileJsx(gulp.src('src/root.jsx'));
});

gulp.task('server', function(){
    return connect.server({port: 8484, livereload: true});
});

gulp.task('default', ['server'], function(){
    return watch('src/**/*.*').on('data', function(file){
        console.log(file.event, ' >> ', file.path);
        compileJsx(gulp.src('src/root.jsx'));
    });
});
