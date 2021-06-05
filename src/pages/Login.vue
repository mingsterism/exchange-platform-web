<template>
    <h1 class="text-xl font-black">Login</h1>
    <div class="mt-8">
        <Textbox text="Email" />
        <Textbox text="Password" />
    </div>
    <div class="mt-10">
        <Button label="Login" :primary="true" size="medium"/>
    </div>
</template>
<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"

export default {
    name: "Login",
    components: {
        Textbox,
        Button
    }
}
</script>
<style scoped>

</style>