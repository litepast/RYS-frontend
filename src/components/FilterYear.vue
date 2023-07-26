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
            <div class="option" @click="selectAll()"
            @mouseenter="LibraryViewStore.allYears.hover=true" @mouseleave="LibraryViewStore.allYears.hover = false"
            :class="classSelectedAll()">
                All years
            </div>
            <div class="option" 
            v-for="(option, index) in LibraryViewStore.optionsYears"
            @click="selectType(index)"
            @mouseenter="isHover(index,true)" @mouseleave="isHover(index,false)"
            :class="classSelected(index)">
                {{option.name}}
            </div>            
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
    const filterLabel = ref("Years")
    const showOptions = ref(false)   
    const filter = ref(null)
    const optionsSelected = computed(()=> LibraryViewStore.optionsYears.filter(type => type.selected ).map(type => type.name ))
    
    onClickOutside(filter, () => (showOptions.value=false))

    const sortYears = () => {
            LibraryViewStore.optionsYears.sort((a,b) => {
            if (a.selected && !b.selected) return -1
            if (!a.selected && b.selected) return 1
            if (a.name > b.name) return -1
            if (a.name < b.name) return 1
            return 0    
        })       
    }
    
    watch(optionsSelected, () => {
        LibraryViewStore.query.years = optionsSelected.value 
    }
    )
 
    function isHover(index,v){
        LibraryViewStore.optionsYears[index].hover = v;
    }

    function classSelected(index){
        if(LibraryViewStore.optionsYears[index].selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.optionsYears[index].hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }
    
    function classSelectedAll(){
        if(LibraryViewStore.allYears.selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.allYears.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectType(index){  
        LibraryViewStore.allYears.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == LibraryViewStore.optionsYears[index].name)
            return;        
            LibraryViewStore.optionsYears[index].selected = !LibraryViewStore.optionsYears[index].selected  
        sortYears()     
    }

    function selectAll() {
        LibraryViewStore.allYears.selected = true
        for (let i = 0; i < LibraryViewStore.optionsYears.length; i++) {
            LibraryViewStore.optionsYears[i].selected = false;
        }  
        sortYears()     
    }
</script>

<style scoped>

    ::-webkit-scrollbar {
        width: 10px;    
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

    .filter-header{
        @apply relative text-white flex w-[115px] bg-slate-600 justify-between items-center;
        @apply rounded-full hover:bg-slate-500 ;
        @apply text-sm h-[36px] mr-3;
        @apply transition-all duration-300 ease-in-out;
    }
    .header-label{
        @apply ml-3;
    }
    .show-button{
        @apply bg-slate-900 rounded-full mr-1 cursor-pointer;
    }
    .options-container{
        @apply absolute top-[38px] flex flex-wrap w-full h-auto rounded-xl p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto h-[350px]; 
    }
  
    .option{
        @apply text-sm flex items-center pl-2 w-full h-7 rounded-md;
        @apply cursor-pointer text-left mt-[2px];  
        @apply transition-all duration-300 ease-in-out;       
    }


</style>