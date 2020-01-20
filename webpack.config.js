var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* Путь до папки с исходниками */
const pathSrc = './src/'

module.exports = (env) => {
    let config = {
        entry: {},
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ],
                            'sass': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader?indentedSyntax'
                            ]
                        }
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src')
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        devServer: {
            historyApiFallback: true,
            noInfo: true,
            overlay: true,
            host: 'localhost',
            port: 8080,
            open: false,
        },
        performance: {
            hints: false
        },
        devtool: '#eval-source-map'
    }

    /* Список доступных компонентов Vue */
    let components = fs.readdirSync(pathSrc).filter(folder => fs.statSync(pathSrc + folder).isDirectory() && fs.statSync(pathSrc + folder + '/index.js'));

    /* Настройка дополнительных параметров в зависимости от типа сборки */
    if (process.env.NODE_ENV === 'production') {
        config.mode = process.env.NODE_ENV
        config.devtool = '#source-map'
        config.plugins = (config.plugins || []).concat([
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        ])

        if(process.env.npm_config_component) {
            /* Билд всех компонентов */
            let runComponent = process.env.npm_config_component
            config.entry[runComponent] = pathSrc + runComponent;
        } else {
            /* Билд выбранного компонента */
            components.forEach((folder) => {
                config.entry[folder] = pathSrc + folder
            });
        }
    } else if(process.env.NODE_ENV === 'development') {
        config.mode = process.env.NODE_ENV

        /* Установка запускаемого компонента */
        let runComponent = process.env.npm_config_component || components[0]
        config.entry[runComponent] = pathSrc + runComponent;

        /* Создание HTML файла из шаблона */
        if(process.env.NODE_ENV === 'development') {
            config.plugins = (config.plugins || []).concat([
                new HtmlWebpackPlugin({
                    template: pathSrc + runComponent + '/index.html',
                    inject: true
                })
            ])
        }
    }

    return config
}

