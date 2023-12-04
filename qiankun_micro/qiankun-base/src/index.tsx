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
