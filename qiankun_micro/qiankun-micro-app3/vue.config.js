const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package');

// 定义端口号
const port = 3013;

// 导出配置
module.exports = defineConfig({
  // 允许使用 ES Module 语法
  transpileDependencies: true,
  lintOnSave: false,
  // 配置开发服务器
  devServer: {
    // 指定端口号
    port,
    // 设置跨域请求头
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  // 配置 webpack
  configureWebpack: {
    // 设置输出配置
    output: {
      // 定义输出的库名称
      library: `${name}-[name]`,
      // 定义输出的库的目标
      libraryTarget: 'umd',
      // 设置 chunk 加载时使用的全局变量名
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});