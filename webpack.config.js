const path = require('path');

module.exports = () => {
    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, './public/', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, './public/'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};