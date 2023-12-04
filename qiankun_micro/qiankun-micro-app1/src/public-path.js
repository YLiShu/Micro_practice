/* eslint-disable no-undef */

// 如果应用在qiankun微前端框架中运行，则设置 webpack 的 publicPath
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}