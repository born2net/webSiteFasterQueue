/**
 Web site generator via index.html template files
 <!-- MAIN_CONTENT_START -->
 ...
 <!-- MAIN_CONTENT_END -->
 @method compileHeaderFooter
 **/

var gulp = require('gulp');
var express = require('express');
var headerfootergen = require('gulp-header-footer-gen');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
var shell = require('gulp-shell');
var server;

console.log(shell);

gulp.task('exampleBat', shell.task([
    'syncer.bat'
]));

gulp.task('headerFooterGan', function () {

    var opts = {comments: true, spare: true};
    gulp.src('./_source/*')
        .pipe(headerfootergen('./index.html')).on('error', handleError)
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./_html/'))
        .pipe(reload());
});


gulp.task('default', ['headerFooterGan'], function () {
});


//  example of running tasks in sequence, first liveServer and when it's done, run watch
gulp.task('inSequenceExample', function (done) {
    runSequence('liveServer', 'watch', done);
});


gulp.task('liveServer', ['watch'], function () {
    server = express();
    server.use(express.static('C:/msweb/webSiteFasterQueue/'));
    server.listen(8002);
    browserSync({
        proxy: 'localhost:8002'
    });
});

gulp.task('watch', function () {
    console.log('watching source files');
    gulp.watch('./index.html', ['headerFooterGan']);
    gulp.watch('./_source/*.html', ['headerFooterGan']);
    gulp.watch('./css/*', ['headerFooterGan']);
});

function reload() {
    if (1) {
        return browserSync.reload({
            stream: true
        });
    }
    return gutil.noop();
}

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
