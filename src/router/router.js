import {createRouter, createWebHistory} from 'vue-router'
import Test from "/@/pages/Test.page.vue"
import Test2 from "/@/pages/Test2.page.vue"
import NavLayout from "/@/layouts/Nav.layout.vue"
import Login from "/@/pages/Login/Login.vue"
import Register from "/@/pages/Register/Register.vue"

const routes = [
    {
        path: "/",
        component: NavLayout,
        children: [
            {
                path: "/test1",
                component: Test
            },
            {
                path: "/test2",
                component: Test2
            },
            {
                path: "/login",
                component: Login
            },
            {
                path: "/register",
                component: Register
            }
        ]

    }
]

const router = createRouter({
    // recommended mode
    // https://next.router.vuejs.org/guide/essentials/history-mode.html#html5-mode
    history: createWebHistory(),
    routes
})

export default router