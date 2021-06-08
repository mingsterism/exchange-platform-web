<template>

  <!-- <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button> -->
  <div className="p-12 pb-8">
    <p className="text-left max-w-screen-xl m-auto pb-8 text-5xl font-bold">Review</p>
    <ProfileCard />
  </div>
  <div className="p-12">
    <div className="flex flex-row max-w-screen-xl justify-between m-auto">
        <div>
            <div>
                <p className="text-left font-semibold text-5xl">Shipping Details</p>
            </div>
            <div className="flex flex-col items-start pt-10">
                <div className="flex flex-col items-start pb-8">
                    <Textbox text="Address Line 1" :name="address1"/>
                </div>
                <div className="flex flex-col items-start pb-8">
                    <Textbox text="Address Line 2" :name="address2"/>
                </div>
                <div className="flex flex-row gap-20 pb-8">
                    <div className="flex flex-col items-start">
                        <Textbox text="Postcode" :name="postcode"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <Textbox text="City" :name="city"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <Textbox text="Country" :name="country"/>
                    </div>
                </div>
                <div className="flex flex-col items-start pb-8">
                    <Textbox text="Additional Note" :name="note"/>
                </div>
            </div>
        </div>
        <div className="self-end p-8">
            <Button label="Confirm" primary=true />
        </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from '/@/components/organism/ProfileCard/ProfileCard.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'
import Button from '/@/components/molecule/Button/Button.vue'

export default {
  name: "Checkout",
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  },
  components: {
    ProfileCard,
    Textbox,
    Button
  },
  data() {
      return {
          address1: "Address Line 1",
          address2: "Address Line 2",
          postcode: "Postcode",
          city: "City",
          country: "Country",
          note: "Additional Note Here..."
      }
  }
}
</script>

<style scoped>

</style>

  
