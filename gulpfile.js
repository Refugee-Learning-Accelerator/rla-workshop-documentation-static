// Import libraries
const gulp = require('gulp');
const ts = require('gulp-typescript');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');

gulp.task('default', () => {
  runSequence('build', 'watch');
});

gulp.task('build', ['build-react', 'build-sass'])

gulp.task('build-react', () => {
  return gulp.src('./src/client/index.tsx')
    .pipe(webpack({
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['watch-react', 'watch-sass'])

gulp.task('watch-react', () => {
  gulp.watch('client/src/**/*', ['build-react']);
});

gulp.task('watch-sass', () => {
  gulp.watch('client/scss/**/*', ['build-sass']);
});
