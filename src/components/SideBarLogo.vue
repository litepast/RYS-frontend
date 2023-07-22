<template>
    <div class="item" @mouseenter="hover=true" @mouseleave="hover=false">
        <div class="icon-container" title="Expand Menu list">
            <Icon :size="sizeIcon" fillColor="#FFFFFF" @click="sideBarStore.expand()"/>            
        </div> 
        <div class="ml-2 w-full h-full flex justify-between items-center">
            <div class="bg-gradient-to-r from-violet-600 via-emerald-400 to-amber-500 rounded-full w-[35px] h-[35px]">
                <img src="./img/logo.svg" alt="">
            </div>
            <div class="w-[calc(100%-35px)] h-full flex justify-center items-center text-white font-sans font-bold">
                ★ Yr Spotify
            </div>
        </div>  
    </div> 
</template>


<script setup>
    import  Icon from './materialIcons/Menu.vue'
    import { useSideBarStore } from '../stores/sidebar.js'
    const sideBarStore = useSideBarStore()
    const sizeIcon = 35
</script>

<style scoped>

.item{
    @apply flex justify-start items-center mb-1 px-2 h-[60px]
}

.icon-container{
    @apply flex justify-center items-center w-9 h-9 pr-2 rounded-lg hover:bg-gray-600 cursor-pointer
}

.item span{
    @apply text-left text-[13px] ml-2 transition-all duration-300 ease-in-out text-white; 
}
</style>