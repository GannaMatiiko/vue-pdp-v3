import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faEdit, faSave, faTrash, faPlus, faLayerGroup, faCopy, faHome } from "@fortawesome/free-solid-svg-icons";

import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

import { defineRule } from 'vee-validate';

defineRule('required', value => {
    if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});

const app = createApp(App);
app.use(router);
app.use(store);

library.add(faPhone, faEdit, faSave, faTrash, faPlus, faLayerGroup, faCopy, faHome);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
