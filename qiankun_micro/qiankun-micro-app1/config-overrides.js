/* config-overrides.js */

// 引入包名称
const { name } = require("./package");

module.exports = {
    webpack: (config) => {
        // 配置输出为 UMD 模块
        config.output.library = `${name}-[name]`;
        config.output.libraryTarget = 'umd';

        // 对于 webpack 5，需要将 jsonpFunction 替换为 chunkLoadingGlobal
        config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
        config.output.globalObject = 'window';

        return config;
    },
    devServer: (_) => {
        const config = _;

        // 配置跨域头
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        // 启用 historyApiFallback 支持单页应用路由
        config.historyApiFallback = true;
        // 关闭热更新
        config.hot = false;
        // 关闭内容观察，提高性能
        config.watchContentBase = false;
        // 关闭实时重新加载
        config.liveReload = false;

        return config;
    },
};
