var var_gulp	=	require('gulp'),
	var_less	=	require('gulp-less');

//	npm install gulp-less --save-dev
//	--save-dev сохранение пакета и версии в папку или packaje.json

var_gulp.task('less', function(){
	return var_gulp.src('app/less/**/*.less')
	.pipe(var_less())
	.pipe(var_gulp.dest('app/css'));
});