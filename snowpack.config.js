/** @type {import('snowpack').SnowpackUserConfig} */
export default {
  mount: {
    build: {
      url: '/build'
    },
    runtime: {
      url: '/runtime'
    },
    demo: '/'
  }
}