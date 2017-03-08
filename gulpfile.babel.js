import gulp from 'gulp'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import rollup from 'gulp-rollup'
import del from 'del'

gulp.task('clean', cb => {
  del(['dist', 'lib']).then(() => cb())
})

gulp.task('build:dist', ['clean'], () => {
  return gulp.src('./src/**/*.js')
    .pipe(rollup({
      entry: 'src/index.js',
      format: 'cjs',
      plugins: [buble()]
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:lib', ['clean'], () => {
  return gulp.src('./src/**/*.js')
    .pipe(rollup({
      format: 'cjs',
      plugins: [buble()]
    }))
    .pipe(gulp.dest('./lib'))
})