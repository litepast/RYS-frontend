<template>
    
        <div class="types-header">
           Types <ChevronDown fillColor="#FFFFFF"/>
        </div>
        <div class="options-container">
            <button class="option" v-for="option in typesOptions" @click="changeSelected(option.id)">
                {{option.name}}
            </button>
        </div>
        <div class="text-white"> 
            
            {{ typesSelected }}
            <br>
            {{ years }}
            <br>
            {{ decades }}
        
        </div>
       

        <!-- <div>Year
option list de decadas o list año

        </div>
        // <div>Ratings</div>

        
        // <div>Genres</div>
        // <div>Styles</div>
        // <div>Artist</div> -->
   
 
 </template>
 
 <script setup>
    import { ref } from 'vue';
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';

    /*Types of release*/
    const typesSelected = ref([])
    const showTypesOptions = ref(false)
    const typesOptions= [
            {id: 1, name: 'Album'},
            {id: 2, name: 'Single'},
            {id: 3, name: 'Compilation'}
        ]

    function changeSelected(id){
        if (typesSelected.value.includes(id)){
            typesSelected.value = typesSelected.value.filter( op => op != id      )
        }else{
            typesSelected.value.push(id)
        }
        typesSelected.value.sort()
    }   
    
    /*Years of Release*/
    const start = 1930;
    const end = new Date().getFullYear()
    const years = [...Array(end - start + 1).keys()].map(x => x + start);
    const decades = years.filter( decade => decade % 10 == 0 )

    /*Ratings of Release*/

 </script>

<style scoped>
.types-header{
    @apply text-white flex;
}

.options-container{
    @apply bg-slate-300 flex flex-wrap p-1 w-[142px] h-auto rounded-xl;
}

.option{
    @apply flex text-black text-xs bg-green-300 m-[2px] px-3 py-1 rounded-3xl cursor-pointer border-[1px] border-black hover:font-bold;
}



</style>