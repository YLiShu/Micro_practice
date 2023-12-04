import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件
import List from '../views/List.vue';
import Detail from '../views/Detail.vue';

// 使用 VueRouter 插件
Vue.use(VueRouter);

// 定义路由
const routes = [
    { path: '/', name: 'List', component: List },
    { path: '/detail', name: 'Detail', component: Detail }
];

// 创建路由实例
const router = new VueRouter({
    base: '/micro-vue2',
    mode: 'history',
    routes
});

export default router;
