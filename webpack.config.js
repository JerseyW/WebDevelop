/**
 @author: Jersey
 @create: 2021-11-27 13:55
 @version: V1.0
 @slogan: 业精于勤,荒于嬉;行成于思,毁于随。
 @description: webpack 的配置文件
 */
const {resolve} = require("path");

const  HtmlWebpackPlugin = require("html-webpack-plugin");
const  {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css 从js 中提取，IE浏览器必须要提取否则无法识别js中的css
 module.exports = {
    entry:"./src/index.ts",
    output:{
        filename:  "js/bundle.js",
        path: resolve(__dirname,"dist"),
        chunkFilename: "js/[name].[chunkhash].js",
        clean: true,
        environment: {
             arrowFunction:false,//webpack不使用箭头函数,让IE下通过
             const: false //webpack不使用const声明变量兼容IE

        }
    },
     module: {
         rules: [
             {
                  test:/\.ts$/,
                  use: [

                     {
                         loader:"babel-loader",
                         options: {
                               presets:[
                                   [
                                       '@babel/preset-env',
                                       {
                                           useBuiltIns:"usage",
                                           //处理babel 无法处理的高级语法比如promise
                                           corejs:{
                                               version:3
                                           },
                                           targets:{
                                               chrome: '60',
                                               firefox: '60',
                                               ie: '9',
                                               safari: '10',
                                               edge: '17'
                                           }
                                       }
                                  ]
                               ]
                         }
                     },
                     "ts-loader"
                 ],
                 exclude: /node_modules/,
                 include: /src/
             },
             {
                 test: /\.less$/,
                 use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                         {
                             loader: "postcss-loader",
                             options: {
                                 postcssOptions:{
                                     plugins: [
                                         [
                                             'postcss-preset-env',
                                             {
                                                 ident: "postcss",
                                                 browsers: "last 2 version" // 或者简单写法 或者在package。json配置browserslist
                                             }
                                         ]
                                     ]

                                 }
                             }
                         },
                        "less-loader"
                  ],
                 include: /src/
             }
         ]
     },
     plugins: [
         new HtmlWebpackPlugin({
             template: "./src/index.html",
             hash: true,
             filename: "index.html",  // 打包出来的html文件名称,
             minify: {
                 //移除注释
                 removeComments: true
             },
         }),
         new MiniCssExtractPlugin({
             filename: "index.css"
         }),
         new CleanWebpackPlugin()
     ],
     mode: "development",
     devtool: "eval-source-map", //更据打包代码出错可定位源代码的位置,
     resolve: {
         //配置省略文件名路径的后缀 默认情况下，TS文件之间互相引入是不支持的，因此需要进行模块化设置：
         extensions: [".js",".ts"],
         //告诉webpack 解析模块默认从哪个目录找,若找不到从上层目录继续找
         modules: [resolve("../node_modules"),"node_modules"]
     },
     devServer: {

         host:"127.0.0.1",
         port:3000,
         hot:true,
         bonjour:{
             type:"http",
             protocol:"udp"
         },
         allowedHosts:"auto",
         static:{
             directory:resolve(__dirname,"dist"),
             watch:{
                 ignored:/node_modules/,
                 usePolling:false
             },
             serveIndex:true
         },
         compress:true,
         client:{
             logging:'none',
             overlay:{
                 errors:true,
                 warnings:false
             },
             reconnect:3
         },
         proxy:{
             '/api':{
                 target:'http://loaclhost:3000',
                 PathRewrite:{
                     '^/api':""
                 }
             }
         }
     }
 }