<template>
    <div class="flex flex-col items-center">
        <div class="w-11/12">
            <h1 class="p-5 text-3xl font-semibold text-left">Review</h1>
            <ProfileCard />
            <div class="w-2/4 py-6">
                <p class="text-left font-semibold">Shipping Details</p>
                <Textbox text="Address Line 1" name="Enter your address here" />
                <Textbox text="Address Line 2" name="Enter your address here" />
                <div class="flex flex-col justify-between lg:flex-row">
                    <Textbox class="flex-shrink" text="Postcode" name="Postcode" />
                    <Textbox class="flex-shrink" text="City" name="City" />
                    <Textbox class="flex-shrink" text="Country" name="Country" />
                </div>
                <Textbox text="Additional Note" />
                <div class="flex py-5">
                    <Button label="CONFIRM" :primary="true" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileCard from '../components/organism/ProfileCard/ProfileCard.vue'
import Textbox from '../components/molecule/Textbox/Textbox.vue'
import Button from '../components/molecule/Button/Button.vue'
export default {
    name: "CheckOut",
    components: {
        ProfileCard,
        Textbox,
        Button,
    }
}
</script>
<style scoped>

</style>