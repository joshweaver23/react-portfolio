var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
  	compress: true,
 		port: 9000,
		stats: 'errors-only'
	},
	plugins: [
		new HtmlWebpackPlugin({
		title: 'Josh Weaver Portfolio',
		minify: {
			collapseWhitespace: true
		},
		hash: true,
		template: './src/index.html'
	}),
	new ExtractTextPlugin('app.css')
	]
}