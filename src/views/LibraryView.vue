<template>
    
    <div class="filters-container">
        <FilterType/>

    </div>

    <div class="query-container">

    </div>
    <div class="results-container">


    </div>
 
 </template>
 
 <script setup>
    import FilterType from '../components/FilterType.vue'
  
 
    
    /*Years of Release*/
    // const start = 1930;
    // const end = new Date().getFullYear()
    // const years = [...Array(end - start + 1).keys()].map(x => x + start);
    // const decades = years.filter( decade => decade % 10 == 0 )

 </script>

<style scoped>

.filters-container{
    @apply m-5
}



</style>