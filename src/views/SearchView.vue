<template>
    <div class="h-full w-full pt-[70px]">
        <div class="filters-container">
            <button class="h-[36px] w-[130px] bg-green-400 text-sm text-black active:bg-green-600" @click="searchAlbumSpotify">
                Update Search
            </button>
            <button class="h-[36px] w-[130px] bg-green-400 text-sm text-black active:bg-green-600"  @click="newSearch()">
                New Releases
            </button>
            <button class="h-[36px] w-[110px]" @click="storeSearchView.typeSearch=true" :class="!typeSearch ? 'bg-slate-600 text-sm text-white  hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
            Artist Name</button>
            <button class="h-[36px] w-[115px]" @click="storeSearchView.typeSearch=false" :class="typeSearch ? 'bg-slate-600 text-sm text-white  hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
            Album Name</button> 
            <div v-if="welcomeMsg && goodResponse" class="text-white">
               Here you have the newest releases from Spotify
            </div>
            <div v-else>
                <div v-if="result && goodResponse">        
                    <div v-if="albums.length" class="text-white">Showing {{ albums.length }} results for {{ result }}</div>
                    <div v-else class="text-white"> No results for {{ result }}</div>         
                </div>                
            </div>
        </div>    
        <div class="w-full h-[calc(100%-70px)]">
            <div v-if="loading" class="flex w-full h-full justify-center items-center">
                <Spinner/>                  
            </div>
            <div v-else class="results-container">
                <div v-if="goodResponse" class="results-cnt">
                    <CardAlbum v-for="album in albums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date.substring(0,4)" :artist="album.artist"
                    @addAlbum="addAlbumLibrary" />
                </div>
                <div v-else class="results-container" >                    
                        <SomethingWrong/>                  
                </div>
            </div>
        </div>
        <Teleport to="Body">
            <div v-if="showModal">
                <Modal @closeModal="showModal=false" :id="albumToAdd.id" :name="albumToAdd.name"/>
            </div>    
        </Teleport>
    </div>
 </template>
 
 
<script setup>
    import{ computed, watch, ref, onBeforeMount} from 'vue'
    import axios from 'axios'
    import { useSearchStore } from '../stores/search.js'
    import { useSearchViewStore } from '../stores/search-view.js'
    import CardAlbum from '../components/CardAlbumSearch.vue'
    import Modal from '../components/ModalAddAlbum.vue'
    import Spinner from '../components/SpinnerLoaderBlack.vue'
    import SomethingWrong from '../components/SomethingWrong.vue'
    import { FLASK_API } from '../../config';
   

    const goodResponse = computed(() => storeSearchView.goodResponse)
    const showModal = ref(false)
    const storeSearch = useSearchStore()  
    const storeSearchView =  useSearchViewStore()
    const enter = computed(() => storeSearch.enterCount)    
    const albums = computed(() => storeSearchView.albums)
    const typeSearch = computed(() => storeSearchView.typeSearch)
    const result = computed(() => storeSearchView.input)
    const loading = ref(false)
    const albumToAdd = { id:'', name:''}
    const firstLoad = computed(() => storeSearchView.firstLoad)
    const welcomeMsg = computed(() => storeSearchView.welcomeMsg)

    watch([enter,typeSearch], () =>{
        searchAlbumSpotify()
    })
    



    function searchAlbumSpotify(){
        if (!storeSearch.input.length)
            {return}
        loading.value = true;              
        let url = FLASK_API+'/api/v1/search-spotify?p1='+String(Number(typeSearch.value))+'&p2='+storeSearch.input        
        axios.get(url)
            .then((response) => {    
                storeSearchView.goodResponse = true
                storeSearchView.albums = response.data.albums 
                storeSearchView.input = storeSearch.input
            })
            .catch((error) => {
                storeSearchView.goodResponse = false
                console.error(error);
            })
            .finally(() => {
                storeSearchView.welcomeMsg = false
                loading.value = false                  
            })
    }


    function newSearch(){        
        loading.value = true;              
        let url = `${FLASK_API}api/v1/search-spotify?p1=0&p2=tag:new`     
        axios.get(url)
            .then((response) => {    
                storeSearchView.goodResponse = true
                storeSearchView.firstLoad = false
                storeSearchView.albums = response.data.albums                 
            })
            .catch((error) => {
                storeSearchView.goodResponse = false
                console.error(error);
            })
            .finally(() => {
                storeSearchView.welcomeMsg = true
                loading.value = false                  
            })
    }

    onBeforeMount(() => {
        if(!storeSearchView.goodResponse){
            if (firstLoad.value){
                newSearch()            
            }else{
                searchAlbumSpotify()
            }
        }

     
    })
    
    function addAlbumLibrary(a_id,a_name){
        albumToAdd.id = a_id
        albumToAdd.name = a_name
        showModal.value = true   
    }
</script>

<style scope>
    .filters-container{
        @apply flex items-center h-auto w-full mb-5 px-5;
    }

    .filters-container button{
        @apply rounded-full flex items-center justify-center  mr-3 transition-all duration-300 ease-in-out;
    }

    .results-container{
        @apply h-full w-full;
    }

    .results-cnt{
        @apply flex flex-wrap justify-start p-2;
    }
</style>