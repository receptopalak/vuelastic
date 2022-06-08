import { createRouter,createWebHistory } from "vue-router";

const routes =  [
    {
        name: 'Search',
        path: '/',
        component: ()=> import('@/views/SearchPage.vue')      
    },
    {
        name: 'test',
        path: '/test',
        component: ()=> import('@/views/TableTest.vue')      
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router