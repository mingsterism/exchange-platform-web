<template>
  <div className="container flex flex-col p-2 m-auto bg-yellow-100 md:flex-row max-w-sm md:max-w-screen-xl">
    <img src="https://i.imgur.com/hghfnW9.jpg" className="max-w-xs m-3" />
    <div className="m-3 flex flex-col justify-between text-left">
      <div className="pb-12 md:pb-0">
        <p className="text-4xl md:pb-2 font-bold">{{product}}</p>
        <span className="text-sm">{{description}}</span>
      </div>
      <div>
        <div className="flex flex-row gap-x-10 w-90 pb-2">
          <div className="flex flex-row gap-x-3">
            <h3 className="font-bold text-xs">Condition</h3><span className="text-xs">{{condition}}</span>
          </div>
          <div className="flex flex-row gap-x-3">
            <h3 className="font-bold text-xs">Owned By</h3><span className="text-xs">{{owner}}</span>
          </div>
        </div>
        <div>
          <Button label="140 Points" :primary="true" size="medium"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue"
export default {
  name: "ProfileCard",
  components: {
    Button
  }
}
</script>

<style lang="css" scoped>


</style>
