const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
const fs = require('fs')

module.exports = (env, argv) => ({

    /* devtool: none */

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
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
				},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
					],
				exclude: /\.module\.css$/
				},

			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
							}
						}
					]
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
		new CleanWebpackPlugin(), 
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: '[T]PWA Onsen UI',
			template: path.resolve(__dirname, 'static', 'index.html'),
			inject: true
			}),

		new WorkboxPlugin.InjectManifest({
			swSrc: "src/service-worker.js",
			swDest: 'tabik-sw.js',
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


});
