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
            @mouseenter="LibraryViewStore.allTypes.hover=true" @mouseleave="LibraryViewStore.allTypes.hover = false"
            :class="classSelectedAll()">
                All types
        </div>
            <div class="option"
                v-for="(option, index) in LibraryViewStore.optionsTypes"
                @click="selectType(index)"
                @mouseenter="isHover(index,true)" @mouseleave="isHover(index,false)"
                :class="classSelected(index)" >
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
    const filterLabel = ref("Types")
    const showOptions = ref(false)   
    const filter = ref(null)
    
    const optionsSelected = computed(()=> LibraryViewStore.optionsTypes.filter(type => type.selected ).map(type => type.id ))

    watch(optionsSelected, () => {
        LibraryViewStore.query.types = optionsSelected.value 
    }
    )

    onClickOutside(filter, () => (showOptions.value=false))
    
    function isHover(index,v){
        LibraryViewStore.optionsTypes[index].hover = v;
    }

    function classSelected(index){       
        if(LibraryViewStore.optionsTypes[index].selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.optionsTypes[index].hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function classSelectedAll(){
        if(LibraryViewStore.allTypes.selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.allTypes.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectType(index){  
        LibraryViewStore.allTypes.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == LibraryViewStore.optionsTypes[index].id)
            return;        
            LibraryViewStore.optionsTypes[index].selected = !LibraryViewStore.optionsTypes[index].selected       
    }

    function selectAll() {
        LibraryViewStore.allTypes.selected = true
        for (let i = 0; i < LibraryViewStore.optionsTypes.length; i++) {
            LibraryViewStore.optionsTypes[i].selected = false;
        }       
    }
</script>

<style scoped>
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
    }
  
    .option{
        @apply text-sm flex items-center pl-2 w-full h-7 rounded-md;
        @apply cursor-pointer text-left mt-[2px];
        @apply transition-all duration-300 ease-in-out;         
    }
</style>