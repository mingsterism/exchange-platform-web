<template>
  <div>
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-4 mx-auto">
        <div class="relative md:flex md:items-center md:justify-between">
          <div class="flex flex-1 items-center justify-center">
            <div class="text-xl font-semibold text-gray-700">
              <p
                class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                to="/"
                >EP.</p
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
