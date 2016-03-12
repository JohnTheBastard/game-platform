const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const Define = require( 'webpack' ).DefinePlugin;
const path = require( 'path' );

module.exports = {
	entry: './src/www/public/js/pushesRocksGame/game-control.js',
	output: {
		path: './src/www/public/js/pushesRocksGame/dist',
		filename: 'pushesRocks.bundle.js'
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/views/boxxle/play.ejs'
		}),
//		new Define({
//			API_URL: JSON.stringify( process.env.API_URL || '' )
//		})	
	],
	module: {
		preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			    query: {
			      presets: ['es2015'],
			      cacheDirectory: true,
			    //   plugins: ['transform-runtime']
			    }
			}
		]
	}
};
