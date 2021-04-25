import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/worker.ts',
  output: [
    {
      file: 'out/worker.js'
    },
    {
      file: 'out/worker.min.js',
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [
    typescript()
  ]
}
