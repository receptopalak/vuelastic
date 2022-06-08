import {
    createApp
} from 'vue'
import App from './App.vue'
import router from '@/routes'
import route from '@/routes/currentRoute'
import store from '@/store'
import appAxios from './utils/appAxios'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(route);
app.use(VueGoodTablePlugin)
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app');