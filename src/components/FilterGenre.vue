<template>
    <div class="filter-header" ref="filter">
        <div class="header-label" >
            {{ filterLabel }}
        </div>
        <div class="show-button" @click="showOptions=!showOptions">
            <ChevronDown v-if="!showOptions" fillColor="#FFFFFF" :size="25" />
            <ChevronUp v-else fillColor="#FFFFFF" :size="25" />
        </div>
        <div class="options-container" v-show="showOptions" >
            <button class="option" @click="selectAll()"
            @mouseenter="LibraryViewStore.allGenres.hover=true" @mouseleave="LibraryViewStore.allGenres.hover = false"
            :class="classSelectedAll()">
                All genres
            </button>
            <button class="option" v-for= "(option, index) in LibraryViewStore.optionsGenres" @click="selectType(index)"
            @mouseenter="isHover(index,true)" @mouseleave="isHover(index,false)"
            :class="classSelected(index)">
                {{option.name}}
            </button>            
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';    
    import { useLibraryViewStore } from '../stores/library-view.js'
    const LibraryViewStore =  useLibraryViewStore()   
    const filterLabel = ref("Genres")
    const showOptions = ref(false)   
    const filter = ref(null)

       
    
    const optionsSelected = computed(()=> LibraryViewStore.optionsGenres.filter(type => type.selected ).map(type => type.name ))
    onClickOutside(filter, () => (showOptions.value=false))
    
    function isHover(index,v){
        LibraryViewStore.optionsGenres[index].hover = v;
    }

    watch(optionsSelected, () => {
        LibraryViewStore.query.genres = optionsSelected.value 
    }
    )

    function classSelected(index){
        if(LibraryViewStore.optionsGenres[index].selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.optionsGenres[index].hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }
    
    function classSelectedAll(){
        if(LibraryViewStore.allGenres.selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.allGenres.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectType(index){  
        LibraryViewStore.allGenres.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == LibraryViewStore.optionsGenres[index].name)
            return;        
            LibraryViewStore.optionsGenres[index].selected = !LibraryViewStore.optionsGenres[index].selected       
    }

    function selectAll() {
        LibraryViewStore.allGenres.selected = true
        for (let i = 0; i < LibraryViewStore.optionsGenres.length; i++) {
            LibraryViewStore.optionsGenres[i].selected = false;
        }       
    }
 
</script>

<style scoped>
 
    .filter-header{
        @apply text-white flex relative w-[150px] h-[30px] bg-black justify-between items-center;
        @apply rounded-3xl hover:bg-slate-600 ;
    }
    .header-label{
        @apply ml-3;
    }
    .show-button{
        @apply bg-gray-900 rounded-full mr-1 cursor-pointer;
    }
    .options-container{
        @apply absolute top-[32px] flex flex-wrap w-[150px] px-1 h-auto rounded-xl py-1 z-[1];
        @apply bg-black ;
        @apply overflow-auto; 
    }
    .actions{
        @apply flex w-full h-[16px] text-xs justify-between items-center my-1 cursor-pointer;
    }
    .option{
        @apply flex text-sm;      
        @apply w-full h-auto pl-1 py-1 rounded-md;
        @apply cursor-pointer border-[1px] border-black;
        @apply mt-[2px] text-left;         
    }
</style>