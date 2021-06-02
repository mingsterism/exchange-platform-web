import {createRouter, createWebHashHistory} from 'vue-router'
import Test from "/@/pages/Test.page.vue"
import Test2 from "/@/pages/Test2.page.vue"

const routes = [
    {
        path: "/test1",
        component: Test
    },
    {
        path: "/test2",
        component: Test2
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router