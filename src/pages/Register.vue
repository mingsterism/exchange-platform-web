<template>
    <div class="flex flex-col items-center h-screen justify-center">
        <h1 class="text-xl font-black">Register</h1>
        <div class="mt-8">
            <Textbox text="Name" name="Name" />
            <Textbox text="Email" name="Email" />
            <Textbox text="Password" />
            <Textbox text="Re-type Password" />
        </div>
        <div class="mt-10">
            <Button label="Register" :primary="true" size="medium" @click="clickToLogin"/>
        </div>
    </div>
</template>
<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"

export default {
    name: "Register",
    components: {
        Textbox,
        Button
    },
    methods: {
        clickToLogin() {
            this.$router.push("/login")
        }
    }
}
</script>
<style scoped>

</style>