import typescript from '@rollup/plugin-typescript'
// Import tsconfig but override exclude list
import { include, compilerOptions } from './tsconfig.json'

export default {
  input: 'src/worker.ts',
  output: {
    file: 'demo/static/worker.js'
  },
  plugins: [
    typescript({
      tsconfig: false,
      include,
      ...compilerOptions
    })
  ]
}
