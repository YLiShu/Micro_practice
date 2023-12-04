# 引言

随着前端应用规模的不断增长，传统的单体应用架构变得难以维护。微前端作为一种架构模式，旨在解决这一问题，将前端应用拆分为更小、更可管理的部分。本文将探讨微前端的概念、优势、实现方式以及一些最佳实践

# 简介

## 什么是微前端

微前端是指存在于浏览器中的微服务，其借鉴了微服务的构架理念，将微服务的概念扩展到了前端。即微前端就是将一个大型的前端应用拆分成多个模块，每个微前端模块可以由不同的团队进行管理，并可以自主选择框架，且拥有自己的仓库，可以独立部署上线。

![未命名文件.jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301350860.jpg)

## 为什么使用微前端

- 工程规模越来越大，打包越来越慢
- 团队成员多，功能复杂，代码冲突频繁，影响面积大，难以维护

一般微前端多应用于企业中的中后台项目，因为企业内部的中后台项目存活时间较长，易演变成一个巨石应用，引起**技术栈落后、编译部署慢**等问题。

**举个🌰**
例如：一个电商平台的后台管理系统由几个模块构成，包括商品管理、库存管理、物流管理等模块。目前需要在此基础上添加订单管理、配送系统等。

- 之前的项目架构

![未命名文件.jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301350334.jpg)

- 引入微前端后

![未命名文件 (2).jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301406234.jpg)

## 微前端的优势

### 团队自治

在公司中，通常团队按照业务进行划分。在没有微前端的情况下，如果几个团队共同维护一个项目，很可能会面临一些问题，例如代码合并冲突、上线时间冲突等。引入微前端后，可以将项目按照业务模块拆分成较小的模块，每个模块由不同的团队负责维护，实现<span style="color:#ff0000">独立开发、独立部署上线</span>。这样一来，团队能够实现自治，显著减少甚至消除与其他团队发生冲突的可能性。

![未命名文件.jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301502615.jpg)

### 兼容老项目

- 若公司中存在`JQuery`或者其他巨石项目，但又不想用旧的技术栈去维护，选择使用微前端的方式去拆分项目是一个很好的选择。
- 另一方面，当技术债阻碍了项目的发展，只能重写时，为了避免完全重写的风险，我们更希望逐个替换旧的模块，这也是大多数团队采用微前端的首要原因。

### 简单、解耦的代码库

- 对于上例，若微前端系统中需要新增一个业务模块时，只需要单独的新建一个项目，至于项目采用什么技术栈，完全由团队自主决定，即使和其他模块采用不同技术栈也不会有任何问题。
- 每个独立的微前端应用源代码通常比单个整体前端代码更为精简。这样的小型代码库对开发人员而言更加简便、易于使用。最关键的是，这有助于避免由于组件之间不应该相互了解而导致的无意和不适当的耦合，从而减少复杂性。

### 独立部署

与微服务类似，微前端的独立可部署性至关重要。这有助于缩小每个部署的范围，从而减少相关风险。无论前端代码在何处托管，每个微前端都应具备自己的持续交付管道，用于构建、测试和将前端代码部署至生产环境。这样的独立性确保了每个微前端都能够独立进行更新和发布，不受其他部分的影响。

![未命名文件 (1).jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301608304.jpg)

### 总结

![未命名文件 (3).jpg](https://gitee.com/yelishu/note/raw/master/noteImgs_2/202311301634606.jpg)

简而言之，微前端的核心思想是将庞大而庞杂的系统分割成更小、更易管理的部分，并清晰定义它们之间的依赖关系。我们的技术选择、代码库、团队以及发布流程都应该能够独立运作和发展，无需过度协调。这种独立性有助于提高开发效率，降低系统维护的复杂性。

# 现有的微前端方案

## iframe

使用`iframe`标签将每个子应用嵌入到父应用中，`iframe`天然具备隔离属性，确保各个子应用相互独立，同时也与父应用隔离。

然而，`iframe`存在一些缺点：
- `URL`不同步：刷新页面时，`iframe`中页面的路由信息会丢失。
- 全局上下文完全隔离：内存变量不共享，导致各子应用之间信息无法直接交互。
- `UI`不同步：例如，如果`iframe`中的页面包含带遮罩层的组件弹窗，遮罩无法全局覆盖整个浏览器，仅在`iframe`内生效。
- 性能较慢：每次子应用进入都需要进行浏览器上下文的重建和资源重新加载，影响加载速度。
  

**举个🌰**

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主应用</title>
</head>

<body>
    <h1>主应用</h1>
    <iframe src="app1.html#page1" width="400" height="300" frameborder="1"></iframe>
    <iframe src="app2.html#page2" width="400" height="300" frameborder="1"></iframe>
    <script>
        // 模拟主应用中的全局变量
        window.sharedVariableMainApp = "Shared Value from Main App";
    </script>
</body>

</html>
```

```html
<!-- app1.html -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App 1</title>
    <style>
        #modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 20px;
            display: none;
        }
    </style>
</head>

<body>
    <h2>App 1 内容</h2>
    <p>当前页面: <span id="currentPage"></span></p>
    <p>来自主页面的共享变量： <span id="sharedVariableMainVal"></span></p>

    <!-- 模拟App1中的共享变量 -->
    <script>
        // 需要通过父来进行数据共享
        // window.parent.sharedVariableApp1 = "应用程序1的共享内容";

        // 子应用之间全局上下文完全隔离
        window.sharedVariableApp1 = "应用程序1的共享内容";
    </script>

    <!-- 在App1中使用遮盖模拟模态 -->
    <div id="modal">
        这是App1中的一个模态
    </div>

    <button onclick="toggleModal()">切换模态</button>

    <script>
        function toggleModal() {
            const modal = document.getElementById('modal');
            modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
        }

        // 根据URL显示当前页面
        document.getElementById('currentPage').innerText = window.location.hash;

        // 获取主页面共享数据
        // 父子应用之间全局上下文完全隔离
        document.getElementById('sharedVariableMainVal').innerText = window.sharedVariableMainApp || "不可用";

        // 需要通过window.parent获取
        // document.getElementById('sharedVariableMainVal').innerText = window.parent.sharedVariableMainApp || "不可用";
    </script>
</body>

</html>
```

```html
<!-- app2.html -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App 2</title>
    <style>
        #modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 0, 0, 0.5);
            color: white;
            padding: 20px;
            display: none;
        }
    </style>
</head>

<body>
    <h2>App 2 内容</h2>
    <p>来自App1的共享变量： <span id="sharedVariableApp1Val"></span></p>
    <p>来自主页面的共享变量： <span id="sharedVariableMainVal"></span></p>

    <!-- 尝试在App2中使用模态覆盖整个浏览器 -->
    <div id="modal">
        这是App2中试图覆盖整个浏览器的模式
    </div>

    <button onclick="toggleModal()">切换模态</button>

    <script>
        function toggleModal() {
            const modal = document.getElementById('modal');
            modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
        }

        // 显示App1中的共享变量
        // 子应用之间全局上下文完全隔离
        document.getElementById('sharedVariableApp1Val').innerText = window.sharedVariableApp1 || "不可用";

        // 需要借助父来获取App1中的共享变量
        // document.getElementById('sharedVariableApp1').innerText = window.parent.sharedVariableApp1 || "不可用";


        // 获取主页面共享数据
        // 父子应用之间全局上下文完全隔离
        document.getElementById('sharedVariableMainVal').innerText = window.sharedVariableMainApp || "不可用";

        // 需要通过window.parent获取
        // document.getElementById('sharedVariableMainVal').innerText = window.parent.sharedVariableMainApp || "不可用";

    </script>
</body>

</html>
```

上例中，由于`UI`不同步，在`App1`和`App2`中点击切换模态时，对应的遮罩样式无法全局覆盖整个浏览器，仅在相应的`iframe`内生效。由于全局上下文完全隔离，在`App2`中无法直接通过`window.sharedVariableApp1`拿到App1中共享的变量；同理，在`App1`和`App2`中也无法直接通过`window.sharedVariableMainApp`拿到主应用共享的变量。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iframe_micro</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        html,
        body {
            width: 100%;
            height: 100%;
        }

        #main_app {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <div id="main_app">
        <h1>This is iframe_micro demo!</h1>

        <iframe frameborder="0" id="micro-frontend-container" width="100%" height="100%"></iframe>
    </div>

    <script>
        // 确保页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function () {
            updateIframeSrc();
        });

        // 监听URL哈希变化
        window.addEventListener('hashchange', function () {
            updateIframeSrc()
        })

        // 更新iframe的src
        function updateIframeSrc() {
            const iframe = document.getElementById('micro-frontend-container');
            const hash = window.location.hash;
            iframe.src = microFrontendsByRoute[hash];
        }

        // 定义不同路由对应的微前端URL
        const microFrontendsByRoute = {
            '': 'https://dewu.com',
            '#h5': 'https://h5.dewu.com',
            '#shihuo': 'https://www.shihuo.cn'
        }
    </script>
</body>

</html>
```

## Single-spa

官网：[https://zh-hans.single-spa.js.org/docs/getting-started-overview](https://zh-hans.single-spa.js.org/docs/getting-started-overview)

`Single-spa`是最早引入微前端概念的框架之一，具备对多种技术栈的兼容性。

在`Single-spa`中，首先在基座中注册所有子应用的路由。当URL发生变化时，`Single-spa`会进行匹配，加载对应的子应用。相较于iframe实现方案，`Single-spa`通过在基座和各个子应用之间共享一个全局上下文，解决了`URL`不同步和`UI`不同步的问题。

然而，`Single-spa`也存在一些缺点：
- **缺乏JS和CSS隔离：** 没有提供足够强大的隔离机制，可能导致子应用间的命名冲突和样式覆盖等问题。
- **配置繁琐：** 需要修改大量配置，包括基座和子应用的配置，不能直接开箱即用。

## qiankun

[qiankun](https://qiankun.umijs.org/zh)是由阿里巴巴开源的一款微前端框架，它旨在解决多个独立前端应用集成开发、构建和部署的问题。以下是`qiankun`的一些主要优势：
- **基于 Single-spa 封装：** `qiankun`基于`Single-spa`进行了二次封装，提供了更加开箱即用的`API`，简化了微前端应用的开发和集成流程
- **技术栈无关：** 完全不受技术栈限制，支持任意技术栈的应用接入，包括`React`、`Vue`、`Angular`、`JQuery`等，使得不同团队可以使用其喜欢的框架进行开发
- **HTML Entry 接入：** 使用`HTML Entry`的方式接入微应用，类似于使用`iframe`，简单易用，降低了集成难度
- **样式和JS隔离：** 实现了样式隔离和`JS`隔离，确保各个微前端应用之间互不影响，解决了传统微前端框架的一些难题
- **资源预加载：** 在浏览器空闲时间预加载未打开的微应用资源，提升了微应用打开速度，优化用户体验。

### 实战

**举个🌰**

假设我们有一个微前端架构的项目，其中包含一个基座（主应用）和三个子应用（`React`、`Vue2`、`Vue3`）。

项目地址：https://github.com/YLiShu/Micro_practice

```shell
|-- qiankun-base // 基座
|-- qiankun-micro-app1 // react子应用，create-react-app创建的react应用
|-- qiankun-micro-app2  // Vue2子应用
|__ sqiankun-micro-app3 // Vue3子应用
```

- **基座（qiankun-base）：** 主要负责集成所有的子应用，提供一个入口，能够访问所需要的子应用的展示，尽量不包含复杂的业务逻辑。
- **子应用：** 根据不同的业务需求划分的模块，每个子应用都打包成`umd`模块的形式，以供基座（主应用）来加载。

#### 基座

此处基座用的是`create-react-app`脚手架加上`antd`组件库搭建的项目，也可以选择`vue`或者其他框架，一般来说，基座只提供加载子应用的容器，尽量不包含复杂的业务逻辑。

**基座改造**
- 安装`qiankun`
```bash
// 安装qiankun
npm i qiankun -S # 或者 yarn add qiankun
```
- 修改入口文件
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { registerMicroApps, start, initGlobalState } from 'qiankun';

// 要加载的子应用列表
const apps = [
  {
    name: 'micro-react', // 子应用名称
    entry: '//localhost:3011', // 默认会加载这个路径下的html，解析里面的js
    container: '#micro-app', // 加载的容器
    activeRule: '/micro-react', // 匹配的路由
  },
  {
    name: 'micro-vue2', // 子应用名称
    entry: '//localhost:3012', // 默认会加载这个路径下的html，解析里面的js
    container: '#micro-app', // 加载的容器
    activeRule: '/micro-vue2', // 匹配的路由
  },
  {
    name: 'micro-vue3', // 子应用名称
    entry: '//localhost:3013', // 默认会加载这个路径下的html，解析里面的js
    container: '#micro-app', // 加载的容器
    activeRule: '/micro-vue3', // 匹配的路由
  }
];

// 注册子应用

registerMicroApps(apps, {
  beforeLoad: [async app => console.log('before load', app.name)],
  beforeMount: [async app => console.log('before mount', app.name)],
  afterMount: [async app => console.log('after mount', app.name)],
});

const state = { count: 1 };

const actions = initGlobalState(state);
// 主项目项目监听和修改
actions.onGlobalStateChange((state, prev) => {
  // state：变更后的状态；prev：变更前的状态
  console.log(state, prev);
})

actions.setGlobalState(state); // 设置全局状态

start(); // 启动qiankun

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

当微应用信息注册完成后，一旦浏览器`URL`发生变化，`qiankun`会自动触发匹配逻辑。所有符合`activeRule`规则的微应用将会被插入到指定的`container`中，同时按顺序调用微应用暴露出的生命周期钩子。

- `registerMicroApps(apps, lifeCycles?)`
	- 注册所有子应用，`qiankun`会根据`activeRule`去匹配对应的子应用并加载
- `start(options?)`
	- 启动`qiankun`，可以进行预加载和沙箱设置

至此，基座的改造完成。如果是老项目或其他框架的项目想改成微前端的方式，也是类似的流程。

#### React子应用

使用`create-react-app`脚手架创建，为了不`eject`所有的`webpack`配置，使用`react-app-rewired`工具来改造`webpack`配置。
- 安装`qiankun`
- 改造子应用入口文件
```tsx
import './public-path'; // 在顶部引入
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

let root: ReactDOM.Root;

// 渲染函数，接收props参数，默认为空对象
function render(props: any = {}) {
  const { container } = props;

  // 创建或获取渲染根节点
  root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.getElementById('root') as HTMLElement);

  // 渲染 React 应用
  root.render(
    <React.StrictMode>

      {/* 使用BrowserRouter包裹App组件
        如果应用在qiankun微前端框架中运行，将basename设置为routerBase，否则使用 默认的"/"作为basename。
        这是因为在qiankun中，子应用可能被部署到不同的路径下，basename用于指定应用的基础 URL。*/}
      <BrowserRouter basename="/micro-react">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// 如果非qiankun微前端框架环境，则执行渲染
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * 微前端的生命周期函数 - bootstrap
 * 用于初始化应用程序
 */
export async function bootstrap() {
  console.log("[react18] react app bootstraped");
}

/**
 * 微前端的生命周期函数 - mount
 * 用于挂载应用程序到指定容器
 * @param props - 微前端传递的属性
 */
export async function mount(props: any) {
  console.log("[react18] props from main framework", props);
  render(props);
}

/**
 * 微前端的生命周期函数 - unmount
 * 用于卸载应用程序
 * @param props - 微前端传递的属性
 */
export async function unmount(props: any) {
  root?.unmount()
}
```

- 在`src`下新增`public-path.js`
```js
/* eslint-disable no-undef */

// 如果应用在qiankun微前端框架中运行，则设置 webpack 的 publicPath,防止资源加载出错
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- 修改`webpack`配置文件
```js
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
```

#### Vue2子应用

##### 创建子应用

```bash
# 创建子应用，选择vue2
npm create qiankun-micro-app2
```

##### 改造子应用

- 安装`qiankun`
- 改造子应用入口
```js
import './public-path';
import router from './router';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue2.0 app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
```

- 在`src`下新增`public-path.js`
```js
/* eslint-disable no-undef */
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- 修改`vue.config.js`
```js
const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package');

// 定义端口号
const port = 3012;

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 指定端口号
    port,
    // 设置跨域请求头
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
  },
})
```

#### Vue3子应用

##### 创建子应用

```bash
# 创建子应用，选择vue3
npm create qiankun-micro-app3
```

##### 改造子应用

- 安装`qiankun`
- 改造子应用入口
```ts
import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 定义 instance 变量的类型为 createApp 的返回类型或 null
let instance: ReturnType<typeof createApp> | null = null;

// 渲染函数，接收 props 参数，默认为空对象
function render(props: any = {}) {
    console.log(props);
    const { container } = props;

    // 创建 Vue 应用实例
    instance = createApp(App);

    // 将应用挂载到指定容器或 '#app'
    instance.use(router).mount(container ? container.querySelector('#app') : '#app');
}

// 如果非qiankun微前端环境，直接执行渲染函数
if (!(window as any).__POWERED_BY_QIANKUN__) {
    render();
}

// 微前端生命周期 - bootstrap 阶段
export async function bootstrap() {
    console.log('[vue] vue3.0 app bootstraped');
}

// 微前端生命周期 - mount 阶段
export async function mount(props: any = {}) {
    console.log(props);
    // 执行渲染函数，并传递 props
    render(props);

    // 将全局状态管理方法绑定到 Vue 应用实例的全局属性中
    instance!.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
    instance!.config.globalProperties.$setGlobalState = props.setGlobalState;
}

// 微前端生命周期 - unmount 阶段
export async function unmount() {
    // 卸载应用
    instance!.unmount();
    // 清空容器内的内容
    instance!._container!.innerHTML = '';
    instance = null;
}
```

- 在`src`下新增`public-path.js`
```js
/* eslint-disable no-undef */
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- 修改`vue.config.js`
```js
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
```

#### 总结

至此，我们已经完成了应用的加载，已经覆盖了react和vue两大框架，angular和jquery的项目也是同理。

### 进阶知识

#### 样式隔离

`qiankun`实现了各个子应用之间的样式隔离，但基座和子应用之间的样式隔离尚未实现，可能存在冲突和覆盖情况。

解决方法：
- 每个应用的样式使用固定的格式
- 通过`css-module`的方式给每个应用自动加上前缀

#### 子应用间的跳转

- 主应用和微应用都使用`hash`模式时，主应用根据`hash`来判断微应用，不用处理跳转问题。
- 在`history`模式下，微应用之间的跳转或微应用跳主应用页面，直接使用微应用的路由实例是不行的。原因是微应用的路由实例跳转基于路由的 `base`。解决方案：
	- 使用`history.pushState()`
	- 将主应用的路由实例通过`props`传给微应用，微应用通过这个路由实例跳转。
	        

具体方案：在基座中复写并监听`history.pushState()`方法并做相应的跳转逻辑

```ts
// 重写函数  
const _wr = function (type: string) {  
  const orig = (window as any).history[type]  
  return function () {  
    const rv = orig.apply(this, arguments)  
    const e: any = new Event(type)  
    e.arguments = arguments  
    window.dispatchEvent(e)  
    return rv  
  }  
}  
​  
window.history.pushState = _wr('pushState')  
​  
// 在这个函数中做跳转后的逻辑  
const bindHistory = () => {  
  const currentPath = window.location.pathname;  
  setSelectedPath(  
    routes.find(item => currentPath.includes(item.key))?.key || ''  
  )  
}  
​  
// 绑定事件  
window.addEventListener('pushState', bindHistory)
```

#### 公共依赖加载

场景：主应用和子应用都使用相同的库或包（如`antd`、`axios`等）时，可以通过`externals`的方式引入，减少资源浪费。

方式：
- 主应用：配置`webpack`的`externals`，并在`index.html`中使用外链引入这些依赖。
- 子应用：同样配置`webpack`的`externals`，并在`index.html`中使用外链引入这些依赖。注意，需要给子应用的公共依赖加上`ignore`属性（自定义属性，非标准属性），`qiankun`在解析时发现`ignore`属性会自动忽略。

以`axios`为例：

```js
// 修改config-overrides.js  
const { override, addWebpackExternals } = require('customize-cra')  
​  
module.exports = override(  
  addWebpackExternals ({  
    axios: "axios",  
  }),  
)
```

```js
<!-- 注意：这里的公共依赖的版本必须一致 -->  
<script ignore="true" src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
```

#### 全局状态管理

虽然各子应用应尽量避免通信，但如果涉及到公共状态或操作，`qiankun`也提供了支持。

`qinkun`通过全局的`GlobalState`来共享数据。基座初始化后，子应用可以监听并修改这个数据。

基座：
```js
// 基座初始化  
import { initGlobalState } from 'qiankun';  
const actions = initGlobalState(state);  
// 主项目项目监听和修改  
actions.onGlobalStateChange((state, prev) => {  
  // state: 变更后的状态; prev 变更前的状态  
  console.log(state, prev);  
});  
actions.setGlobalState(state);
```


子应用：
```js
// 子项目监听和修改  
export function mount(props) {  
  props.onGlobalStateChange((state, prev) => {  
    // state: 变更后的状态; prev 变更前的状态  
    console.log(state, prev);  
  });  
  props.setGlobalState(state);  
}
```