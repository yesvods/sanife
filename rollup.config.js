import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

module.exports = {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/',
      format: 'cjs',
    }
  ],
  plugins: [buble()]
}