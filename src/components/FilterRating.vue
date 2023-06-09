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
            @mouseenter="all.hover=true" @mouseleave="all.hover = false"
            :class="classSelectedAll()">
                All Ratings
            </button>
            <button class="option" v-for="(option, index) in options" @click="selectType(index)"
            @mouseenter="isHover(index,true)" @mouseleave="isHover(index,false)"
            :class="classSelected(index)">
                <StarRating v-if="option.name!='Unrated'" :title=" `${option.name} stars`" :rating="option.name" :star-size="16" :read-only="true" :increment="0.5"  :show-rating="false"
                inactive-color="#332A2B" active-color="#1ED760"/>
                <div v-else :title="`${option.name}`" >{{option.name}}</div>
            </button>            
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeMount, watch, onMounted } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import StarRating from 'vue-star-rating'
    import { useLibraryViewStore } from '../stores/library-view.js'
    const LibraryViewStore =  useLibraryViewStore()   

    const filterLabel = ref("Ratings")
    const showOptions = ref(false)   
    const filter = ref(null)
    const all = ref({
        selected: true,
        hover: false
    })
    const options= ref([])
    const optionsSelected = computed(()=> options.value.filter(type => type.selected ).map(type => type.name ))
    onClickOutside(filter, () => (showOptions.value=false))

    watch(optionsSelected, () => {
        LibraryViewStore.query.ratings = optionsSelected.value 
    }
    )


    function initOptionsRatings(){       
        for(let i=0; i<=9; i++){
            options.value.push({
                id: i, 
                name: 5-(i*0.5), 
                selected: false, 
                hover: false
            })
        } 
        options.value.push({
                id: 10, 
                name: 'Unrated', 
                selected: false, 
                hover: false
            })       
    }

    function isHover(index,v){
        options.value[index].hover = v;
    }

    function classSelected(index){
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

    function selectType(index){  
        all.value.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == options.value[index].name)
            return;        
        options.value[index].selected = !options.value[index].selected       
    }

    function selectAll() {
        all.value.selected = true
        for (let i = 0; i < options.value.length; i++) {
            options.value[i].selected = false;
        }       
    }

    onBeforeMount(() => {        
        initOptionsRatings()
    })
</script>

<style scoped>
    .filter-header{
        @apply text-white flex relative w-[110px] h-[30px] bg-black justify-between items-center;
        @apply rounded-3xl hover:bg-slate-600 ;
    }
    .header-label{
        @apply ml-3;
    }
    .show-button{
        @apply bg-gray-900 rounded-full mr-1 cursor-pointer;
    }
    .options-container{
        @apply absolute top-[32px] flex flex-wrap w-[110px] px-1 h-auto rounded-xl py-1 z-[1];
        @apply bg-black ;
       
    }
    .actions{
        @apply flex w-full h-[16px] text-xs justify-between items-center my-1 cursor-pointer;
    }
    .option{
        @apply mt-[1px] pb-1;
        @apply flex text-sm w-full h-full justify-center items-center;      
        @apply rounded-md;
        @apply cursor-pointer;
             
    }
</style>