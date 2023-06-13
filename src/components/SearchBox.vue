<template>   
    <div v-show="showSearch" class="flex items-center w-80 h-11 relative ml-5">
        <div class="search-icon"><Magnify :fillColor=" isFocused ? '#FFFFFF' : '#A0A0A0' " /></div>
        <input v-model.trim="store.input" :placeholder="placeholder" type="text" @focus="isFocused=true" @blur="isFocused=false"
        maxlength="50" @keyup.enter="store.enter">  
        <div v-show="store.input.length" class="close-icon" @click="searchClose()"><Close fillColor="#FFFFFF"/></div> 
    </div> 
    
       
</template>

<script setup>
    import Magnify from 'vue-material-design-icons/Magnify.vue'
    import Close from 'vue-material-design-icons/Close.vue'
    import{ref, computed} from 'vue'
    import { useRoute } from 'vue-router';
    import { useSearchStore } from '../stores/search.js'
    const route = useRoute() 
    const path = computed (() => route.fullPath ) 
    const showSearch = computed (() => path.value == '/search' || path.value == '/library' ?  true : false ) 
    const placeholder = computed (() => path.value === '/search' ? 'Search Album from spotify':'Search Album in your library' ) 
    const isFocused = ref(false)
    const store = useSearchStore()
    const searchClose = () =>{ store.input='' }
    
  


</script>

<style  scoped>
input{
    @apply w-full h-full border-none rounded-full pl-10 pr-10;
    @apply text-white text-[13px] bg-gray-700;
}

.search-icon{
    @apply bg-transparent cursor-default absolute top-3 left-2;
}

.close-icon{
    @apply cursor-default absolute top-1.5 right-2 ;
}
</style>