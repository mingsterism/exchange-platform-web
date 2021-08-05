<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl font-black">Register</h1>
    <div>
      <div class="mt-8">
        <div className="flex flex-col">
          <label
            for="userName"
            className="mt-3 p-2 h-auto w-52 text-gray-600 text-left"
            >Username</label
          >
          <input
            type="text"
            placeholder="Username"
            className="storybook-textbox"
            v-model="userName"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            for="email"
            className="mt-3 p-2 h-auto w-52 text-gray-600 text-left"
            >Email</label
          >
          <input
            type="text"
            placeholder="Email"
            className="storybook-textbox"
            v-model="email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            for="password"
            className="mt-3 p-2 h-auto w-52 text-gray-600 text-left"
            >Password</label
          >
          <input
            type="password"
            placeholder="Password"
            className="storybook-textbox"
            v-model="password"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            for="retype"
            className="mt-3 p-2 h-auto w-52 text-gray-600 text-left"
            >Retype Password</label
          >
          <input
            type="password"
            placeholder="Retype Password"
            className="storybook-textbox"
            v-model="retype"
            required
          />
        </div>
      </div>
      <div class="mt-10">
        <Button
          type="submit"
          @click="register"
          label="Register"
          :primary="true"
          size="medium"
        />
        <p className="mt-8">
          Have an Account? <router-link to="/login">Login Here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { createProfile } from "../utils/firebase";
import firebase from "firebase";

export default {
  name: "Register",
  components: {
    Textbox,
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      retype: "",
      userName: "",
    };
  },
  methods: {
    async register() {
      if (this.password === this.retype) {
        // firebase
        //   .auth()
        //   .createUserWithEmailAndPassword(this.email, this.password)
        //   .then(() => {
        //     const user = firebase.auth().currentUser;
        //     const actionsCodeSettings = {
        //       url: `${import.meta.env.VITE_APP_BASE_URL}`,
        //     };
        //     user.sendEmailVerification(actionsCodeSettings);
        //   })
        //   .catch((err) => alert(err));

        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        ).then(cred => {
          console.log(cred.user);
          console.log(cred.user.uid);
          return cred.user.uid
        })
        console.log("Created user: ", createUser);
        const userData = {
          id: createUser,
          name: this.userName,
          email: this.email,
          about: "default",
          store_address: "default",
          points: 123,
        };
        await createProfile(createUser, userData);
        this.$router.push({ name: "Home" });
        return;
      } else {
        alert("Wrong Password");
      }
    },
  },
};
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
