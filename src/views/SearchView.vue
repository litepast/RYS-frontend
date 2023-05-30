<template>
    <div class="text-gray-50">
     Search view
    </div>
   
    <div class="flex flex-wrap mt-5 bg-slate-950">
        <div v-for="album in albums" class="max-h-[160] m-2 rounded-lg overflow-hidden
        text-ellipsis text-white bg-slate-900 hover:bg-slate-800" :key="album.album_id"        >
            <img class="align-middle" :src="album.cover_url" alt="alnums" width="200" height="200">
            <div class="text-elipsis font-semibold">{{album.name}}</div>
            <div class="text-elipsis text-gray-500">{{album.release_date.substring(0,4)}} - {{album.artist}}</div>            
        </div>
    </div>
 </template>
 
<script setup>
    import{ref, computed, watch} from 'vue'
    import axios from 'axios'
    import { useSearchStore } from '../stores/search.js'
    const store = useSearchStore()   
    const enter = computed(() => store.enterCount)
    const albums = ref({})   
     

    watch(enter, () =>{
        var url = 'http://127.0.0.1:5000/api/v1/search-spotify?p1=0&p2='+store.input        
        axios.get(url)
            .then((response) => {
                albums.value = response.data.albums               
            })
            .catch((error) => {
                console.error(error);
            })
    })
    
      
 
</script>