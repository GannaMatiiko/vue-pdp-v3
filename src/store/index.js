import { createStore } from 'vuex';

import formsModule from './modules/forms.js';
import pagesModule from './modules/pages.js';
import authModule from './modules/auth.js';

const store = createStore({
    modules: {
        forms: formsModule,
        pages: pagesModule,
        auth: authModule
    },
});

export default store;