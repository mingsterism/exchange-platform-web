<template>
    <div class="flex flex-col items-center h-screen justify-center">
        <h1 class="text-xl font-black">Register</h1>
        <div>
            <div class="mt-8">
                <div className="flex flex-col">
                    <label for="email" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Email</label>
                    <input type="text" placeholder="Email" className="storybook-textbox" v-model="email" />
                </div>
                <div className="flex flex-col">
                    <label for="password" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Password</label>
                    <input type="password" placeholder="Password" className="storybook-textbox" v-model="password" />
                </div>
                <div className="flex flex-col">
                    <label for="retype" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Retype Password</label>
                    <input type="password" placeholder="Retype Password" className="storybook-textbox" v-model="retype" />
                </div>
                <!-- <Textbox type="text" text="Name" name="Name" id="name" /> -->
                <!-- <Textbox type="text" text="Email" name="Email" model="email" id="email" />
                <Textbox type="password" text="Password" name="Password" v-model="password" /> -->
                <!-- <Textbox type="password" text="Re-type Password" name="Re-Type Password" v-model="retype" id="retype" /> -->
            </div>
            <div class="mt-10">
                <Button type="submit" @click="register" label="Register" :primary=true size="medium"/>
                <p className="mt-8">Have an Account? <router-link to="/login">Login Here</router-link></p>
            </div>
        </div>
    </div>
</template>
<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"
// import {ref} from 'vue';
import firebase from 'firebase';

export default {
    name: "Register",
    components: {
        Textbox,
        Button
    },
    data() {
        return {
            email: "",
            password: "",
            retype: ""
        }
    },
    methods: {
        register: function() {
            if (this.password === this.retype) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(err => alert(err))
            } else {
                alert("Wrong Password")
            }
        }
    }
    // setup() {
    //     const email = ref("");
    //     const password = ref("");
    //     // const name = ref("");
    //     // const retype = ref("");

    //     const Register = () => {
    //         firebase
    //             .auth()
    //             .createUserWithEmailAndPassword(email.value, password.value)
    //             .then(user => {
    //                 alert(user);
    //             })
    //             .catch(err => console.log(err))
    //     }

    //     return {
    //         Register,
    //         email,
    //         password
    //     }
    // }
}
</script>

<style lang="css" scoped>
.storybook-textbox {
    border-width: 4px;
    --tw-border-opacity: 1;
    border-color: rgba(156, 163, 175, var(--tw-border-opacity));
    border-radius: 0.5rem;
    padding: 0.375rem;
}
</style>
