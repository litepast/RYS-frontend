<template>
    <div class="h-full w-full pt-[70px]">
        <div class="filter-container">
            <button class="bg-green-400 text-sm text-black" @click="searchAlbumSpotify">
                Update Search
            </button>
            <button @click="storeSearchView.typeSearch=true" :class="!typeSearch ? 'bg-slate-600 text-sm text-white' : 'bg-slate-50 text-sm text-black' ">
            Artist Name</button>
            <button @click="storeSearchView.typeSearch=false" :class="typeSearch ? 'bg-slate-600 text-sm text-white' : 'bg-slate-50 text-sm text-black' ">
            Album Name</button>            
            <div v-if="result && goodResponse">        
                <div v-if="albums.length" class="text-white">Showing {{ albums.length }} results for {{ result }}</div>
                <div v-else class="text-white"> No results for {{ result }}</div>         
            </div>                                 
        </div>   
        <div class="flex w-full h-[calc(100%-70px)]">
            <div v-if="loadingSearch" class="flex w-full h-full justify-center items-center">
                <Spinner/>                  
            </div>
            <div v-else class="results-container">
                <div v-if="goodResponse" class="results-container">
                    <CardAlbum v-for="album in albums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date.substring(0,4)" :artist="album.artist"
                    @addAlbum="addAlbumLibrary" />
                </div>
                <div v-else class="results-container" >                    
                        <SomethingWrong/>                  
                </div>
            </div>
        </div>
        <Teleport to="Body">
            <div v-if="loading" class="loading"></div>
            <div v-if="showModal">
                <PopUp @closeModal="showModal=false" :header="popUp.header" :message="popUp.message"/>
            </div>    
        </Teleport>
    </div>
 </template>
 
 
<script setup>
    import{ computed, watch, ref} from 'vue'
    import axios from 'axios'
    import { useSearchStore } from '../stores/search.js'
    import { useSearchViewStore } from '../stores/search-view.js'
    import CardAlbum from '../components/CardAlbum.vue'
    import PopUp from '../components/Popup.vue'
    import Spinner from '../components/SpinnerLoaderBlack.vue'
    import SomethingWrong from '../components/SomethingWrong.vue'

    const goodResponse = ref(true)
    const showModal = ref(false)
    const storeSearch = useSearchStore()  
    const storeSearchView =  useSearchViewStore()
    const enter = computed(() => storeSearch.enterCount)    
    const albums = computed(() => storeSearchView.albums)
    const typeSearch = computed(() => storeSearchView.typeSearch)
    const result = computed(() => storeSearchView.input)
    const loadingSearch = ref(false)
    const loading = ref(false)
    const popUp = {
        header : '',
        message : ''
    }

    watch([enter,typeSearch], () =>{
        searchAlbumSpotify()
    })
    
    function searchAlbumSpotify(){
        if (!storeSearch.input.length)
            {return}
        loadingSearch.value = true;              
        let url = 'http://192.168.100.14:5000/api/v1/search-spotify?p1='+String(Number(typeSearch.value))+'&p2='+storeSearch.input        
        axios.get(url)
            .then((response) => {    
                goodResponse.value = true
                storeSearchView.albums = response.data.albums 
                storeSearchView.input = storeSearch.input
            })
            .catch((error) => {
                goodResponse.value = false
                console.error(error);
            })
            .finally(() => {
                loadingSearch.value = false                  
            })
    }
    
    function addAlbumLibrary(a_id,a_name){
        loading.value = true;
        let url = 'http://192.168.100.14:5000/api/v1/insert-album-catalog/'+a_id
        popUp.header = a_name        
        axios.put(url)
            .then((response) => {      
                    if (response.status === 200){
                        popUp.message = response.data.msg
                    }else{
                        popUp.message = 'Error in request, try again later!'
                    }                            
               
            })
            .catch((error) => {                    
                popUp.message = 'Error in request, try again later!'
            })
            .finally(() => {
                loading.value = false
                showModal.value=true
            })
    }
</script>

<style scope>
    .loading{
        @apply absolute top-0 left-0 w-full h-full flex justify-center items-center z-20;
        background-color: rgba(0, 0, 0, 0.4);
    }    

    .filter-container{
        @apply flex items-center h-auto w-full mb-5 px-5;
    }

    .filter-container button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3;
    }

    .results-container{
        @apply flex flex-wrap h-full w-full p-2 ;
    }
</style>