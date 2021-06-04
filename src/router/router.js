import {createRouter, createWebHistory} from 'vue-router'
import Home from "/@/pages/Home.vue"
import Profile from "/@/pages/Product.vue"
import NavLayout from "/@/layouts/Nav.layout.vue"

const routes = [
    {
        path: "/",
        component: NavLayout,
        children: [
            {
                path: "/home",
                component: Home
            },
            {
                path: "/profile",
                component: Profile
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
