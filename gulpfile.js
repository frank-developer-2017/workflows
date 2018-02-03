var gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util' ),
    coffee      = require( 'gulp-coffee' ),
    concat      = require( 'gulp-concat' ),
    compass     = require( 'gulp-compass' ),
    path        = require( 'path' ),
    browserify  = require( 'gulp-browserify' ),
    connect     = require(  'gulp-connect' )
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

gulp.task( 'js', ['coffee'], function()
{
  gulp.src( jsSouces )
  .pipe( concat('script.js') )
  .pipe( browserify() )
  .pipe( gulp.dest( 'builds/development/js' ) )
});

gulp.task( 'compass', function()
{
  gulp.src( 'components/sass/style.scss' )
    .pipe(
      compass( {
          sass  : 'components/sass',
          image : 'builds/development/images',
          style : 'expanded'
      } )
    )
    .on( 'error', gutil.log )
    .pipe( gulp.dest( 'builds/development/css' ) )
});


gulp.task('html', function()
{
  gulp.src( 'builds/development/*.html' )
    //.pipe( connect.reload() )
});

gulp.task('json', function()
{
  gulp.src( 'builds/development/js/*.json' )
    //.pipe( connect.reload() )
});

gulp.task('watch', function()
{
  gulp.watch( 'components/coffee/tagline.coffee', [ 'coffee' ] );
  gulp.watch( 'components/scripts/*.js', [ 'js' ] );
  gulp.watch( 'components/sass/*.scss', [ 'compass' ] );
  gulp.watch( 'builds/development/*.html', [ 'html' ] );
  gulp.watch( 'builds/development/js/*.json', [ 'json' ] );
});

gulp.task( 'default', [ 'coffee', 'js', 'compass', 'html', 'json', 'watch' ] );

// gulp.task('log', function()
// {
//   gutil.log('Workflow is ready');
// });
