// vite.config.js
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals' //lmw add 2c
import copy from 'rollup-plugin-copy' //引入插件
import path from 'path'
import { UserConfigExport } from 'vite'
console.log('config loaded')

const buildDir = path.resolve(__dirname, './dist')
console.log('builddir', buildDir + '/build')
const defaultConfig: UserConfigExport = {
  plugins: [
    copy({
      targets: [
        { src: './popup.html', dest: './dist' }, //执行拷贝
        {
          src: './manifest.json',
          dest: './dist',
          transform: (contents, filename) => contents.toString().replace(/\/\*(.*?)\*\/|\/\/(.*)/g, ''),
        }, //执行拷贝
        {
          src: './src/assets/*',
          dest: 'dist/assets'
        }
      ],

      hook: 'writeBundle',
      verbose: true
    })
  ],
  build: {

    //npm add -D terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
      },
      format: {
        comments: false
      },
    },
    sourcemap: false,

    //打包文件按照类型分文件夹显示
    rollupOptions: {
      external: [
        'vue',
        'element-ui'
      ],
      input: {
        //main: path.resolve(__dirname, './index.html'),
        background: path.resolve(__dirname, './src/background.ts'),
        popup: path.resolve(__dirname, './src/popup.ts'),
        content: path.resolve(__dirname, './src/content.ts')
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: '[name].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },

    },
  },


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
export default defineConfig(({ command, mode, ssrBuild }) => {
  // 读取NODE_ENV数据
  const env = loadEnv(mode, process.cwd(), '')
  console.log('command', command, mode)
  const config = { ...defaultConfig }

  if (command === 'serve') {

    return {
      ...config
    }
  } else {
    return {
      ...config
    }
  }
  return {
    ...config
  }
})

const config = {
  build: {
    // rollupOptions: {
    //   external: ['pixi'],
    //   plugins: [
    //     externalGlobals({
    //       pixi: 'PIXI',
    //     }),
    //   ],
    // },
    //打包环境移除console.log，debugger
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    //打包文件按照类型分文件夹显示
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
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

// copy({
//   targets: [
//     { src: './popup.html', dest: 'dist/abc' }, //执行拷贝
//   ],
//   verbose: true
// })
