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
            <div class="actions">
                <div class="actions-all" :class="optionsSelected.length == 4 ? 'text-sm' : 'text-xs' " @click="selectAllTypes()">[all]</div>
                <div class="action-close" @click="showOptions=!showOptions"> [close]</div>
            </div>
            <button class="option" v-for="type in options" @click="selectType(type.id)"
            @mouseenter="isHover(type.id,true)" @mouseleave="isHover(type.id,false)"
            :class="classSelected(type.id)" >
                {{type.name}}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    const filterLabel = ref("Types")
    const showOptions = ref(false)   
    const filter = ref(null)


    const options= ref([
        {id: 1, name: 'Album', selected: true, hover: false},
        {id: 2, name: 'Single', selected: true, hover: false},
        {id: 3, name: 'Compilation', selected: true, hover: false},
        {id: 4, name: 'EP', selected: true, hover:false}
    ])
    

    function initOptionsYears(){
        for(i=1940;i++;i<)
        

    }

    
    
    
    const optionsSelected = computed(()=> options.value.filter(type => type.selected ).map(type => type.id ))
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

    function selectType(id){   
        if (optionsSelected.value.length == 1 && optionsSelected.value[0] == id)
            return;        
        options.value[id-1].selected = !options.value[id-1].selected       
    }

    function selectAllTypes() {
        if (optionsSelected.value.length == 4)
            return;
        for (let i = 0; i < options.value.length; i++) {
            options.value[i].selected = true;        
        }        
    }


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
        @apply absolute top-[32px] flex flex-wrap w-[110px] px-1 h-auto rounded-xl py-1;
        @apply bg-black; 
    }
    .actions{
        @apply flex w-full h-[16px] text-xs justify-between items-center my-1 cursor-pointer;
    }
    .option{
        @apply flex text-sm;      
        @apply w-full pl-1 py-1 rounded-md;
        @apply cursor-pointer border-[1px] border-black;
        @apply text-center mt-[2px];         
    }
</style>