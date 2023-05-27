const concat = require('gulp-concat') 
const gulp = require('gulp') 
const autoprefixer = require('gulp-autoprefixer') 
const sass = require('gulp-sass')(require('sass'));
const imagemin=require("gulp-imagemin")
const uglify=require("gulp-uglify")
const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
 
//Copy all HTML files
gulp.task('convertHtml', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task("compileSass",function(){
    return gulp.src("./src/scss/styles.scss")
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css')); 
})

// Convert Images
gulp.task('convertImages', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Minify JavaScript files
gulp.task('minifyJs', function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});




//Watch all gulp tasks
gulp.task('watch', function () {
  browsersync.init({
    server: {
      baseDir: '.',
    },
  });
    gulp.watch('./src/scss/**/*.scss', gulp.series('compileSass',browsersync.reload));
    gulp.watch('*.html', gulp.series('convertHtml'))
    gulp.watch('./src/img/**/*', gulp.series('convertImages'))
    gulp.watch('./src/js/*.js', gulp.series('minifyJs'))
});


