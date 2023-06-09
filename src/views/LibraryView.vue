<template>
    
    <div class="filters-container">
        <div class="filter-name">
                <button @click=" LibraryViewStore.typeSearch=false" :class="typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
            >Album Name</button>
            <button @click=" LibraryViewStore.typeSearch=true" :class="!typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
            >Artist Name</button>
        </div>
        <FilterType/>
        <FilterYear/>
        <FilterRating/>
        <FilterGenre/>
        <FilterStyle/>
    </div>
    <div class="query-container">
    </div>
    <div class="results-container text-white">        
        {{ LibraryViewStore.typeSearch }} <br>
        {{ LibraryViewStore.query }} <br>
        {{ LibraryViewStore.albums }} <br>
    </div>
 
 </template>
 
 <script setup>
    import FilterType from '../components/FilterType.vue'
    import FilterYear from '../components/FilterYear.vue'
    import FilterRating from '../components/FilterRating.vue'
    import FilterGenre from '../components/FilterGenre.vue'
    import FilterStyle from '../components/FilterStyle.vue'
    import { ref, computed } from 'vue'

    import { useSearchStore } from '../stores/search.js'
    import { useLibraryViewStore } from '../stores/library-view.js'

   

    const storeSearch = useSearchStore()  
    const LibraryViewStore =  useLibraryViewStore()

    const typeSearch = computed(() => LibraryViewStore.typeSearch)



   

  
 
    


 </script>

<style scoped>

.filter-name button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3;
    }




.filters-container{
    @apply flex flex-wrap m-5
}



</style>