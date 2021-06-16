<template>
  <nav className="bg-gray-300 p-5 flex flex-row justify-between">
    <router-link to="/">
        <img src="https://i.imgur.com/hghfnW9.jpg" className="h-11"/>
    </router-link>
    <div className="flex flex-row items-center gap-4">
      <Button label="Cart" className="border-opacity-0 font-semibold" />
      <Button label="Messages" className="border-opacity-0 font-semibold" />
      <Button label="Logout" @click="logout" className="border-opacity-0 font-semibold" />
      <img src="https://i.imgur.com/hghfnW9.jpg" className="rounded-full h-11 w-11" />
    </div>
  </nav>

</template>

<script>
import Button from "/@/components/molecule/Button/Button.vue"
import firebase from 'firebase';
// import {onBeforeMount} from 'vue'

export default {
  name: "NavBar",
  components: {
    Button
  },
  methods: {
    logout: function() {

      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push('/login'))
        .catch(err => alert(err.message))
    }
  }
}
</script>

<style scoped>

</style>
