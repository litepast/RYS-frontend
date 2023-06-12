<template>
    
    <div class="filters-container">
        <button class="bg-slate-800 text-sm text-white rounded-full pl-3 pr-3 pt-2 pb-2 mr-3"
        @click="LibraryViewStore.clear()">
                Clear Filters
        </button>
        <div class="filter-name">           
            <button @click=" LibraryViewStore.typeSearch=false" :class="typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
            >Album Name</button>
            <button @click=" LibraryViewStore.typeSearch=true" :class="!typeSearch ? 'bg-slate-800 text-sm text-white' : 'bg-slate-50 text-sm text-black' "
            >Artist Name</button>
        </div>
        <FilterType/>
        <FilterYear/>
        <FilterRating/>
        <FilterGenre/>
        <FilterStyle/>
    </div>
    <div class="query-container text-white">
        {{ LibraryViewStore.resultFor }}
    </div>
    
    <div class="results-container">             
        <CardAlbumLibrary v-for="album in albums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date.substring(0,4)" :artist="album.artist"
        :rating="Number(album.rating)"
        />
    </div>
 
 </template>
 
 <script setup>
    import FilterType from '../components/FilterType.vue'
    import FilterYear from '../components/FilterYear.vue'
    import FilterRating from '../components/FilterRating.vue'
    import FilterGenre from '../components/FilterGenre.vue'
    import FilterStyle from '../components/FilterStyle.vue'
    import { computed, ref, watch } from 'vue'
    import { useSearchStore } from '../stores/search.js'
    import { useLibraryViewStore } from '../stores/library-view.js'
    import axios from 'axios'   
    import CardAlbumLibrary from '../components/CardAlbumLibrary.vue'
    
    

    const storeSearch = useSearchStore()   
    const LibraryViewStore =  useLibraryViewStore()
    const enter = computed(() => storeSearch.enterCount) 
    const typeSearch = computed(() => LibraryViewStore.typeSearch)
    const input = computed(() => storeSearch.input)
    const albums = computed(() => LibraryViewStore.albums)
    

    watch ([input,typeSearch], () => {
        if(!typeSearch.value){
            LibraryViewStore.query.artist_name = ''
            LibraryViewStore.query.album_name = storeSearch.input
        }else{
            LibraryViewStore.query.album_name = ''
            LibraryViewStore.query.artist_name = storeSearch.input
        }        
    }
    )

    watch([enter,LibraryViewStore.query], () => {
        axios.get('http://192.168.100.14:5000/api/v1/search-album-catalog', { params: LibraryViewStore.query })
        .then(response => {            
            LibraryViewStore.albums = response.data.albums
            LibraryViewStore.resultFor = resultsLabel()            
        })
        .catch(error => {
            console.error(error);
        });
    } 
    )

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

        results.push(resultsAlbum)
        results.push(resultsArtist)
        results.push(resultsTypes)
        results.push(resultsYears)
        results.push(resultsRatings)
        results.push(resultsGenres)
        results.push(resultsStyles)

        if (LibraryViewStore.albums.length){
            return 'Showing '+ LibraryViewStore.albums.length +' results for: ' + results.join('; ')
            
         }else{
            return 'No results for: ' +  results.join('; ')
         }    
        
    } 
    

 </script>

<style scoped>

.filter-name button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3;
    }




.filters-container{
    @apply flex flex-wrap m-5
}



</style>