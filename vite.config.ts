// vite.config.js
import externalGlobals from 'rollup-plugin-external-globals' //lmw add 2c
//import path from 'path'
console.log('config loaded')
export default {
  build: {
    rollupOptions: {
      external: ['pixi'],
      plugins: [
        externalGlobals({
          pixi: 'PIXI',
        }),
      ],
    },
  },
  plugins: [
    externalGlobals({
      pixi: 'PIXI'
    }),
  ],
  // resolve: {
  //   alias: {
  //     'pixi': 'PIXI'
  //   }
  // },
  // // 配置选项
  // alias: {
  //   // ...略
  //   crypto: 'crypto-js',
  //   pixi: 'PIXI',
  // },
  define: {
    'process.env': {},
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style.less";',
      },
    },
  },
}
