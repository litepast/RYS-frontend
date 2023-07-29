<template>
  <div class="app-body">
    <div class="data-container">
      <div class="sidebar-container"  :class="sidebarWidth">
        <SideBar/>
      </div>
      <div class="view-container" ref="view">
        <div class="topbar-container" :class="topbarWidth">
          <TopBar/>
        </div>
        <RouterView/>
      </div>
    </div> 
    <div class="webplayer text-white"> 
       
    </div>
  </div>
</template>

<script setup>
  import { ref, computed,  watch, onBeforeMount } from 'vue';
  import { RouterView, useRouter, useRoute } from 'vue-router';  
  import { useAppStore } from './stores/app-store.js'

  import TopBar from './components/TopBar.vue';
  import SideBar from './components/SideBar.vue';

  
  const appStore = useAppStore() 
  const sidebarWidth = computed(() => appStore.expandedBar ? 'w-[220px]' : 'w-[52px]')  
  const topbarWidth = computed(() => appStore.expandedBar ? 'w-[calc(100%-220px)]' : 'w-[calc(100%-67px)]')
  const router = useRouter()
  const route = useRoute()
  const nameView = computed(() => route.name)

  // import { useLibraryViewStore } from './stores/library-view.js';
  // import { useScroll } from '@vueuse/core'
  // const LibraryViewStore =  useLibraryViewStore()
  // const view = ref(null)
  // const scroll = useScroll(view)
  // const y = computed(() => scroll.y.value)  
  // const libLoading = computed(() => LibraryViewStore.loading)
  
  // function delay(milliseconds){
  //       return new Promise(resolve => {
  //           setTimeout(resolve, milliseconds);
  //       });
  //   }

  // watch([y], () => {
  //   if(nameView.value == 'search' && y.value > 0){
  //     appStore.scrollSearch = y.value
  //   }
  //   if(nameView.value == 'library' && libLoading.value==false){
  //     appStore.scrollLibrary = y.value
  //   }      
  // })
  //
  // watch([libLoading], () => {
  //   if(nameView.value == 'library' && libLoading.value==false){   
  //     scroll.y.value = appStore.scrollLibrary
  //   }    
  // })
  

  watch(nameView, () => {
    appStore.stateHistory.value = router.options.history.state
    // if(nameView.value == 'search'){
    //    scroll.y.value = appStore.scrollSearch
    // }
  })




  onBeforeMount(() => {
    appStore.stateHistory.value = router.options.history.state
  })
 
</script>

<style scoped>

.app-body{
  @apply flex flex-wrap w-screen h-screen overflow-hidden;
}

.sidebar-container{
  @apply flex h-full;
}

.data-container{
  @apply relative flex w-full h-[calc(100%-70px)];
}

.view-container{
  @apply flex bg-gradient-to-l  from-violet-950 via-emerald-950 to-amber-950  w-full h-full overflow-auto;
  /*bg-gradient-to-l from-black via-gray-950 to-zinc-800 */
}

.topbar-container{
  @apply flex h-[60px] absolute top-0 z-[10]; 
}

.webplayer{
  @apply  bg-violet-500 flex w-full h-[70px]
}

::-webkit-scrollbar {
  width: 15px;
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

</style>












