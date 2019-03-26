const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const terser = require('gulp-terser');
const gulp = require('gulp');
const rename = require('gulp-rename');
const prettyError = require('gulp-prettyerror');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
gulp.task('sass', function(done) {
 gulp
   .src('./sass/style.scss', { sourcemaps: true })
   .pipe(sourcemaps.init())
   .pipe(prettyError())
   .pipe(sass())
   .pipe(
     autoprefixer({
       browsers: ['last 2 versions']
     })
   )
   .pipe(gulp.dest('./build/css'))
   .pipe(cssnano())
   .pipe(rename('style.min.css'))
   .pipe(sourcemaps.write('../maps'))
   .pipe(gulp.dest('./build/css'));
 done();
});
gulp.task('lint', function() {
 return (
   gulp
     .src(['./js/*.js'])
     // Also need to use it here...
     .pipe(prettyError())
     .pipe(eslint())
     .pipe(eslint.format())
     .pipe(eslint.failAfterError())
 );
});
gulp.task(
 'scripts',
 gulp.series('lint', function() {
   return gulp
     .src('./js/*.js')
     .pipe(terser())
     .pipe(
       rename({
         extname: '.min.js'
       })
     )
     .pipe(gulp.dest('./build/js'));
 })
);
gulp.task('browser-sync', function(done) {
 browserSync.init({
   server: {
     baseDir: './'
   }
 });

 gulp
   .watch(['*.html', 'build/css/*.css', 'build/js/*.js'])
   .on('change', browserSync.reload);
 done();
});
gulp.task('watch', function(done) {
 gulp.watch('js/*.js', gulp.series('scripts'));
 gulp.watch('sass/*.scss', gulp.series('sass'));
 done();
});
gulp.task('default', gulp.parallel('browser-sync', 'watch'));


