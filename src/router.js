import { createRouter, createWebHistory } from 'vue-router';

import FormGroupsList from './components/forms/FormGroupsList.vue';
import FormTemplate from './components/forms/FormTemplate.vue';

import PagesList from './components/pages/PagesList.vue';
import Page from './components/pages/Page.vue';

import UserAuth from './components/auth/UserAuth.vue';

import Home from './components/Home.vue';
import NotFound from './components/NotFound.vue';

import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/pages-list', component: PagesList, meta: { requiresAuth: true } },
        { path: '/page/:url', component: Page, name: 'page', meta: { requiresAuth: true } },
        { path: '/forms-list', component: FormGroupsList, meta: { requiresAuth: true } },
        { path: '/add', component: FormTemplate, meta: { requiresAuth: true } },
        { path: '/edit/:id', component: FormTemplate, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/forms-list')
    } else {
        next();
    }
})

export default router;