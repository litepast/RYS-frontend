<template>
    <div class="topbar" :style=" transparent ? 'background-color: transparent' : 'background-color: #000000'  ">
        <div class="flex items-center">
            <div class="nav-buttons">
                <button type="button"  :class="buttonBackClass" :title="canGoBack ? 'Go back' : null ">
                    <ChevronLeft @click="goBack()" fillColor="#FFFFFF" :size="30" />
                </button>
                <div class="ml-2"></div>
                <button type="button" :class="buttonFwdClass"  :title="canGoFoward ? 'Go foward' : null " >
                    <ChevronRight @click="goFoward()" fillColor="#FFFFFF" :size="30" />
                </button>                 
            </div>
            <SearchBox/>       
        </div>
        <div ref="topmenu" class="profile-container relative" @click="openMenu = !openMenu" :class="openMenu ? 'bg-zinc-800' : 'bg-black'">            
                <img class="profile-img"  width="27" src="./img/profile.jpg">
                <div class="profile-name"> {{userName}}</div>
                <ChevronDown v-if="!openMenu" fillColor="#FFFFFF" :size="25" />
                <ChevronUp v-else fillColor="#FFFFFF" :size="25" />                
                <div v-if="openMenu" class="menu-container absolute">
                    <ul class="text-white font-semibold text-[13px]">
                         <li @click="goStats()" class="p-2.5 hover:bg-zinc-500">Statistics</li>                
                    </ul>
                </div>
        </div>
    </div>
</template>

<script setup>
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
    import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
    import SearchBox from '../components/SearchBox.vue'
    import { ref, computed} from 'vue'
    import { useRouter, useRoute } from 'vue-router';
    import { useAppStore } from '../stores/app-store.js'
    import { onClickOutside } from '@vueuse/core'
    const topmenu = ref(null)
    onClickOutside(topmenu, () => (openMenu.value=false))    
    const appStore = useAppStore()
    const router = useRouter()
    const route = useRoute()
    const nameView = computed(() => route.name)
    const canGoBack = computed(() => appStore.stateHistory.value.back ? true : false) 
    const canGoFoward = computed(() => appStore.stateHistory.value.forward ? true : false)
    const openMenu = ref(false)
    const goBack = () => {canGoBack.value ? router.back() : null}
    const goFoward = () => {canGoFoward.value ? router.forward() : null }
    const goStats = () => {router.push('/dashboard')}
    const userName = computed(() => appStore.userName)
    const classAllowed = 'cursor-pointer'
    const classNotAllowed = 'cursor-not-allowed opacity-40'
    const buttonFwdClass = computed(() => {
        if (canGoFoward.value){
            return classAllowed }        
        return classNotAllowed       
    })
    const buttonBackClass = computed(() => {
        if (canGoBack.value){
            return classAllowed }        
        return classNotAllowed         
    })
    const transparent = computed(() =>{
        if (nameView.value == 'album' || nameView.value == 'dashboard'){
            return true
        }
        else{
            return false
        }}
    )






</script>

<style scoped>

.menu-container{
    @apply top-[40px] right-0 w-[190px] bg-zinc-800 shadow-2xl z-50 rounded-sm p-1 cursor-pointer  
}

.profile-container{
    @apply flex items-center h-[35px] right-0 mr-3 px-2 opacity-50 hover:opacity-100 rounded-full cursor-pointer;
}
.profile-img{
     @apply rounded-full mr-3;
}
.profile-name{
    @apply text-white text-[14px] ml-1.5 font-semibold;
}

.topbar{
    @apply flex items-center w-full h-full justify-between  bg-opacity-60;
}

.nav-buttons{
    @apply flex items-center h-full ml-2;
}
.nav-buttons button{
    @apply rounded-full p-[1px] bg-zinc-800;
}

</style>