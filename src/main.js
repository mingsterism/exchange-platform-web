import {createApp} from 'vue'
import router from "/@/router/router.js"
import {createPinia} from 'pinia'
// import { StripePlugin } from '@vue-stripe/vue-stripe';
import App from './App.vue'
import './index.css'

// const options = {
//     pk: import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY,
//     stripeAccount: import.meta.env.VITE_APP_STRIPE_ACCOUNT,
//     apiVersion: import.meta.env.VITE_APP_STRIPE_API_VERSION,
//     locale: import.meta.env.VITE_APP_STRIPE_LOCALE,
// };

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount("#app")
