import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory('/micro-vue3'),
    routes: [
        {
            path: '/',
            name: 'List',
            component: import('../views/List.vue')
        },
        {
            path: '/detail',
            name: 'Detail',
            component: import('../views/Detail.vue')
        }
    ]
});

export default router;