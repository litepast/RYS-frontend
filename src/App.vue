<template>
  <TopBar/>
  <SideBar/>
  <div class="view-container" >  
    
      <RouterView />
      
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import TopBar from './components/TopBar.vue';
  import SideBar from './components/SideBar.vue';
</script>

<style scoped>

  ::-webkit-scrollbar {
    width: 20px;    
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #232121;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #9c9999;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ede6e6;
  }

  .view-container{
    @apply fixed right-0 top-0 w-[calc(100%-175px)] overflow-auto h-full bg-gradient-to-b from-[#1F1F1F] to-black;
  }


</style>



