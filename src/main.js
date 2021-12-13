import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';

const app = createApp(App);
app.use(router);
app.use(store);

library.add(faPhone, faEdit, faSave, faTrash);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
