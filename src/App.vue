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
    <div class="webplayer-container">
      <WebPlayer/>       
    </div>
  </div>
</template>

<script setup>
  import { computed,  watch, onBeforeMount, onMounted } from 'vue';
  import { RouterView, useRouter, useRoute } from 'vue-router';  
  import { useAppStore } from './stores/app-store.js'
  import TopBar from './components/TopBar.vue';
  import SideBar from './components/SideBar.vue';
  import WebPlayer from './components/WebPlayer.vue';
  import { userLogin } from './spotify/auth'
  import { generateToken } from './spotify/auth_token'


  
  const appStore = useAppStore() 
  const sidebarWidth = computed(() => appStore.expandedBar ? 'w-[220px]' : 'w-[52px]')  
  const topbarWidth = computed(() => appStore.expandedBar ? 'w-[calc(100%-220px)]' : 'w-[calc(100%-67px)]')
  const router = useRouter()
  const route = useRoute()
  const nameView = computed(() => route.name)

 

  const path = computed (() => route.fullPath )    
  console.log("path ",path.value)

  watch(nameView, () => {
    appStore.stateHistory.value = router.options.history.state
  })

  onBeforeMount( async() => {
    appStore.stateHistory.value = router.options.history.state
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    localStorage.setItem('code',code);
    console.log(code+"------------------------------");
    if (localStorage.getItem('code') === 'null') {
      userLogin();
    }
    if (localStorage.getItem('access_token') === 'null') {
      console.log('running...');
      await generateToken();
    }
  })

  onMounted(()=>
    router.push("/")
  )
 
</script>

<style scoped>

.app-body{
  @apply flex flex-wrap w-screen h-screen overflow-hidden min-w-[720px];
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

.webplayer-container{
  @apply flex w-full h-[70px] overflow-hidden
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












