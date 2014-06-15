var gulp    = require('gulp'),
    traceur = require('gulp-traceur'),
    jshint  = require('gulp-jshint');


gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint());
});


gulp.task('scripts', ['lint'], function() {
    return gulp.src(['src/*.js'])
        .pipe(traceur())
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['scripts']);

gulp.task('watch', ['default'], function() {
    gulp.watch(['src/*.js'], ['scripts']);
});