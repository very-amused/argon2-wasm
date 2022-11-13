import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

const banner = `/**
 * @license
 * @very-amused/argon2-wasm v${pkg.version}
 * MIT License
 * Copyright (c) 2022 Keith Scroggs
 */\n`

export default [
  {
    input: 'src/worker.ts',
    output: [
      {
        file: 'build/worker.js',
        banner
      },
      {
        file: 'build/worker.min.js',
        banner,
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
      format: 'es',
      banner
    },
    plugins: [
      typescript({
        outDir: 'runtime',
        exclude: ['src/worker.ts']
      })
    ]
  }
]
