import { createRouter, createWebHistory } from 'vue-router';

import FormGroupsList from './components/forms/FormGroupsList.vue';
import FormTemplate from './components/forms/FormTemplate.vue';

import PagesList from './components/pages/PagesList.vue';
import Page from './components/pages/Page.vue';

import NotFound from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', component: Home },
        { path: '/pages-list', component: PagesList },
        { path: '/page/:url', component: Page, name: 'page' },
        { path: '/forms-list', component: FormGroupsList },
        { path: '/add', component: FormTemplate},
        { path: '/edit/:id', component: FormTemplate},
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

export default router;