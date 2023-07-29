<template>
    <div  class="w-full h-full pt-[70px]" >
  
        <div class="flex flex-wrap w-full">
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
                {{ LibraryViewStore.filtersText }}
            </div> 
        </div>

        <div class="pagination-container w-full flex items-center justify-end pl-5 pr-10">               
            <div class="text-white flex items-center mr-5">
                {{ albums.length ? albums.length +' Total Results'  : 'No results'}}
            </div>
            <div class="flex div">
                <label for="itemsQty" class="text-white flex items-center justify-center mr-2">Items per page:</label>                           
                <select v-model="itemsPerPage" class="bg-slate-600 hover:bg-slate-500 text-white rounded-sm w-14 mr-4" id="itemsQty">
                    <option class="">25</option>
                    <option class="">50</option>
                    <option class="">100</option>
                </select>
                 <label for="Order" class="text-white flex items-center justify-center mr-2">Order by:</label>
                <select v-model="orderPage"  class=" bg-slate-600 hover:bg-slate-500 text-white rounded-sm w-20 " id="Order">
                    <option value="1">Artist</option>
                    <option value="4">Album</option>
                    <option value="2">Year</option>
                    <option value="3">Rating</option>
                </select>
                <Paginate 
                    v-model="currentPage"
                    :page-count="numberPages"
                    :page-range="2"
                    :margin-pages="2"
                    :container-class="'flex'"                             
                    :prev-text="' ⇤ Prev'"
                    :next-text="'Next ⇥ '"
                    :prev-class="'text-gray-400 hover:text-white w-24 h-8 flex justify-center items-center  cursor-pointer mx-2 transition-all duration-300 ease-in-out'"
                    :next-class="'text-gray-400 hover:text-white w-24 h-8 flex justify-center items-center  cursor-pointer mx-2 transition-all duration-300 ease-in-out'"              
                    :page-class="' text-gray-400 hover:text-white w-8 h-8 flex justify-center items-center  cursor-pointer mx-2 transition-all duration-300 ease-in-out'"                
                    :active-class="'bg-green-500 hover:bg-green-400 !text-black rounded-full transition-all duration-300 ease-in-out'">              
                </Paginate> 
            </div>
           
                     
        </div>

        <div class="flex w-full h-[calc(100%-76px)]" >
            <div v-if="loading" class="flex w-full h-full justify-center items-center">
                <Spinner/>                  
            </div>
            <div v-else class="results-container" >
                <div v-if="goodResponse" class="results-container">
                    <CardAlbumLibrary v-for="album in filteredAlbums" :id="album.album_id" :cover="album.cover_url" :name="album.name" :year="album.release_date" :artist="album.artist"
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
    import Paginate from 'vuejs-paginate-next';

    const currentPage = ref(1);
    const itemsPerPage = ref(25);
    const orderPage = ref(1);
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
    const query = computed(() => LibraryViewStore.query)

  
      
    watch ([typeSearch,input,query], () => {        
        updateNameinQuery()
        LibraryViewStore.resultFor = resultsLabel()     
    })

    watch(enter, () => {       
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

 
    const filteredAlbums = computed(() => {               
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;        
        return albums.value.slice(start, end);
    });

    watch(itemsPerPage, () => {
        currentPage.value = 1;
    });

    watch(orderPage, () => {
        currentPage.value = 1;
        orderAlbums()
    })

    const numberPages = computed(() => {
        return Math.ceil(albums.value.length / itemsPerPage.value);
    });    
    
    
    const orderAlbums = ()  => {
        if(orderPage.value == 1){
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
        if(orderPage.value == 2){
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
        if(orderPage.value == 3){
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
        if(orderPage.value==4){
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
        LibraryViewStore.loading = true
        axios.get('http://192.168.100.14:5000/api/v1/search-album-catalog', { params: LibraryViewStore.query })
        .then(async response => {  
            goodResponse.value = true
            albums.value = await response.data.albums
            currentPage.value = 1
            if (albums.value.length){                
                orderAlbums() 
            }else{
                numberPages.value = 1
            }                       
        })
        .catch((error) => {
                currentPage.value = 1
                numberPages.value = 1
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

    

 </script>

<style scoped>
    .filters-container{
        @apply flex items-center h-auto w-full mb-2;
    }

    .filters-container button{
        @apply rounded-full pl-3 pr-3 pt-2 pb-2 mr-3 transition-all duration-300 ease-in-out;
    }

    .query-container{
    @apply flex text-white w-full text-[13px] px-5 mb-2
    }

    .results-container{
        @apply flex flex-wrap h-full w-full p-2 ;
    }

</style>