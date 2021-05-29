<template>
  <div className="container">
    <img src="https://i.imgur.com/hghfnW9.jpg" className="container__img" />
    <div className="container__text">
      <div className="container__title">
        <h1>Product A</h1>
        <span>Product A description</span>
      </div>
      <div>
        <div className="container__description">
          <h3>Condition</h3><span>New</span>
          <h3>Owned By</h3>
        </div>
        <Button className="container__button"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue"
export default {
  name: "Card",
  components: {
    Button
  }
}
</script>

<style lang="css" scoped>
.container {
  display: inline-flex;
  background-color: blanchedalmond;
  margin: 2rem;
}

.container__img {
  width: 50%;
  padding: 1rem;
}

.container__title {
  padding: 0.5rem;
}

.container__text {
  display: flex;
  width: 100%;
  flex-direction: column;
  column-count: 2;
  justify-content: space-between;
  text-align: left;
  padding: 1rem;
}

.container__description {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 17rem;
  justify-content: space-around;
}

.container__button {
  margin: 0.5rem;
}
</style>
