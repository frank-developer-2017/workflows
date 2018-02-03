var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat')
;

/* coffeescript from components/coffee */
var coffescript = ['components/coffee/tagline.coffee'];

/* javascript-files from  components/script */
var jsSouces = [
  'components/scripts/script1.js',
  'components/scripts/script2.js',
  //'components/scripts/tagline.js'
];

gulp.task( 'coffee', function()
{
    gulp.src( coffescript )
    .pipe(
      coffee(
        { bare: true }
      )
    )
    .on( 'error', gutil.log )
    .pipe( gulp.dest( 'components/scripts' ) )
});

gulp.task( 'js', function()
{
  gulp.src( jsSouces )
  .pipe( concat('script.js') )
  .pipe( gulp.dest( 'builds/development/js' ) )
});



// gulp.task('log', function()
// {
//   gutil.log('Workflow is ready');
// });
