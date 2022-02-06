/** @type {import('snowpack').SnowpackUserConfig} */
export default {
  mount: {
    build: '/argon2',
    runtime: '/runtime',
    demo: '/'
  },
  buildOptions: {
    out: 'demo/build'
  }
}