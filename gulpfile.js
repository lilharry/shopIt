let gulp = require('gulp');
let sass = require('gulp-sass');
let minifyCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let changed = require('gulp-changed');


let paths = {
	assets: {
		src: './src/assets/scss/**/*.scss',
		dest: './src/assets/css'
	}
}

function compile(){
	return (
		gulp
		.src(paths.assets.src)
		.pipe(sass()).on('error', sass.logError)
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(changed(paths.assets.dest))
		.pipe(gulp.dest(paths.assets.dest))
	);
}


function watch() {
	compile(); // run on start. 
	gulp.watch(paths.assets.src, compile);
}



const defaultTasks = gulp.series(watch);


exports.watch = watch;
exports.compile = compile;
	
exports.default = defaultTasks;