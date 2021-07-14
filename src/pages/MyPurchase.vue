<template>
  <transition appear name="fade-in">
    <div class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2 mb-20">
      <h1>Currently there is no transaction.</h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyPurchase",
};
</script>

<style scoped>
.fade-in-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.fade-in-enter-active {
  transition: all 1s ease;
}
</style>
