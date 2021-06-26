<template>
    <div class="flex flex-col items-start">
        <label class="text-gray-600 mt-3 p-2 text-base" for="condition">Condition</label>
        <select class="border-2 border-gray-400 rounded-md text-sm p-2" name="condition" v-model="condition">
            <option value="almostNew">ALMOST NEW</option>
            <option value="slightlyUsed">SLIGHTLY USED</option>
            <option value="used">USED</option>
        </select>
    </div>
</template>
<script>
export default {
    name: "Dropdown",
}
</script>
<style scoped>

</style>