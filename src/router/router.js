import { createRouter, createWebHistory } from "vue-router";
// import firebase from "firebase/app";
import "firebase/auth";
import Home from "/@/pages/Home.vue";
import NavLayout from "/@/layouts/Nav.layout.vue";
import Login from "/@/pages/Login.vue";
import Register from "/@/pages/Register.vue";
import ForgotPass from "/@/pages/ForgotPass.vue";
import AddProduct from "/@/pages/AddProduct.vue";
import MyProduct from "/@/pages/MyProduct.vue";
import Profile from "/@/pages/ProfileMod.vue";
import MyPurchase from "/@/pages/MyPurchase.vue";
import EditProduct from "../pages/EditProduct.vue";
import ViewProduct from "../pages/ViewProduct.vue";
import Cart from "../pages/Cart.vue";
import User from "../layouts/User.layout.vue";
import Header from "../layouts/Header.layout.vue";

// TODO: Need to add route guard
const routes = [
  {
    path: "/auth",
    component: Header,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requireAuth: false },
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requireAuth: false },
      },
      {
        path: "/forgotpass",
        name: "ForgotPass",
        component: ForgotPass,
        meta: { requireAuth: false },
      },
    ],
  },
  {
    path: "/",
    component: NavLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requireAuth: true },
      },
      {
        path: "/edit-Product",
        name: "EditProduct",
        component: EditProduct,
        meta: { requireAuth: true },
      },
      {
        path: "/view-product",
        name: "ViewProduct",
        component: ViewProduct,
        meta: { requireAuth: true },
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: { requireAuth: true },
      },
      {
        path: "/profile",
        component: Profile,
        name: "Profile",
      },
      {
        path: "/user",
        component: User,
        children: [
          {
            path: "/user/my-product",
            name: "MyProduct",
            component: MyProduct,
            meta: { requireAuth: true },
          },
          {
            path: "/user/add-product",
            name: "AddProduct",
            component: AddProduct,
            meta: { requireAuth: true },
          },
          {
            path: "/user/my-purchase",
            name: "MyPurchase",
            component: MyPurchase,
            meta: { requireAuth: true },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  // recommended mode
  // https://next.router.vuejs.org/guide/essentials/history-mode.html#html5-mode
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = firebase.auth().currentUser;
//   if (to.meta.requireAuth) {
//     if (user) {
//       next();
//     } else {
//       next({ name: "Login" });
//     }
//   }
// });

export default router;
