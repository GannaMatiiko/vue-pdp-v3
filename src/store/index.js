import { createStore } from 'vuex';

import formsModule from './modules/forms.js';
import pagesModule from './modules/pages.js';

const store = createStore({
    modules: {
        forms: formsModule,
        pages: pagesModule,
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        getUserId(state) {
            return state.userId;
        }
    }
});

export default store;