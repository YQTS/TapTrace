import { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/record'
    },
    {
        path: '/record',
        name: 'Record',
        component: () => import('@/views/Record/Record.vue')
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}