import {createApp} from 'vue'
import router from "/@/router/router.js"
import App from './App.vue'
import './index.css'
import firebase from 'firebase'
// import * as dotenv from 'dotenv'

// dotenv.config()


const firebaseConfig = ({
    apiKey: "AIzaSyCC7Yie3RZhusyEDS1U4Erp_pD3JTFBU1g",
    authDomain: "exchange-platform-92854.firebaseapp.com",
    projectId: "exchange-platform-92854",
    storageBucket: "exchange-platform-92854.appspot.com",
    messagingSenderId: "32159966574",
    appId: "1:32159966574:web:c85a16e2071999b7f00d7f",
    measurementId: "G-8LCWP241BR"
})

firebase.initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.mount("#app")
