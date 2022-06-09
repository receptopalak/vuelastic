import {
    createApp
} from 'vue'
import App from './App.vue'
import router from '@/routes'
import route from '@/routes/currentRoute'
import store from '@/store'
import appAxios from './utils/appAxios'
import VueGoodTablePlugin from 'vue-good-table-next';
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(route);
app.use(BootstrapVue3)
app.use(VueGoodTablePlugin)
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app');