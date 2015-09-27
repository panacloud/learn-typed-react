var gulp = require('gulp'); 
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
 
gulp.task('webserver', ['transpile'], function() {
  connect.server();
});

gulp.task("transpile", function(){
	gulp.src("src/**/*{ts,tsx}").pipe(ts({
                           target: 'ES6'
                       })).pipe(gulp.dest("dest/"));
});

gulp.task('default',['webserver'], function() {
  gulp.watch("src/**/*{ts,tsx}", ['transpile']);
});