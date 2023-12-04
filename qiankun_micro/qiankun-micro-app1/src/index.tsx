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