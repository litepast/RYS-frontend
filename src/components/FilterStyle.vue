<template>
    <div class="filter-header" ref="filter">
        <div class="header-label" >
            {{ filterLabel }}
        </div>
        <div class="show-button" @click="showOptions=!showOptions">
            <ChevronDown v-if="!showOptions" fillColor="#FFFFFF" :size="25" />
            <ChevronUp v-else fillColor="#FFFFFF" :size="25" />
        </div>
        <div class="search-container" v-show="showOptions">
            <input v-model.trim="filterInput" placeholder="Search for styles..." class="filter-input" type="text">
        </div>
        <div class="options-container" v-show="showOptions && !filterInput" >
            <div class="option" @click="selectAll()"
            @mouseenter="LibraryViewStore.allStyles.hover=true" @mouseleave="LibraryViewStore.allStyles.hover = false"
            :class="classSelectedAll()">
                All Styles
            </div>
            <div class="option" v-for="(option, index) in LibraryViewStore.optionsStyles" @click="selectType(index)"
            @mouseenter="isHover(index,true,true)" @mouseleave="isHover(index,true,false)"
            :class="classSelected(index,true)">
                {{option.name}}
            </div>
        </div>
        <div class="filtered-container" v-show="showOptions && filterInput">
            <div class="text-xs h-[20px]">
                {{filteredOptions.length}} results
            </div>            
            <div class="option" v-for="(option, index) in filteredOptions"
            @click="selectFilteredType(index,option.id)"
            @mouseenter="isHover(index,false,true)" @mouseleave="isHover(index,false,false)" :class="classSelected(index,false)">   
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
    const filterInput = ref('')
    const filterLabel = ref("Styles")
    const showOptions = ref(false)
    const filter = ref(null)
    const optionsSelected = computed(()=>LibraryViewStore.optionsStyles.filter(type => type.selected ).map(type => type.name ))
    const filteredOptions = ref([])   


    onClickOutside(filter, () => (showOptions.value=false))
    
    watch(filterInput, ()=>{
        filteredOptions.value = LibraryViewStore.optionsStyles.filter(option => option.name.toLowerCase().includes(filterInput.value.toLowerCase()))
    }
    )    

    watch(optionsSelected, () => {
        LibraryViewStore.query.styles = optionsSelected.value 
    }
    )


    const sortOptions = () =>{
        LibraryViewStore.optionsStyles.sort((a, b) => {
            if (a.selected && !b.selected) {
                return -1;
            } else if (!a.selected && b.selected) {
                return 1; 
            } else {
                return a.id - b.id; 
            }
        });
    }

    function isHover(index,completeList,value){
        if(completeList){
            LibraryViewStore.optionsStyles[index].hover = value;
        }else{
            filteredOptions.value[index].hover = value;
        }        
    }

    function classSelected(index,completeList){
        if(completeList){
            if(LibraryViewStore.optionsStyles[index].selected){
                return 'bg-slate-50 text-black'
            }
            if (LibraryViewStore.optionsStyles[index].hover){
                return  'bg-slate-600 text-white'
            }
            else{
                return 'bg-slate-800 text-white'
            }
        }
        else{
            if(filteredOptions.value[index].selected){
                return 'bg-slate-50 text-black'
            }
            if (filteredOptions.value[index].hover){
                return  'bg-slate-600 text-white'
            }
            else{
                return 'bg-slate-800 text-white'
            }

        }
    }

    function classSelectedAll(){
        if(LibraryViewStore.allStyles.selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.allStyles.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectFilteredType(indexA, indexB){
        LibraryViewStore.allStyles.selected = false

        filteredOptions.value[indexA].selected = !filteredOptions.value[indexA].selected
        LibraryViewStore.optionsStyles[indexB-1].selected = filteredOptions.value[indexA].selected
        sortOptions()  
    }

    function selectType(index){
        LibraryViewStore.allStyles.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == LibraryViewStore.optionsStyles[index].name)
            return;
            LibraryViewStore.optionsStyles[index].selected = !LibraryViewStore.optionsStyles[index].selected
        sortOptions()        
    }

    function selectAll() {
        LibraryViewStore.allStyles.selected = true
        for (let i = 0; i < LibraryViewStore.optionsStyles.length; i++) {
            LibraryViewStore.optionsStyles[i].selected = false;            
        }
        sortOptions()  
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

    .search-container{
        @apply absolute top-[40px] flex flex-wrap w-[150px] h-[30px] px-1 py-1 z-[1];
        @apply bg-black rounded-tl-xl rounded-tr-xl ;
    }

    .filter-input{
        @apply w-full h-full border-none rounded-full px-2 text-xs;
        @apply text-white bg-slate-800;
    }
 

    .filtered-container{
        @apply rounded-bl-xl rounded-br-xl;
        @apply absolute top-[70px] flex flex-wrap w-full h-auto p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto max-h-[350px];
    } 

    .filter-header{
        @apply relative text-white flex w-[150px] bg-slate-600 justify-between items-center;
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
        @apply absolute top-[70px] flex flex-wrap w-full h-auto rounded-xl p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto max-h-[350px];
    }
  
    .option{
        @apply text-sm flex items-center pl-2 w-full h-auto py-1 rounded-md;
        @apply cursor-pointer text-left mt-[2px];
        @apply transition-all duration-300 ease-in-out;
        @apply max-h-9;         
    }
</style>