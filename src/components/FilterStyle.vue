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

            <input class="filter-input" type="text">


            <button class="option" @click="selectAll()"
            @mouseenter="all.hover=true" @mouseleave="all.hover = false"
            :class="classSelectedAll()">
                All genres
            </button>
            <button class="option" v-for="type in options" @click="selectType(type.id)"
            @mouseenter="isHover(type.id,true)" @mouseleave="isHover(type.id,false)"
            :class="classSelected(type.id)">
                {{type.name}}
            </button>            
        </div>
    </div>

    <div class="text-white">
    {{ optionsSelected }}</div>
</template>

<script setup>
    import { ref, computed, onBeforeMount, onMounted } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import styles from '../data/styles.json'
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
    
    function isHover(id,v){
        options.value[id-1].hover = v;
    }

    function classSelected(id){
        if(options.value[id-1].selected){
            return 'bg-slate-50 text-black'
        }
        if (options.value[id-1].hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
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

    function selectType(id){  
        all.value.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == options.value[id-1].name)
            return;        
        options.value[id-1].selected = !options.value[id-1].selected       
    }

    function selectAll() {
        all.value.selected = true
        for (let i = 0; i < options.value.length; i++) {
            options.value[i].selected = false;
        }       
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
        @apply absolute top-[32px] flex flex-wrap w-[150px] px-1 rounded-xl py-1 z-[1];
        @apply bg-black ;
        @apply overflow-auto h-[350px]; 
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