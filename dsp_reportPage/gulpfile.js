var gulp = require('gulp');

var concat = require('gulp-concat');

function buildProjectByName(name) {
	// 压缩js
	gulp.src(['./project/' + name + '/pages/**/*.js', './project/' + name + '/components/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./project/' + name + '/source/'));

	// 压缩css
	gulp.src(['./project/' + name + '/pages/**/*.css', './project/' + name + '/components/**/*.css'])
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./project/' + name + '/source/'));
}

gulp.task('projects', function() {
	buildProjectByName('A-0');
	buildProjectByName('B-0');
	buildProjectByName('z-0');
});

gulp.task('default', ['projects'], function() {
	// gulp.watch(['pages/*/*.js', 'components/*/*.js'], ['scripts']);
	// gulp.watch(['pages/*/*.css', 'components/*/*.css'], ['css']);

	// 测试
//	gulp.src(['./project/' + 'A-0'+ '/pages/*/*.js', './project/' + 'A-0' + '/components/*/*.js'])
//		.pipe(concat('app.js'))
//		.pipe(gulp.dest('./project/' + 'A-0'+ '/source/'));
})

// -------

gulp.task('scripts', function() {
  gulp.src(['pages/*/*.js', 'components/*/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./source/'))
});

gulp.task('css', function() {
  gulp.src(['base/**/*.css', 'pages/*/*.css', 'components/*/*.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./source/'))
});

