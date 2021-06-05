<template>
    <h1 class="text-xl font-black">Register</h1>
    <div class="mt-8">
        <Textbox text="Name" />
        <Textbox text="Email" />
        <Textbox text="Password" />
        <Textbox text="Re-type Password" />
    </div>
    <div class="mt-10">
        <Button label="Register" :primary="true" size="medium"/>
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
    }
}
</script>
<style scoped>

</style>