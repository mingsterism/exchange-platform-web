<template>
    <!--  <button></button>-->
    <!--  <input type="checkbox" id="" name="" value=""/>-->
    <div class="flex">
        <span>Name: </span>
        <input type="text" value="large">
    </div>
    
</template>

<script>
export default {
  name: "Textbox"
}
</script>

<style scoped>
    input{
        padding:10px;
        margin-left: 5px;
    }

    span {
        margin-top: 10px;
    }

    .flex {
        display: flex;
        justify-content: center;
    }
</style>