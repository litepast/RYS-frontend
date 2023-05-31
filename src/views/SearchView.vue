<template>
    <div class="m-8">
     <button class="rounded-full pl-3 pr-3 pt-2 pb-2 mr-3 " @click="typeSearch=false"
     :class=" typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
     >Album Name</button>
     <button class="rounded-full pl-3 pr-3 pt-2 pb-2" @click="typeSearch=true"
     :class=" !typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
     >Artist Name</button>
     </div>
   
    <div class="results-container">
        <div class="card" key="album.album_id" v-for="album in albums" > 
            <div class="relative">
                <div class="cursor-pointer absolute rounded-full w-[25%] h-[25%]
                 z-10 bg-red-600 right-[25px] bottom-[20px] text-center align-middle text-5xl">+</div>
                <img  :src="album.cover_url" />
            </div> 
            <div class="name" :title="album.name">{{album.name}} </div>
            <div class="artist">{{album.release_date.substring(0,4)}} - {{album.artist}}</div>            
        </div>
    </div>
 </template>
 

<style scope>

/* hover boder boton plus width */


    .results-container{
        @apply bg-transparent;
        @apply flex flex-wrap;
        @apply ml-8 mr-8 mb-8;
    }

    .card{
    @apply m-2 rounded-lg bg-slate-900 hover:bg-slate-800 border-none;
    @apply p-3;
    width: 256px;
    /*width: 15%;*/    
       
    }

    .card img{
        width: 100%;
        height: width;
    }

    .card .name{
        @apply truncate font-semibold mt-1 text-white;
    }

    .card .artist{
        @apply truncate font-medium mt-1 text-gray-500;
    }
</style>

 
<script setup>
    import{ref, computed, watch} from 'vue'
    import axios from 'axios'
    import { useSearchStore } from '../stores/search.js'
    const store = useSearchStore()   
    const enter = computed(() => store.enterCount)
    const albums = ref([])
    const typeSearch = ref(false)   
    
     

    watch(enter, () =>{
        var url = 'http://127.0.0.1:5000/api/v1/search-spotify?p1='+String(Number(typeSearch.value))+'&p2='+store.input        
        axios.get(url)
            .then((response) => {
                albums.value = response.data.albums               
            })
            .catch((error) => {
                console.error(error);
            })
    })


    
      
 
</script>