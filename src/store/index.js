import { createStore } from 'vuex';

import formsModule from './modules/forms.js';

const store = createStore({
    modules: {
        forms: formsModule
    }
});

export default store;