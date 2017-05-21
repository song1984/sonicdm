const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './__js/__main/build/app.js',
    output: {
        path: path.resolve(__dirname, '__js/concat'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        })
    ]
};

module.exports = config;