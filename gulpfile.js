var gulp				=	require('gulp'),
	less				=	require('gulp-less'),
	path 				=	require('path'),
	browserSync			=	require('browser-sync'),
	concat				=	require('gulp-concat'),//объединение всех файлов в одни
	uglify				=	require('gulp-uglifyjs'),//сжатие файлов
	cssnano				=	require('gulp-cssnano'),
	rename				=	require('gulp-rename'),
	del 				=	require('del'),
	imagemin			=	require('gulp-imagemin'),
	pngquant			=	require('imagemin-pngquant'),
	cache				=	reuqire('gulp-cache');	
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

gulp.task('watch',['browserSync', 'css-libs', 'scripts'], function(){
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

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clean-cache', function() {
	return cache.clearAll();
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

gulp.task('css-libs',['less'], function(){
	return gulp
	.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

gulp.task('build',['clean', 'img', 'less', 'scripts'], function(){
	
	var build_css		=	gulp
		.src([
			'app/css/gulp.css',
			'app/css/libs.min.css',
		])
		.pipe(gulp.dest('dist/css'));

	var build_fonts		=	gulp
		.src(['app/fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));

	var build_js		=	gulp
		.src(['app/js/**/*'])
		.pipe(gulp.dest('dist/js'));

	var build_html		=	gulp
		.src(['app/*.html'])
		.pipe(gulp.dest('dist'));	

});


gulp.task('img', function(){
	return gulp
	.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use:[pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});