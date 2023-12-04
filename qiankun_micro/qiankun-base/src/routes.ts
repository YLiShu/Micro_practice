import Home from "./pages/Home";

const routes = [
    {
        path: '/',
        key: 'main-app',
        component: Home,
        title: '首页',
        showMenu: true, // 是否在菜单中显示
    },
    {
        path: '/micro-react',
        key: 'micro-react',
        title: 'micro-react',
        showMenu: true,
    },
    {
        path: '/micro-vue2',
        key: 'micro-vue2',
        title: 'micro-vue2',
        showMenu: true,
    },
    {
        path: '/micro-vue3',
        key: 'micro-vue3',
        title: 'micro-vue3',
        showMenu: true,
    }
];

export default routes;