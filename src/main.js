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

const app = createApp(App);
app.use(router);
app.use(store);
app.use(route)
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app');