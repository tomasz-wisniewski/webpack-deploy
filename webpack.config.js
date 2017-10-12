var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    // lista dependencies z package.json
    'faker','lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js', // [name] sie bierze z entry: bundle lub vendor
                                           // [chunkhash] hash na koncu pliku aby sie nie cache'owal
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] // sprawdza czy cos z vendorow nie dostalo sie do bundla i wstawia je tylko do vendora
                                          // manifest informuje o tym czy vendor sie zmienilo
        }),
        new HtmlWebpackPlugin({
            // wkleja pliki js przed </body> do szablonu src/index.html i wrzuca go do /dist/index.html
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            // React sprawdza czy zmienna "process.env.NODE_ENV" = "production" w window przegladarki
            // przez co nie bedzie sprawdzal szczegolowo wszystkich bledow
            // process.env.NODE_ENV musi byc ustawioeny na serwerze, np w package.json w komendzie "build"
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
