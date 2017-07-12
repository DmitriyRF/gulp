var gulp	=	require('gulp');

gulp.task('mytask', function(){
	return gulp.src('source-files') // take something
	.pipe(plugin()) // do something
	.pipe(gulp.dest('folder')); // put somewhere
});