<template>
  <div className="container flex flex-col p-1 m-3 bg-yellow-100 md:flex-row max-w-sm md:max-w-3xl">
    <img src="https://i.imgur.com/hghfnW9.jpg" className="max-w-xs m-3" />
    <div className="m-3 flex flex-col justify-between text-left">
      <div className="pb-12 md:pb-0">
        <p className="text-4xl md:pb-2 font-bold">Product A</p>
        <span className="text-sm">Product A description</span>
      </div>
      <div>
        <div className="flex flex-row gap-x-10 w-90 pb-2">
          <div className="flex flex-row gap-x-3">
            <h3 className="font-bold text-xs">Condition</h3><span className="text-xs">New</span>
          </div>
          <div className="flex flex-row gap-x-3">
            <h3 className="font-bold text-xs">Owned By</h3><span className="text-xs">John Doe</span>
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

/*
.container__description {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 17rem;
  justify-content: space-around;
  padding-bottom: 1rem;
  padding-left: -2rem
}

.container__button {
  margin: 0.5rem;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
}

h3 {
  font-weight: 700;
} */
</style>
