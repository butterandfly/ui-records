var gulp = require('gulp');

// 合并
var concat = require('gulp-concat');
// 编译scss
var sass = require('gulp-sass');
//
var watch = require('gulp-watch');

var destDir = './project/source/';

// 该任务用于合并、编译scss
gulp.task('sass', function() {
	gulp.src(['./base/**/*.scss', './project/pages/**/*.scss', './project/components/**/*.scss'])
		.pipe(concat('app.scss'))
		.pipe(sass())
		.pipe(gulp.dest(destDir));
})

// 合并project里的js
gulp.task('catjs', function() {
  gulp.src(['./project/services/**/*.js', './project/pages/**/*.js', './project/components/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destDir))
});

// TODO: 未能检测新建文件与文件删除
gulp.task('default', ['sass', 'catjs'], function() {
//	watch({'global': ['.base/base.css', './project/pages/**/*.scss', './project/components/**/*.scss']}, ['sass']);
	gulp.watch(['./base/base.scss', './project/pages/**/*.scss', './project/components/**/*.scss'], ['sass']);
	gulp.watch(['./project/services/**/*.js', './project/pages/**/*.js', './project/components/**/*.js'], ['catjs']);

})
