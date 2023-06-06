<template>
    
    <div class="filters-container">
        <FilterType/>
        <FilterYear/>
        <FilterRating/>

    </div>

    <div class="query-container">

    </div>
    <div class="results-container">


    </div>
 
 </template>
 
 <script setup>
    import FilterType from '../components/FilterType.vue'
    import FilterYear from '../components/FilterYear.vue'
    import FilterRating from '../components/FilterRating.vue'

  
 
    
    /*Years of Release*/
    // const start = 1930;
    // const end = new Date().getFullYear()
    // const years = [...Array(end - start + 1).keys()].map(x => x + start);
    // const decades = years.filter( decade => decade % 10 == 0 )
    //generos crear json desde python en carpeta data
    //stilos crear json desde python en carpeta data /como son muchos ver lo del box de filtro a lo ultimo si conviene

 </script>

<style scoped>

.filters-container{
    @apply flex flex-wrap m-5
}



</style>