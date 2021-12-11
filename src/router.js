import { createRouter, createWebHistory } from 'vue-router';

import AddFormGroup from './components/forms/AddFormGroup.vue';
import FormGroupsList from './components/forms/FormGroupsList.vue';
import FieldgroupCard from './components/forms/FieldgroupCard.vue';
import FormTemplate from './components/forms/FormTemplate.vue';

import NotFound from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', component: Home },
        // { path: '/pages-list', component: PagesList },
        // { path: '/page/:url', component: Page, name: 'page' },
        { path: '/forms-list', component: FormGroupsList },
        { path: '/add-form-group', component: AddFormGroup},
        { path: '/add', component: FormTemplate},
        { path: '/edit/:id', component: FormTemplate},
        { path: '/fieldgroup-card/:id', component: FieldgroupCard},
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

export default router;