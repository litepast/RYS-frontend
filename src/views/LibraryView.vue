<template>
    <div  class="w-full h-full pt-[70px]" >
        <div class="filters-container">            
            <button class="bg-green-400 text-sm text-black active:bg-green-600" @click="getAlbums">
                Update Search
            </button>
            <button class="bg-green-400 text-sm text-black  active:bg-green-600" @click="LibraryViewStore.clear()">
                Clear Filters
            </button>        
            <button @click=" LibraryViewStore.typeSearch=true" :class="!typeSearch ? 'bg-slate-600 text-sm text-white hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
                Artist Name
            </button>          
            <button @click=" LibraryViewStore.typeSearch=false" :class="typeSearch ? 'bg-slate-600 text-sm text-white hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
                Album Name
            </button>
            <FilterType/>
            <FilterYear/>            
            <FilterRating/>
            <FilterGenre/>            
            <FilterStyle/> 
        </div>
        <div class="query-container">
            {{ LibraryViewStore.resultFor }} 
        </div> 
        <div class="flex w-full h-[calc(100%-76px)]" >
            <div v-if="loading" class="flex w-full h-full justify-center items-center">
                <Spinner/>                  
            </div>
            <div v-else class="results-container" >
                <div v-if="goodResponse" class="results-container">
                    <CardAlbumLibrary v-for="album in albums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date.substring(0,4)" :artist="album.artist"
                    :rating="Number(album.rating)" @deleteAlbum="deleteAlbumLibrary"/>
                </div>
                <div v-else class="results-container" >                    
                        <SomethingWrong/>                  
                </div>
            </div>
        </div>
        <Teleport to="Body">
            <div v-if="showModal">
                <Modal @closeModal="showModal=false" @closewithDelete="refreshfromDelete" :id="dataToDelete.id" :name="dataToDelete.name"/>
            </div>    
        </Teleport>
    </div>
    
 </template>
 
 <script setup>
    import FilterType from '../components/FilterType.vue'
    import FilterYear from '../components/FilterYear.vue'
    import FilterRating from '../components/FilterRating.vue'
    import FilterGenre from '../components/FilterGenre.vue'
    import FilterStyle from '../components/FilterStyle.vue'   
    import { computed, ref, watch, onBeforeMount} from 'vue'
    import { useSearchStore } from '../stores/search.js'
    import { useLibraryViewStore } from '../stores/library-view.js'
    import axios from 'axios' 
    
    import CardAlbumLibrary from '../components/CardAlbumLibrary.vue'
    import Spinner from '../components/SpinnerLoaderBlack.vue'
    import SomethingWrong from '../components/SomethingWrong.vue'
    import Modal from '../components/ModalDeleteAlbum.vue'
    

    const storeSearch = useSearchStore()   
    const LibraryViewStore =  useLibraryViewStore()
    const enter = computed(() => storeSearch.enterCount) 
    const typeSearch = computed(() => LibraryViewStore.typeSearch)
    const input = computed(() => storeSearch.input)
    const albums = ref([])
    const loading = ref(false)
    const showModal = ref(false)
    const dataToDelete = { id:'', name:''}
    const goodResponse = ref(true)


  
    
    watch ([typeSearch,input], () => {
        updateNameinQuery()    
    })

    watch(enter, () => { 
        updateNameinQuery()       
        getAlbums()
    } 
    )


    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    const updateNameinQuery = () => {
        if(!typeSearch.value){
            LibraryViewStore.query.artist_name = ''
            LibraryViewStore.query.album_name = input.value
        }else{
            LibraryViewStore.query.album_name = ''
            LibraryViewStore.query.artist_name = input.value
        } 
    }

    function deleteAlbumLibrary(a_id,a_name){
        dataToDelete.id = a_id
        dataToDelete.name = a_name
        showModal.value = true        
 
    }

    async function getAlbums() {
        loading.value = true
        LibraryViewStore.loading = true
        axios.get('http://192.168.100.14:5000/api/v1/search-album-catalog', { params: LibraryViewStore.query })
        .then(async response => {  
            //await delay(300);
            goodResponse.value = true
            albums.value = await response.data.albums
            LibraryViewStore.resultFor = resultsLabel()            
        })
        .catch((error) => {
                goodResponse.value = false
                console.error(error);
            })
        .finally(async () => {
            await delay(500);
            loading.value = false
            LibraryViewStore.loading = false
        })

    }

    async function refreshfromDelete(){
        showModal.value = false
        getAlbums()
    }

    



    onBeforeMount(async () => {
        getAlbums()
    })


    function resultsLabel(){ 
        let results = [] 
        let resultsArtist = ''
        let resultsAlbum = ''
        let resultsTypes = '' 
        let resultsYears = ''
        let resultsRatings = ''
        let resultsGenres = ''
        let resultsStyles = ''

        if(LibraryViewStore.query.album_name != ''){
            resultsAlbum = 'Album Name: ' + LibraryViewStore.query.album_name
        }else{
            resultsAlbum = 'All Albums'
        }
        
        if(LibraryViewStore.query.artist_name != ''){
            resultsArtist = 'Artist Name: ' + LibraryViewStore.query.artist_name
        }else{
            resultsArtist = 'All Artists'
        }

        if(LibraryViewStore.query.types.length){
            resultsTypes = 'Types: ' + LibraryViewStore.query.types.join(', ')
        }else{
            resultsTypes = 'All Types'
        }
        
        if(LibraryViewStore.query.years.length){
            if(LibraryViewStore.query.years.length < 15){
                resultsYears = 'Years: ' + LibraryViewStore.query.years.join(', ')
            }else{
                resultsYears =  'Multiple Years'
            }
        }else{
            resultsYears = 'All Years'
        }
        
        if(LibraryViewStore.query.ratings.length){
            if(LibraryViewStore.query.ratings.length < 15){
                resultsRatings = 'Ratings: ' + LibraryViewStore.query.ratings.join(', ')
            }else{
                resultsRatings =  'Multiple Ratings'
            }
        }else{
            resultsRatings = 'All Ratings'
        }

        if(LibraryViewStore.query.genres.length){
            if(LibraryViewStore.query.genres.length < 15){
                resultsGenres = 'Genres: ' + LibraryViewStore.query.genres.join(', ')
            }else{
                resultsGenres =  'Multiple Genres'
            }
        }else{
            resultsGenres = 'All Genres'
        }
        
        if(LibraryViewStore.query.styles.length){
            if(LibraryViewStore.query.styles.length < 15){
                resultsStyles = 'Styles: ' + LibraryViewStore.query.styles.join(', ')
            }else{
                resultsStyles =  'Multiple Styles'
            }
        }else{
            resultsStyles = 'All Styles'
        }

        results.push(resultsArtist)
        results.push(resultsAlbum)
        results.push(resultsTypes)
        results.push(resultsYears)
        results.push(resultsRatings)
        results.push(resultsGenres)
        results.push(resultsStyles)

        if (albums.value.length){
            return 'Showing '+ albums.value.length +' results for: ' + results.join('; ')
            
         }else{
            return 'No results for: ' +  results.join('; ')
         }  
    } 
    

 </script>

<style scoped>
    .filters-container{
        @apply flex items-center h-auto w-full mb-5 px-5;
    }

    .filters-container button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3 transition-all duration-300 ease-in-out;
    }

    .query-container{
    @apply flex text-white w-full text-sm px-5
    }

    .results-container{
        @apply flex flex-wrap h-full w-full p-2 ;
    }

</style>