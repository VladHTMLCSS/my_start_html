var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('sass', function() {
	return gulp.src(['app/sass/*.sass', '!app/sass/vars.sass'])
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', function() {
	return gulp.src('app/js/common.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'js'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);