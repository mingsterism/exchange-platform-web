import {createRouter, createWebHistory} from 'vue-router'
import Home from "/@/pages/Home.vue"
import Product from "/@/pages/Product.vue"
import Profile from "/@/pages/Profile.vue"
import NavLayout from "/@/layouts/Nav.layout.vue"
import Login from "/@/pages/Login.vue"
import Register from "/@/pages/Register.vue"
import Checkout from "/@/pages/Checkout.vue"
import Profileadd from "/@/pages/Profileadd.vue"
import Dummypage from "/@/pages/dummypage.vue"
import ForgotPass from "/@/pages/ForgotPass.vue"
import Topup from "/@/pages/Topup.vue"

const routes = [
    {
        path: "/",
        component: NavLayout,
        children: [
            {
                path: "/",
                name: 'Home',
                component: Home,
            },
            {
                path: "/login",
                name: 'Login',
                component: Login,
            },
            {
                path: "/register",
                name: 'Register',
                component: Register,
            },
            {
                path: "/product",
                name: 'Product',
                component: Product,
            },
            {
                path: "/profile",
                name: 'Name',
                component: Profile,
            },
            {
                path: "/checkout",
                name: 'Checkout',
                component: Checkout,
            },
            {
                path: "/profile_add",
                name: 'ProfileAdd',
                component: Profileadd
            },
            {
                path: "/dummypage",
                name: 'Dummypage',
                component: Dummypage
            },
            {
                path: "/forgotpass",
                name: 'ForgotPass',
                component: ForgotPass
            },
            {
                path: "/topup",
                NAME: 'Topup',
                component: Topup
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

// router.beforeEach(((to, from, next) => {
//     if(to.matched.some(record => record.meta.requireAuth)) {
//         if (!firebase.auth().currentUser) {
//             next({
//                 path: '/login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             });
//         } else {
//             next();
//         }
//     } else if(to.matched.some(record => record.meta.requiresGuest)) {
//         if (firebase.auth().currentUser) {
//             next({
//                 path: '/',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// }))

export default router;
