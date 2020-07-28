var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var minifyCSS = require('gulp-clean-css');
//var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require("gulp-imagemin");
// Reload Browser when save
var browserSync = require('browser-sync').create();
//var replace = require('gulp-replace');
const dir = {
    src: './client',
    dist: './build'
};
gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: "./build"
    });
});
gulp.task('sass', function() {
    return gulp.src(dir.src + '/templates/**/*.scss').pipe(plumber({
        errorHandler: function(error) {
            console.log(error.toString());
            this.emit('end');
        }
    })).pipe(sass()).pipe(gcmq()).pipe(autoprefixer()).pipe(minifyCSS({
        compatibility: 'ie8'
    })).pipe(gulp.dest(dir.dist + '/assets/css')).pipe(browserSync.stream());
});
gulp.task('css', function() {
    return gulp.src(dir.src + '/templates/**/*.css')
        // .on('error', function (error) {
        //   console.log(error.toString());
        // })
        // .pipe(minifyCSS())
        .pipe(gulp.dest(dir.dist + '/assets/css')).pipe(browserSync.stream());
});
gulp.task('img', function() {
    return gulp.src(dir.src + '/templates/images/**/*.{jpeg,jpg,png,svg,gif}').pipe(imagemin()).pipe(gulp.dest(dir.dist + '/assets/images')).pipe(browserSync.stream());
});
gulp.task('jsLib', function() {
    return gulp.src(dir.src + '/javascript/libs/*.js')
        // .pipe(sourcemaps.init())
        // .pipe(concat('libs.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist + '/assets/js')).pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src(dir.src + '/javascript/*.js')
        // .pipe(sourcemaps.init())
        // .pipe(concat('app.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist + '/assets/js')).pipe(browserSync.stream());
});
gulp.task('fileinclude', function() {
    gulp.src([dir.src + '/templates/**/*.html', '!' + dir.src + '/templates/html/**/*.html']).pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    })).pipe(prettify({ indent_size: 4, unformatted: ['pre', 'code'] })).pipe(gulp.dest(dir.dist)).pipe(browserSync.stream());
});
gulp.task('watch', () => {
    gulp.watch(dir.src + '/templates/images/*', ['img']);
    gulp.watch(dir.src + '/templates/**/*.css', ['css']);
    gulp.watch(dir.src + '/templates/**/*.scss', ['sass']);
    // gulp.watch(dir.src+'/templates/**/*.html', ['html']);
    gulp.watch(dir.src + '/templates/**/*.html', ['fileinclude']);
    gulp.watch(dir.src + '/javascript/*.js', ['js']);
    gulp.watch(dir.src + '/javascript/libs/*.js', ['jsLib']);
});
gulp.task('default', ['serve', 'sass', 'css', 'js', 'jsLib', 'img', 'fileinclude']);