<template>
    <div class="filter-container">
        <button @click="storeSearchView.typeSearch=false" :class="typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
        >Album Name</button>
        <button @click="storeSearchView.typeSearch=true" :class="!typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
        >Artist Name</button>
        <div v-if="albums.length" class="text-white">Showing {{ albums.length }} results for {{ result }}</div>
        <div v-else class="text-white"> No results for {{ result }}</div>       
     </div>   
    <div class="results-container">
        <CardAlbum v-for="album in albums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date.substring(0,4)" :artist="album.artist"/>
    </div>
 </template>
 
 
<script setup>
    import{ computed, watch, ref} from 'vue'
    import axios from 'axios'
    import { useSearchStore } from '../stores/search.js'
    import { useSearchViewStore } from '../stores/search-view.js'

    import CardAlbum from '../components/CardAlbum.vue'
    const storeSearch = useSearchStore()  
    const storeSearchView =  useSearchViewStore()
    const enter = computed(() => storeSearch.enterCount)    
    const albums = computed(() => storeSearchView.albums)
    const typeSearch = computed(() => storeSearchView.typeSearch) //ref(false)
    const result = computed(() => storeSearchView.input)

    watch([enter,typeSearch], () =>{
        if (!storeSearch.input)
            {return}
            
        var url = 'http://192.168.100.14:5000/api/v1/search-spotify?p1='+String(Number(typeSearch.value))+'&p2='+storeSearch.input        
        axios.get(url)
            .then((response) => {
                storeSearchView.albums = response.data.albums 
                storeSearchView.input = storeSearch.input
                console.log(response.data)              
            })
            .catch((error) => {
                console.error(error);
            })
    })    
</script>

<style scope>
    .filter-container{
        @apply m-8 flex items-center
    }

    .filter-container button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3;
    }

    .results-container{
        @apply bg-transparent flex flex-wrap ml-8 mr-8 mb-8;
    }
</style>
