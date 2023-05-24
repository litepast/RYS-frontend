<template>
  <TopBar/>
  <SideBar/>
  <div class="view-container" >  
    <div class="view">
      <RouterView />
    </div>  
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import TopBar from './components/TopBar.vue';
  import SideBar from './components/SideBar.vue';
</script>

<style scoped>

.view-container{
  @apply fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black;
}

.view{
  @apply mt-[70px] mb-[100px];
}




</style>



