<template>


  <div class="app flex flex-row flex-wrap w-screen h-screen">

    <div class="firstbody flex flex-col flex-wrap w-full h-[calc(100%-70px)]">

      <div class="flex items-stretch sidebar h-full w-[160px]">
        <SideBar/>
      </div>

      <div class="flex flex-row flex-wrap h-full w-[calc(100%-160px)]">

        <div class="fixed top-0 left-[160x] h-[60px] w-full z-10">
          <TopBar/>
        </div>


        <div class="h-full w-full overflow-auto bg-gradient-to-b from-[#1F1F1F] to-black">
          <RouterView/>
        </div>


      </div>      
    </div>
    <div class="webplayer bg-violet-700 w-full h-[70px]"></div>
  </div>



</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import TopBar from './components/TopBar.vue';
  import SideBar from './components/SideBar.vue';
  const sidebarWidth = ref(160)

</script>

<style scoped>

  ::-webkit-scrollbar {
    width: 20px;
    z-index: 20;    
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #232121;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #9c9999;
  }´

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ede6e6;
  }

  /* .view-container{
    @apply fixed right-0 top-0 w-[calc(100%-175px)] h-full bg-gradient-to-b from-[#1F1F1F] to-black;
  }
 */

</style>



