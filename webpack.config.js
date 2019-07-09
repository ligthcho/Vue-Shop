//由于webpack是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
const path = require('path')
//导入在内存中生成的HTML页面的插件
//只要是插件 都要
const htmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')//Vue Loader v15 现在需要配合一个 webpack 插件才能正确使用：
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html' //指定生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{//这个节点，用于配置 所有 第三方模块
        rules:[//所有第三方模块的匹配规则
            //配置处理css第三方loader规则
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|gif|png|bmp|jpeg)$/,use:'url-loader?limit=5716&name=[hash:8]-[name].[ext]'},//limit 设置小于给定值时才对图片进行编码
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            { test: /\.vue$/, use: 'vue-loader' }//处理 .vue 文件的 loader
        ]
    },
    resolve:{
        alias:{//修改Vue被导入时候的包的路径 vue$ 表示vue结尾的
            //"vue$":"vue/dist/vue.js"
        }
    }
}
//使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
//1.运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
//2.-dev-server生成的bundle.js放在内存中，本地目录是找不到的