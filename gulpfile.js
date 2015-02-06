var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');
var run = require('gulp-run');
var concat = require('gulp-concat');
var downloadatomshell = require('gulp-download-atom-shell');
var stylus = require('gulp-stylus');
var rimraf = require('gulp-rimraf');
var atomshell = require('gulp-atom-shell');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var compileJsx = function(stream){
    return stream
        .pipe(plumber())
        .pipe(react())
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('public/'))
};

gulp.task('clean', function(cb){
    rimraf('./public', cb);
});

var compileStylus = function(stream){
    return stream
        .pipe(stylus())
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest('public/css/'))
};

gulp.task('compileJs', function () {
    return compileJsx(gulp.src('src/root.jsx'));
});

gulp.task('server', function(){
    return connect.server({port: 8484, livereload: true});
});

gulp.task('watchStylus', function(){
    return watch('stylus/**/*.*').on('data', function(file){
        console.log(file.event, ' >> ', file.path);
        compileStylus(gulp.src('stylus/main.styl'));
    });
});

gulp.task('watchJs', function(){
    return compileJsx(watch('src/**/*.*').on('data', function(file){
        console.log(file.event, ' >> ', file.path);
    }));
});

gulp.task('runAtom', function(){
    return gulp.src('./**')
        .pipe(atomshell({
            platform: 'win32',
            version: '0.19.4',
            productName: 'MyApp',
            productVersion: '0.0.1'
        }));
});

gulp.task('downloadatomshell', function(cb){
    downloadatomshell({
        version: '0.19.4',
        outputDir: 'bin'
    }, cb);
});

gulp.task('runAtom', ['downloadatomshell'], function(){
    console.log('>> running atom');
    return run('bin\\atom.exe .').exec();
});

gulp.task('default', ['runAtom', 'clean', 'watchStylus', 'watchJs']);
