var gulp				=	require('gulp'),
	less				=	require('gulp-less');
	browserSync			=	require('browser-sync');
		
//	npm install gulp-less --save-dev
//	--save-dev сохранение пакета и версии в папку или packaje.json

gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
	.pipe(less())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch',['browser-sync', 'less'], function(){
	gulp.watch('app/less/**/*.less', [less]);
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});