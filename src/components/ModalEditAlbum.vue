<template>
    <div class="modal-background">
        <div class="modal-body">
            <div class="modal-header">
                Edit Album
            </div>
            <div class="filter-row">
                <div class="label-row">
                    Release Type:
                    <br><span class="text-[12px] text-gray-400"> (Single Selection)</span>
                </div>
                <select v-model="release_type"  id="type">
                    <option value="1">Album</option>
                    <option value="2">Single</option>
                    <option value="3">Compilation</option>
                    <option value="4">EP</option>
                </select>
            </div>

            <div class="filter-row">
                <div class="label-row">
                    Genres:<br><span class="text-[12px] text-gray-400"> (Multple Selections)</span>
                </div>
                <div class="filter-header"   ref="filterGenres" id="filterGenres">
                    <div class="header-label" @click="showGenres=!showGenres">
                        Select Genres 
                    </div>
                    <div class="show-button" @click="showGenres=!showGenres">
                        <ChevronDown v-if="!showGenres" :size="20" class="text-white"/>
                        <ChevronUp v-else  :size="20" class="text-white"/>
                    </div>
                    <div class="options-container-genres" v-show="showGenres" >
                        <div class="option" v-for= "(option, index) in genresOptions"
                        @click="selectType(index)" :class = " option.selected ? 'bg-blue-600' : 'bg-slate-600'" >
                            {{option.name}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-row">
                <div class="label-row" >
                    Styles: <br><span class="text-[12px] text-gray-400"> (Multple Selections)</span>
                </div>
                <div class="filter-header" ref="filterStyles">
                    <div class="header-label"  @click="showStyles=!showStyles" >
                        Select Styles
                    </div>
                    <div class="show-button" @click="showStyles=!showStyles">
                        <ChevronDown v-if="!showStyles" :size="20" class="text-white"/>
                        <ChevronUp v-else  :size="20" class="text-white"/>
                    </div>
                    <div class="search-container" v-show="showStyles">
                        <input v-model.trim="filterInput" placeholder="Search for styles..." class="filter-input" type="text">
                    </div>
                    <div class="options-container-styles" v-show="showStyles && !filterInput" >
                        <div class="option-styles" v-for="(option, index) in stylesOptions" 
                        @click="selectTypeStyles(index)" :class = " option.selected ? 'bg-blue-600' : 'bg-slate-600'" >
                            {{option.name}}
                        </div>
                    </div>
                    <div class="filtered-container" v-show="showStyles && filterInput">
                        <div class="text-xs h-[20px]">
                            {{filteredOptions.length}} results
                        </div>            
                        <div class="option-styles" v-for="(option, index) in filteredOptions"
                        @click="selectFilteredType(index,option.id)"
                        :class = " option.selected ? 'bg-blue-600' : 'bg-slate-600'" >  
                            {{option.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <div class="text-[13px] font-bold">
                    Data to be saved:
                </div>
                <div class="modal-msg">
                    {{msgType}}
                </div>
                <div class="modal-msg" :title="msgGenres">
                    Genres: {{msgGenres}}
                </div>
                <div class="modal-msg" :title="msgStyles">
                    Styles: {{ msgStyles }}
                </div>
            </div>
            <div class="modal-buttons">
                <button class="cancel w-24" @click="closePopUp">Cancel</button>  
                <button class="ml-3 save w-28" @click="saveData">Save Data</button>                
            </div>
        </div>
    </div>  
</template>

<script setup>
    import {defineEmits, defineProps, ref, computed, onBeforeMount, watch, onBeforeUnmount} from "vue";
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import { onClickOutside } from '@vueuse/core'  
    import genresJson from '../data/genres-w-value.json'
    import stylesJson from '../data/styles-w-value.json'
    import axios from "axios";
    import Spinner from '../components/SpinnerLoaderWhite.vue'
    
    const filteredOptions = ref([])  
    const filterInput = ref('')
    const filterGenres = ref(null)    
    const filterStyles = ref(null)   
    const showGenres = ref(false)
    const genresOptions = ref(genresJson)
    const showStyles = ref(false)
    const stylesOptions = ref(stylesJson)
    const genresSelected = computed(()=> genresOptions.value.filter(type => type.selected ).map(type => type.name ))
    const stylesSelected = computed(()=> stylesOptions.value.filter(type => type.selected ).map(type => type.name ))
    const release_type = ref(0)    
    const emit = defineEmits(["closeModal"])
    const { release, genres, styles }  = defineProps(['release','genres','styles'])
    const types = {
      'Album' : 1,
      'Single' : 2,      
      'Compilation': 3,
      'EP' : 4,
      1: 'Album',
      2: 'Single',
      3: 'Compilation',
      4: 'EP'
    }
    onClickOutside(filterStyles, () => ( showStyles.value=false ))
    onClickOutside(filterGenres, () => ( showGenres.value=false ))

    const msgType = computed(() =>{ return 'Release type: '+types[release_type.value] })
    const msgGenres = computed(() =>{ return genresSelected.value.length ? genresSelected.value.join(', ') : 'No genres selected!' })
    const msgStyles = computed(() =>{ return stylesSelected.value.length ? stylesSelected.value.join(', ') : 'No styles selected!' })

    //Genres Functions
    function selectType(index){
        genresOptions.value[index].selected = !genresOptions.value[index].selected
        sortGenres()     
    }

    const sortGenres = () =>{
        genresOptions.value.sort((a, b) => {
            if (a.selected && !b.selected) {
                return -1;
            } else if (!a.selected && b.selected) {
                return 1; 
            } else {
                return a.id - b.id; 
            }
        });
    }

    //Styles Functions  
    watch(filterInput, ()=>{
        filteredOptions.value = stylesOptions.value.filter(option => option.name.toLowerCase().includes(filterInput.value.toLowerCase()))
    }
    )  

    function selectTypeStyles(index){
        stylesOptions.value[index].selected = !stylesOptions.value[index].selected
        sortStyles()        
    }

    function selectFilteredType(indexFiltered, indexOptions){
        filteredOptions.value[indexFiltered].selected = !filteredOptions.value[indexFiltered].selected
        stylesOptions.value.forEach((option, index) => {
            if (option.id == indexOptions){
                stylesOptions.value[index].selected = filteredOptions.value[indexFiltered].selected
            }
        })
        sortStyles()  
    }

    const sortStyles = () =>{
        stylesOptions.value.sort((a, b) => {
            if (a.selected && !b.selected) {
                return -1;
            } else if (!a.selected && b.selected) {
                return 1; 
            } else {
                return a.id - b.id; 
            }
        });
    }
   
    ///
    
    const setGenres = () =>{
        genres.forEach(genre => {
            genresOptions.value.forEach(option => {
                if (option.name == genre){
                    option.selected = true
                }
            })
        })
    }
    const setStyles = () =>{
        styles.forEach(style => {
            stylesOptions.value.forEach(option => {
                if (option.name == style){
                    option.selected = true
                }
            })
        })
    }

    ///

    const closePopUp = () =>{
        emit("closeModal")
    }

    const saveData = () => {
        const params = {
            release_type: release_type.value,
            genres: genresSelected.value,
            styles: stylesSelected.value
        }
        console.log(params)
    }

    onBeforeMount(() => {
        release_type.value = types[release]
        setGenres()
        setStyles()
        sortGenres()
        sortStyles()
    })

    onBeforeUnmount(() => {
        genresOptions.value.forEach(option => {
            option.selected = false
        })
        stylesOptions.value.forEach(option => {
            option.selected = false
        })
        release_type.value = 0
    })

</script>


<style scoped>

    .modal-msg{
        @apply text-white text-[13px] truncate w-full;
    }

    .label-row{
        @apply w-[145px] text-left
    }

    .filter-row{
        @apply flex flex-row w-full h-[36px] justify-start items-center mb-5;
    }
    .filter-header{
        @apply relative text-white flex w-[160px] bg-slate-600 justify-between items-center;
        @apply rounded-full hover:bg-slate-500 ;
        @apply h-[36px];
        @apply transition-all duration-300 ease-in-out;
    }

    select{
        @apply bg-slate-600 hover:bg-slate-500 text-white rounded-full;
        @apply w-[160px] h-[36px] px-2; 
    }

    .option{
        @apply text-sm flex items-center h-auto p-1 w-full;
        @apply cursor-pointer text-left ;
        @apply transition-all duration-300 ease-in-out;
        @apply hover:bg-blue-600;                 
    }

    .option-styles{
        @apply text-sm flex items-center p-1 w-full h-auto py-1;
        @apply cursor-pointer text-left;
        @apply transition-all duration-300 ease-in-out;
        @apply max-h-9;
        @apply hover:bg-blue-600;           
    }
   
    .show-button{
        @apply cursor-default;
    }
    .options-container-genres{
        @apply absolute top-[38px] flex flex-wrap w-full h-auto rounded-xl p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto max-h-[200px];
        
    }

    .options-container-styles{
        @apply absolute top-[70px] flex flex-wrap w-full h-auto rounded-xl p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto max-h-[150px];
    }

    label{
        @apply text-white flex items-center justify-center mr-2
    }


    .header-label{
        @apply ml-3 cursor-default w-full h-full flex items-center justify-start;
    }

    .filter-input{
        @apply w-full h-full border-none rounded-full px-2 text-xs;
        @apply text-white bg-slate-800;
    }


    .modal-background{
        @apply absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 overflow-hidden;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-body{
        @apply bg-black text-white rounded-lg p-5 flex flex-row flex-wrap;
        @apply w-[350px] h-auto;

    }
    .modal-header{
        @apply text-left w-full text-2xl mb-3 truncate ;
    }
    .modal-message{
        @apply text-sm mb-4 truncate;
    }

    .modal-buttons{
        @apply flex w-full h-[36px] justify-end items-center mt-3;
    }

    .search-container{
        @apply absolute top-[40px] flex flex-wrap w-[150px] h-[30px] px-1 py-1 z-[1];
        @apply bg-black rounded-tl-xl rounded-tr-xl ;
    }

    
    .filtered-container{
        @apply rounded-bl-xl rounded-br-xl;
        @apply absolute top-[70px] flex flex-wrap w-full h-auto p-1 z-[25];
        @apply bg-black;
        @apply overflow-auto max-h-[350px];
    } 


    button{
        @apply flex justify-center items-center h-full text-base rounded-full text-black;
        @apply transition-all duration-300 ease-in-out;
    }

    button.save{
        @apply bg-green-400 rounded-full hover:bg-green-600 text-base;
    }

    button.cancel{
        @apply bg-red-400 rounded-full hover:bg-red-600 text-base;
    }

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






</style>