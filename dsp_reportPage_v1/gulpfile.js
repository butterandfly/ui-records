var gulp = require('gulp');

// 合并
var concat = require('gulp-concat');
// 编译scss
var sass = require('gulp-sass');
//
var watch = require('gulp-watch');

var destDir = './project/source/';

//gulp.task('scripts', function() {
//  gulp.src(['pages/*/*.js', 'components/*/*.js'])
//    .pipe(concat('app.js'))
//    .pipe(gulp.dest('./source/'))
//});

//gulp.task('catcss', function() {
//  gulp.src(['./base/**/*.css', './project/pages/*/*.css', './project/components/*/*.css'])
//    .pipe(concat('app.css'))
//    .pipe(gulp.dest(destDir))
//});

// 该任务用于合并、编译scss
gulp.task('sass', function() {
	gulp.src(['./base/**/*.scss', './project/pages/**/*.scss', './project/components/**/*.scss'])
		.pipe(concat('app.scss'))
		.pipe(sass())
		.pipe(gulp.dest(destDir));
})

// 合并project里的js
gulp.task('catjs', function() {
  gulp.src(['./project/pages/**/*.js', './project/components/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destDir))
});

// 合并
//gulp.task('catcss', ['sass'], function() {
//	gulp.src([destDir + 'css/base.css', destDir + 'css/**/*.css'])
//		.pipe(concat('app.css'))
//		.pipe(gulp.dest(destDir))
//});

gulp.task('default', ['sass', 'catjs'], function() {
//	watch({'global': ['.base/base.css', './project/pages/**/*.scss', './project/components/**/*.scss']}, ['sass']);
	gulp.watch(['./base/base.scss', './project/pages/**/*.scss', './project/components/**/*.scss'], ['sass']);
	gulp.watch(['./project/pages/**/*.js', './project/components/**/*.js'], ['catjs']);

})
