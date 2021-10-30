import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Header from "../layouts/Header.layout.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import NavBar from "../layouts/NavBar.layout.vue";
import Profile from "../pages/Profile.vue";
import User from "../layouts/User.layout.vue";
import AddProduct from "../pages/AddProduct.vue";
import MyProduct from "../pages/MyProduct.vue";
import EditProduct from "../pages/EditProduct.vue";
import Cart from "../pages/Cart.vue";
import MyPurchase from "../pages/MyPurchase.vue";

const routes = [
  {
    path: "/",
    component: NavBar,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/user",
        component: User,
        children: [
          {
            path: "add-product",
            name: "AddProduct",
            component: AddProduct,
          },
          {
            path: "my-product",
            name: "MyProduct",
            component: MyProduct,
          },
          {
            path: "my-purchase",
            name: "MyPurchase",
            component: MyPurchase,
          },
        ],
      },
      {
        path: "/edit-product",
        name: "EditProduct",
        component: EditProduct,
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
      },
    ],
  },
  {
    path: "/auth",
    component: Header,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "forgotpass",
        name: "ForgotPassword",
        component: ForgotPassword,
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

export default router;
