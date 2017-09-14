import gulp from 'gulp'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import rollup from 'gulp-rollup'
import babel from 'gulp-babel'
import del from 'del'
import webpackStream from 'webpack-stream'
import webpackUglifyPlugin from 'webpack-uglify-js-plugin'
import path from 'path'

gulp.task('clean', cb => {
  del(['dist', 'lib']).then(() => cb())
})

gulp.task('build:dist', ['clean'], () => {

  return gulp.src('src/index.js')
    .pipe(webpackStream({
      module: {
        rules: [{
          test: /\.js$/,
          use: 'babel-loader',
          exclude: path.join(__dirname, 'node_modules'),
        }]
      },
      plugins: [
        new webpackUglifyPlugin({
          cacheFolder: '.tmp'
        }),
      ]
    }))
    .pipe(gulp.dest('./dist'))

  // return gulp.src('./src/**/*.js')
  //   .pipe(rollup({
  //     input: 'src/index.js',
  //     format: 'cjs',
  //     plugins: [buble()]
  //   }))
  //   .pipe(gulp.dest('./dist'))
})

gulp.task('build:lib', ['clean'], () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib'))
})