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
            <button class="option" @click="selectAll()"
            @mouseenter="all.hover=true" @mouseleave="all.hover = false"
            :class="classSelectedAll()">
                All Styles
            </button>
            <button class="option" v-for="(option, index) in options" @click="selectType(index)"
            @mouseenter="isHover(index,true,true)" @mouseleave="isHover(index,true,false)"
            :class="classSelected(index,true)">
                {{option.name}}
            </button>
        </div>

        <div class="filtered-container" v-show="showOptions && filterInput">
            <div class="text-xs h-[20px]">
                {{filteredOptions.length}} results
            </div>
            
            <button class="filtered-option" v-for="(option, index) in filteredOptions"
            @click="selectFilteredType(index,option.id)"
            @mouseenter="isHover(index,false,true)" @mouseleave="isHover(index,false,false)"
            :class="classSelected(index,false)"
            >

            <!--  :class="classSelected(index)" -->


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
    import styles from '../data/styles.json'
    import { useLibraryViewStore } from '../stores/library-view.js'
    const LibraryViewStore =  useLibraryViewStore()   
    const filterInput = ref('')
    const filterLabel = ref("Styles")
    const showOptions = ref(false)
    const filter = ref(null)
    const all = ref({
        selected: true,
        hover: false
    })
    const options= ref(styles)
    const optionsSelected = computed(()=> options.value.filter(type => type.selected ).map(type => type.name ))
    onClickOutside(filter, () => (showOptions.value=false))
    const filteredOptions = ref([])
    
    watch(filterInput, ()=>{
        filteredOptions.value = options.value.filter(option => option.name.toLowerCase().includes(filterInput.value.toLowerCase()))
    }
    )    

    watch(optionsSelected, () => {
        LibraryViewStore.query.styles = optionsSelected.value 
    }
    )


    const sortOptions = () =>{
        options.value.sort((a, b) => {
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
            options.value[index].hover = value;
        }else{
            filteredOptions.value[index].hover = value;
        }        
    }

    function classSelected(index,completeList){
        if(completeList){
            if(options.value[index].selected){
                return 'bg-slate-50 text-black'
            }
            if (options.value[index].hover){
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
        if(all.value.selected){
            return 'bg-slate-50 text-black'
        }
        if (all.value.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectFilteredType(indexA, indexB){
        all.value.selected = false

        filteredOptions.value[indexA].selected = !filteredOptions.value[indexA].selected
        options.value[indexB-1].selected = filteredOptions.value[indexA].selected
        sortOptions()  


        // if (optionsSelected.value.length == 1 && optionsSelected.value[0] == options.value[index].name)
        //     return;
    }

    function selectType(index){
        all.value.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == options.value[index].name)
            return;
        options.value[index].selected = !options.value[index].selected
        sortOptions()        
    }

    function selectAll() {
        all.value.selected = true
        for (let i = 0; i < options.value.length; i++) {
            options.value[i].selected = false;            
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
        @apply absolute top-[30px] flex flex-wrap w-[150px] h-[30px] px-1 py-1 z-[1];
        @apply bg-black rounded-tl-xl rounded-tr-xl ;

    }

    .filter-input{
        @apply w-full h-full border-none rounded-full px-2 text-sm;
        @apply text-white bg-gray-700;
    }

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
        @apply absolute top-[60px] flex flex-wrap w-[150px] px-1  rounded-bl-xl rounded-br-xl py-1 z-[1];
        @apply bg-black ;
        @apply overflow-auto h-[350px];
    }

    .filtered-container{
        @apply absolute top-[60px] flex flex-wrap w-[150px] px-1  rounded-bl-xl rounded-br-xl py-1 z-[1];
        @apply bg-black ;
        @apply overflow-auto max-h-[350px];
    }

    .filtered-option{
        @apply flex text-sm;
        @apply w-full;
        @apply max-h-[50px];
        @apply pl-1 py-1 rounded-md;
        @apply cursor-pointer border-[1px] border-black;
        @apply mt-[2px] text-left;


    }

    .actions{
        @apply flex w-full h-[16px] text-xs justify-between items-center my-1 cursor-pointer;
    }
    .option{
        @apply flex text-sm;
        @apply w-full;
        @apply h-auto;
        @apply pl-1 py-1 rounded-md;
        @apply cursor-pointer border-[1px] border-black;
        @apply mt-[2px] text-left;
    }
</style>