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