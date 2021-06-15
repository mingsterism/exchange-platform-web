import {createRouter, createWebHistory} from 'vue-router'
import Home from "/@/pages/Home.vue"
import Product from "/@/pages/Product.vue"
import Profile from "/@/pages/Profile.vue"
import NavLayout from "/@/layouts/Nav.layout.vue"
import Login from "/@/pages/Login.vue"
import Register from "/@/pages/Register.vue"
import Checkout from "/@/pages/Checkout.vue"
import Profileadd from "/@/pages/Profileadd.vue"

const routes = [
    {
        path: "/",
        component: NavLayout,
        children: [
            {
                path: "/login",
                component: Login
            },
            {
                path: "/register",
                component: Register
            },
            {
                path: "/home",
                component: Home
            },
            {
                path: "/product",
                component: Product
            },
            {
                path: "/profile",
                component: Profile
            },
            {
                path: "/checkout",
                component: Checkout
            },
            {
                path: "/profile_add",
                component: Profileadd
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
