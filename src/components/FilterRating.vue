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
            @mouseenter="LibraryViewStore.allRatings.hover=true" @mouseleave="LibraryViewStore.allRatings.hover = false"
            :class="classSelectedAll()">
                All Ratings
            </div>
            <div class="option" v-for="(option, index) in LibraryViewStore.optionsRatings" @click="selectType(index)"
            @mouseenter="isHover(index,true)" @mouseleave="isHover(index,false)"
            :class="classSelected(index)">
                <StarRating v-if="option.name!='Unrated'" :title=" `${option.name} stars`" :rating="option.name" :star-size="16" :read-only="true" :increment="0.5"  :show-rating="false"
                inactive-color="#ACACAC" border-color="#000000" active-color="#4ADE80" :border-width="1" />
                <div v-else :title="`${option.name}`" >{{option.name}}</div>
            </div>            
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import StarRating from 'vue-star-rating'
    import { useLibraryViewStore } from '../stores/library-view.js'
    const LibraryViewStore =  useLibraryViewStore()   

    const filterLabel = ref("Ratings")
    const showOptions = ref(false)   
    const filter = ref(null)
   

    const optionsSelected = computed(()=> LibraryViewStore.optionsRatings.filter(type => type.selected ).map(type => type.name ))
    onClickOutside(filter, () => (showOptions.value=false))

    watch(optionsSelected, () => {
        LibraryViewStore.query.ratings = optionsSelected.value 
    }
    )

    function isHover(index,v){
        LibraryViewStore.optionsRatings[index].hover = v;
    }

    function classSelected(index){
        if(LibraryViewStore.optionsRatings[index].selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.optionsRatings[index].hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }
    
    function classSelectedAll(){
        if(LibraryViewStore.allRatings.selected){
            return 'bg-slate-50 text-black'
        }
        if (LibraryViewStore.allRatings.hover){
            return  'bg-slate-600 text-white'
        }
        else{
            return 'bg-slate-800 text-white'
        }
    }

    function selectType(index){  
        LibraryViewStore.allRatings.selected = false
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == LibraryViewStore.optionsRatings[index].name)
            return;        
            LibraryViewStore.optionsRatings[index].selected = !LibraryViewStore.optionsRatings[index].selected       
    }

    function selectAll() {
        LibraryViewStore.allRatings.selected = true
        for (let i = 0; i < LibraryViewStore.optionsRatings.length; i++) {
            LibraryViewStore.optionsRatings[i].selected = false;
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
        @apply flex justify-center items-center w-full h-7 rounded-md;
        @apply cursor-pointer;  
        @apply transition-all duration-300 ease-in-out;       
    }

</style>