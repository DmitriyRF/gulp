var gulp				=	require('gulp'),
	less				=	require('gulp-less'),
	path 				=	require('path'),
	browserSync			=	require('browser-sync'),
	concat				=	require('gulp-concat'),//объединение всех файлов в одни
	uglify				=	require('gulp-uglifyjs');//сжатие файлов
		
//	npm install gulp-less --save-dev
//	--save-dev сохранение пакета и версии в папку или packaje.json

gulp.task('less', function(){
	return gulp
	.src('app/less/**/*.less')
	.pipe(less({ 
		paths: [ path.join(__dirname)]  
	})
// 	.on('error', function(err) {
//	      console.log(err);
//	})
    )
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch',['browserSync', 'less', 'scripts'], function(){
	gulp.watch('app/less/**/*.less', [less]);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function(){
	return gulp
	.src([
			'app/assets/jquery/dist/jquery.min.js',
			'app/assets/magnific-popup/dist/jquery.magnific-popup.min.js',
			'app/assets/bootstrap/dist/js/bootstrap.min.js'
	])
	.pipe(concat('assets.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});