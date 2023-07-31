<template>
    <div  class="w-full h-full pt-[70px]" > 
        <div class="filters-container">                        
            <button class="h-[36px] w-[130px] bg-green-400 text-sm text-black active:bg-green-600" @click="storeSearch.enter()">
                Update Search
            </button>
            <button class="h-[36px] w-[110px] bg-green-400 text-sm text-black  active:bg-green-600" @click="LibraryViewStore.clear()">
                Clear Filters
            </button>        
            <button class="h-[36px] w-[110px]" @click=" LibraryViewStore.typeSearch=true" :class="!typeSearch ? 'bg-slate-600 text-sm text-white hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
                Artist Name
            </button>          
            <button class="h-[36px] w-[115px]" @click=" LibraryViewStore.typeSearch=false" :class="typeSearch ? 'bg-slate-600 text-sm text-white hover:bg-slate-500' : 'bg-slate-50 text-sm text-black' ">
                Album Name
            </button>
            <FilterType/>
            <FilterYear/>            
            <FilterRating/>
            <FilterGenre/>            
            <FilterStyle/> 
        </div>
        <div class="query-container">
            {{ LibraryViewStore.filtersText }}
        </div>
        <div class="pagination-container">               
            <div class="results-label">
                {{ albums.length ? albums.length +' Total Results'  : 'No results'}}
            </div>           
            <div class="pag-settings">
                <label for="itemsQty">Items per page:</label>                           
                <select v-model="LibraryViewStore.itemsPerPage" class="w-14" id="itemsQty">
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
                 <label for="Order">Order by:</label>
                <select v-model="LibraryViewStore.orderPage"  class="w-20" id="Order">
                    <option value="1">Artist</option>
                    <option value="4">Album</option>
                    <option value="2">Year</option>
                    <option value="3">Rating</option>
                </select>
                <Paginate 
                    v-model="LibraryViewStore.currentPage"
                    :page-count="numberPages"
                    :page-range="2"
                    :margin-pages="2"
                    :container-class="'flex'"                             
                    :prev-text="' ⇤ Prev'"
                    :next-text="'Next ⇥ '"
                    :prev-class="'text-gray-400 hover:text-white w-24 h-8 flex justify-center items-center  cursor-pointer transition-all duration-300 ease-in-out'"
                    :next-class="'text-gray-400 hover:text-white w-24 h-8 flex justify-center items-center  cursor-pointer transition-all duration-300 ease-in-out'"              
                    :page-class="' text-gray-400 hover:text-white w-8 h-8 flex justify-center items-center  cursor-pointer mx-2 transition-all duration-300 ease-in-out'"                
                    :active-class="'bg-green-500 hover:bg-green-400 !text-black rounded-full transition-all duration-300 ease-in-out'">              
                </Paginate> 
            </div> 
        </div>
        <div class="data-container" >
            <div v-if="loading" class="spinner-container">
                <Spinner/>                  
            </div>
            <div v-else class="results-container" >
                <div v-if="goodResponse" class="results-container-cards">
                    <CardAlbumLibrary v-for="album in filteredAlbums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date" :artist="album.artist"
                    :rating="Number(album.rating)" @deleteAlbum="deleteAlbumLibrary" @goToAlbumView="goToAlbumView"/>
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
    import { computed, ref, watch, onBeforeMount, toRef} from 'vue'
    import { useSearchStore } from '../stores/search.js'
    import { useLibraryViewStore } from '../stores/library-view.js'
    import axios from 'axios'     
    import CardAlbumLibrary from '../components/CardAlbumLibrary.vue'   
    import SomethingWrong from '../components/SomethingWrong.vue'
    import Modal from '../components/ModalDeleteAlbum.vue'
    import Paginate from 'vuejs-paginate-next';
    import { useRouter } from 'vue-router'
    import Spinner from '../components/SpinnerLoaderBlack.vue'

    const router = useRouter()
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
    const ordPage = toRef(LibraryViewStore, 'orderPage')
    const itemsPage = toRef(LibraryViewStore, 'itemsPerPage')

    
      
    watch ([typeSearch,input], () => {        
        updateNameinQuery()            
    })

    watch(enter, () => {
        LibraryViewStore.currentPage = 1       
        getAlbums()
    })

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

    function goToAlbumView(a_id) { 
        router.push(`/library/${a_id}`)
    }
 
    const filteredAlbums = computed( () => {
        const start = (LibraryViewStore.currentPage - 1) * itemsPage.value 
        const end = start + Number(LibraryViewStore.itemsPerPage)                     
        return albums.value.slice(start, end)
    });

    

    watch(itemsPage , () => {
        LibraryViewStore.currentPage = 1;
    });

    watch(ordPage, () => {
        LibraryViewStore.currentPage = 1;
        orderAlbums()
    })

    const numberPages = computed(() => {
        return Math.ceil(albums.value.length / Number(LibraryViewStore.itemsPerPage));
    });    
    
    
    const orderAlbums = ()  => {
        if(LibraryViewStore.orderPage == 1){
            albums.value.sort((a, b) => {
                if (a.artist < b.artist) return -1;
                if (a.artist > b.artist) return 1;
                if (a.release_date < b.release_date) return -1;
                if (a.release_date > b.release_date) return 1;
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            });
        }
        if(LibraryViewStore.orderPage == 2){
            albums.value.sort((a, b) => {
                if (a.release_date < b.release_date) return -1;
                if (a.release_date > b.release_date) return 1;
                if (a.artist < b.artist) return -1;
                if (a.artist > b.artist) return 1;
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            });
        }
        if(LibraryViewStore.orderPage == 3){
            albums.value.sort((a, b) => {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                if (a.artist < b.artist) return -1;
                if (a.artist > b.artist) return 1;
                if (a.release_date < b.release_date) return -1;
                if (a.release_date > b.release_date) return 1;
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
        if(LibraryViewStore.orderPage == 4){
            albums.value.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                if (a.artist < b.artist) return -1;
                if (a.artist > b.artist) return 1;
                if (a.release_date < b.release_date) return -1;
                if (a.release_date > b.release_date) return 1;
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            });
        }
    }

    async function getAlbums() {
        loading.value = true
        axios.get('http://192.168.100.14:5000/api/v1/search-album-catalog', { params: LibraryViewStore.query })
        .then(async response => {  
            goodResponse.value = true
            albums.value = await response.data.albums
            
            if (albums.value.length){                
                orderAlbums() 
            }else{
                LibraryViewStore.numberPages = 1
            }                       
        })
        .catch((error) => {                
                LibraryViewStore.numberPages = 1
                goodResponse.value = false
                console.error(error);
            })
        .finally(async () => {
            await delay(10);
            loading.value = false
        })
    }

    async function refreshfromDelete(){
        showModal.value = false
        getAlbums()
    }  

    onBeforeMount(async () => {
        getAlbums()
    })

    

 </script>


<style scoped>

    .pagination-container{
        @apply w-full flex items-center justify-between pl-5 pr-10;
    }
    .results-label{
        @apply text-white flex items-center
    }
    
    .pag-settings{
        @apply flex items-center
    }
    .pag-settings label{
        @apply text-white flex items-center justify-center mr-2
    }

    .pag-settings select{
        @apply bg-slate-600 hover:bg-slate-500 text-white rounded-md mr-2 h-8;
    }

 
    .filters-container{
        @apply flex items-center justify-start h-auto w-full mb-2;
    }

    .filters-container button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3 transition-all duration-300 ease-in-out;
    }

    .query-container{
    @apply flex text-white w-full text-[13px] px-5 pt-2 mb-1
    }

    .data-container{
        @apply flex w-full h-[calc(100%-110px)]
    }

    .spinner-container {
        @apply flex w-full justify-center items-center;
    }
 
    .results-container{
        @apply flex h-full w-full;
    }

    .results-container-cards{
        @apply flex flex-wrap justify-start p-2;
    }

</style>
 
