const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;



module.exports = {
  devtool: 'eval-cheap-source-map',
  mode: 'development',
  context: path.resolve(__dirname, "./src"),
  entry: {
    main: 'main',
    main2: 'main2',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[fullhash].js',
    // assetModuleFilename: '[name][ext]',
    assetModuleFilename: 'img/[hash][ext][query]'
  },
  stats: {
    children: true,
  },
  devServer: {
    compress: true,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
    // stats:{
    //   assets: true, //加入資源訊息
    //   cached: false, //加入暫存(但未建構) 模塊的訊息
    //   chunks: false, //加入 chunk 訊息 (設置為`false`則允許較少的冗長輸出)
    //   children: true,
    //   chunkModules: false, //將建構模塊訊息加入到chunk訊息
    //   chunkOrigins: false,
    //   color: true, //等同`wepack --colors`
    //   hash: false,
    //   modules: false,
    //   reasons: false,
    //   source: false,
    //   version: false,
    //   warnings: falsenp
    // },
    stats: 'verbose',
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/object'),
      path.resolve('src/scss'),
      path.resolve('src/img'),
      path.resolve('src/img/leading_page'),
      path.resolve('src/img/lightbox_page'),
      path.resolve('src/assets'),
      path.resolve('node_modules')
    ],
    extensions: ['.js']
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
          options: {
            //minimize: false,
          }
        }]
      },
      // {
      //   test: /\.html$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '[name][ext]',
      //   },
      // },
      // {
      //   test: /\.html$/i,
      //   use: ['extract-loader', 'html-loader'],
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   type: 'asset/resource',
      //   use: [{
      //       // loader: "file-loader",
      //       // options: {
      //       //   esModule: false,
      //       //   limit: 8192, // size <= 1kib
      //       //   name: '[name].[hash].[ext]',
      //       //   publicPath: 'assets',
      //       //   outputPath: 'assets/img'
      //       // }
      //       loader: 'file-loader',
      //       options: {
      //         //name: '[path][name].[ext]',
      //         outputPath: 'img',
      //         //esModule: false,
      //       }
      //     },/* {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         // 只在 production 環境啟用壓縮 (第二步)
      //         disable: process.env.NODE_ENV === 'production' ? false : true,
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.9],
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         webp: {
      //           quality: 75, // 配置選項表示啟用 WebP 優化器
      //         },
      //       },
      //     },*/
      //   ]
      // },
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
        test: /\.(wolf|wolf2|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash:8]',
          }
        }]
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
      filename: 'index.html',
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
