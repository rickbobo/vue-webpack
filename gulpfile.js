const gulp = require('gulp');
const gulpFtp = require('gulp-sftp');
const config = require('./config/');

gulp.task('build', function (callback) {
  require('./build/build')(callback);
});

gulp.task('deploy', ['build'], function (callback) {
  gulp.src(config.build.assetsRoot + '/**').pipe(gulpFtp(Object.assign(config.deploy, {callback})));
});
