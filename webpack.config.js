const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = {
    entry: {
        app: ['babel-polyfill','./devSrc/js/app.js'],
        feedback: ['babel-polyfill','./src/feedback.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle_[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=[path][name].[ext]'
            }
        ]
    },
    externals: [
        (() => {
          var IGNORES = [
            'electron'
          ];
          return (context, request, callback) => {
            if (IGNORES.indexOf(request) >= 0) {
              return callback(null, "require('" + request + "')");
            }
            return callback();
          };
        })()
      ],
    plugins: [
        new ExtractTextPlugin("bundle_style.css"),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // new UglifyJSPlugin()
    ]
};

module.exports = config;