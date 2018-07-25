const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Specify if we are in dev or prod or test
// Production on Heroku, Test in testing, development in dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = (env) => {

    const isProduction = (env === 'production');
    /**
     * TODO: Replace isProduction with NODE_ENV
     * DO NOT replace build scripts, since heroku will set it's own NODE_ENV
     */
    console.log('isProduction', isProduction);
    console.log('NODE_ENV', process.env.NODE_ENV);

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, './public/', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                // Run bable
                // Loader: transforms a file before webpack uses it
                // Test: the files to transform (regex)
                // Exclude: don't modify these files
                // Babel-loader uses the .babelrc configuration file to take arguments
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                // Use scss (and css) and put it into the dom
                // Order matters for the 'use' array
                test: /\.s?css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "styles.css" })
        ],
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, './public/'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};