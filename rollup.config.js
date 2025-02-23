import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import pkg from './package.json' with {type: 'json'}
import { readFileSync } from 'fs'

/**
 * @typedef MemoryParams
 * @property {number} initialMemory
 * @property {number} maximumMemory
 */
/** @type {MemoryParams} */
const memoryParams = JSON.parse(readFileSync('src/memory-params.jsonc')
  .toString().replace(/\/\/.*$/gm, '')) // Remove comments for parsing as valid JSON

const banner = `/**
 * @license
 * @very-amused/argon2-wasm v${pkg.version}
 * MIT License
 * Copyright (c) 2025 Keith Scroggs
 */\n`

// Webassembly pages are 64KiB
const wasmPageSize = 64 * 1024

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
      replace({
        preventAssignment: true,
        __INITIAL_MEMORY__: memoryParams.initialMemory / wasmPageSize,
        __MAXIMUM_MEMORY__: memoryParams.maximumMemory / wasmPageSize
      }),
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
