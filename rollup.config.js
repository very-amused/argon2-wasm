import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/worker.ts',
    output: [
      {
        file: 'build/worker.js'
      },
      {
        file: 'build/worker.min.js',
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'runtime',
      format: 'es'
    },
    plugins: [
      typescript({
        outDir: 'runtime',
        exclude: ['src/worker.ts']
      })
    ]
  }
]
