var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function(){
    gulp.src('src/__tests__/tests.js', {read: false})
    .pipe(mocha())
})

gulp.task('default', [
    'test',
]);
