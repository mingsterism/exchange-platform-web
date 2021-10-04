<template>
  <div>
      <div>
          <h1>Shopping Cart</h1>
      </div>
      <div>
          <!-- Cart cards -->
          <CartCard />
      </div>
      <div>
          <!-- checkout footer -->
      </div>
  </div>
</template>

<script>
import CartCard from '../components/organism/Cart/CartCard.vue';
export default {
    components: {CartCard}
}
</script>

<style>

</style>