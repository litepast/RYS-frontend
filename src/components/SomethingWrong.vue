<template>
 <div class="flex flex-col text-white justify-center items-center w-full h-full"> 
        <Alert :size="100" class="text-red-500"/>                   
        <div class="text-2xl">Oops!</div>
        <div class="text-xl">Something went wrong, please try again later</div>                   
</div>>
</template>

<script setup>
import Alert from 'vue-material-design-icons/AlertCircle.vue'
</script>

<style lang="scss" scoped>
</style>