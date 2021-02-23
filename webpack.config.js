const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;



module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  context: path.resolve(__dirname, "./src"),
  entry: {
    main: 'main',
    main2: 'main2',
  },
  // target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[fullhash].js',
    // assetModuleFilename: '[name][ext]',
    assetModuleFilename: 'img/[hash][ext][query]'
  },
  devServer: {
    compress: true,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
    stats:{
      assets: true, //加入資源訊息
      cached: false, //加入暫存(但未建構) 模塊的訊息
      chunks: false, //加入 chunk 訊息 (設置為`false`則允許較少的冗長輸出)
      children: true,
      chunkModules: false, //將建構模塊訊息加入到chunk訊息
      chunkOrigins: false,
      color: true, //等同`wepack --colors`
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false,
    },
    // stats: 'verbose',
  },
  resolve: {
    fallback: {
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify")
    },
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/object'),
      path.resolve('src/scss'),
      path.resolve('src/css'),
      path.resolve('src/img'),
      path.resolve('src/img/leading_page'),
      path.resolve('src/img/lightbox_page'),
      path.resolve('src/assets'),
      path.resolve('node_modules')
    ],
    extensions: ['.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          test: /node_modules/,
          name: 'vender',
          chunks: 'initial',
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {      
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
        }]
      },
      // 配置 babel-loader (第一步)
      {
        test: /\.m?js$/,
        // 排除 node_modules 與 bower_components 底下資料 (第二步)
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
        include: path.resolve('.'),
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        include: path.resolve('src/css'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
          //將js字串生成為 style節點
          loader: 'style-loader',
        }, {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        }, {
          //將 css轉化成 CommonJS 模塊
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "precss",
                  "autoprefixer",
                ],
              ],
            },
          }
        }, {
          //將 Sass 編譯成 CSS
          loader: 'sass-loader',
          options: {
            // `dart-sass` 是首选
            implementation: require("sass"),
            sassOptions: {
              fiber: false,
            },
          },
        }],
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.(wolf|wolf2|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash:8]',
          }
        }]
      },
    ],
    
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'//這邊以上是新增
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name]-[fullhash].css',
    }),
    new LinkTypePlugin({
      '**/*.css' : 'text/css'
    }),
    new HtmlWebpackPlugin({
      // title: '海委會一站式入口網站',
      // viewport: 'width=device-width, initial-scale=1.0',
      filename: 'index1.html',
      template: 'index.html',
      chunks: ['vender','main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index2.html',
      template: 'index2.html',
      chunks: ['vender','main2'],
    }),
  ],
  // watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },
};
