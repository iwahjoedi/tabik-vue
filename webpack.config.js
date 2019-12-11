const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const fs = require('fs')
// const rootCas = require('ssl-root-cas/latest').create();
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();


// In the main process.
// const { BrowserWindow } = require('electron')

// const electron = require('electron');
// const BrowserWindow = electron.remote.BrowserWindow;

// let win = new electron.remote.BrowserWindow({ width: 800, height: 600 })

// let win = new BrowserWindow({
    // width: 800,
    // height: 600,
    // webPreferences: {
      // nodeIntegration: true
    // }
// })

// const childWindow = new BrowserWindow({
// });

// rootCas.addFile('rootCA.pem');

module.exports = (env, argv) => ({
  mode: argv && argv.mode || 'development',
  devtool: (argv && argv.mode || 'development') === 'production' ? 'source-map' : 'eval',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  node: false,

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new CleanWebpackPlugin(), //-- this line should be disabled
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
      template: path.resolve(__dirname, 'static', 'index.html'),
      inject: true
    }),

    /** It's auto
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    */
    new WorkboxPlugin.InjectManifest({
      swSrc: "src/service-worker.js",
      swDest: 'salam-sw.js',
    }),
      

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, 'dist'),
      toType: 'dir'
    }]),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    mangleWasmImports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true
  },

  devServer: {
    // liveReload: true,
    hot: true,
    // http2: true,
    compress: true,
    writeToDisk: true,
    // contentBase: path.join(__dirname, 'src'),
    // publicPath: '/static/',
    contentBase: './dist',
    watchContentBase: true,
    host: 'almumtazpontianak.xyz',
    https: true,
    open: true,
    overlay: true,
    port: 9000,
    https: {
        key: fs.readFileSync(`${process.env.LOCAL_USER_KEYS}` + '/almumtazpontianak.xyz.key.pem'),
        cert: fs.readFileSync(`${process.env.LOCAL_USER_CERTS}` + '/almumtazpontianak.xyz.cert.pem'),
        ca: fs.readFileSync(`${process.env.LOCAL_USER_CA}` + '/ca-chain.cert.pem')
    },
  }
});
