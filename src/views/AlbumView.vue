<template >
    <div v-if="!loading" class="w-full" >
        <div v-if="goodResponse">
            <div class="album-header-container" :style="bgColor">
                <div class="album-header" :style="bgGradient">
                    <div class="album-cover relative"  @mouseenter="hoverCover=true" @mouseleave="hoverCover=false">
                        <img :src="album.cover_image">
                        <button v-show="hoverCover" @click="showModal=true" title="Click to Album info"
                        class="opacity-70 hover:opacity-100 right-[5px] top-[5px] absolute rounded-full w-10 h-10 bg-green-600 hover:bg-green-400 flex items-center justify-center hover:scale-110 transition-all duration-300 ease-in-out">
                            <Pen :size="24" class="text-black"/>
                        </button>
                    </div>        
                <div class="album-data">
                    <div class="album-type" @click="showModal=true" title="Click to Edit Release Type">
                        {{ album.release_type}} 
                    </div>
                    <div class="album-name" :title="album.album_name">
                        {{ album.album_name}}
                    </div>
                    <div class="album-artist">
                        <div class="font-semibold"> {{album.artist_name}} </div>
                        <div class="circle"></div>
                        <div> {{ album.release_date.substring(0,4) }}</div>
                        <div class="circle"></div>                    
                        <div> {{ album.total_discs }} {{ album.total_discs > 1 ? " discs" :"disc" }}</div>
                        <div class="circle"></div>                    
                        <div> {{ album.total_tracks }} {{ album.total_tracks > 1 ? " songs" :"song" }}</div>
                        <div class="circle"></div>                    
                        <div class="text-gray-200"> {{ totalDuration()}} </div>
                    </div> 
                    <div class="styles-container">
                        <div class="flex">
                            <div class="styles-label"> Genres: </div>
                            <div @click="showModal=true" class="styles-value" :class="noGenres ? ' text-yellow-400' : 'text-white'"
                            :title="noGenres ? 'Click to Assign Genres': 'Click to Edit Genres'">
                                {{ noGenres ? 'Without Genre Assigned' : genres }} 
                            </div>
                        </div>
                        <div class="flex">
                            <div class="styles-label"> Styles: </div>
                            <div @click="showModal=true" class="styles-value" :class="noStyles ? 'text-yellow-400' : 'text-white'"
                            :title="noStyles ? 'Click to Assign Styles': 'Click to Edit Styles'">
                                {{ noStyles ? 'Without Genre Assigned' : styles }}
                            </div>
                        </div>
                    </div>
                    <div class="rating-container" >
                        <div class ="rating-label" :title="ratingTitle()" > Your Rating: </div>
                        <StarRating :class=" unratedAlbum ? 'animate-bounce' : null " :title="ratingTitle()"
                        v-model:rating="album.rating" :star-size="22" :increment="0.5"  :show-rating="false" 
                        inactive-color="#ACACAC" border-color="#000000" active-color="#4ADE80" :border-width="1" />
                        <button class="button-clear ml-2 mt-1" @click="album.rating = null">Clear</button>
                    </div>
                    <div class="rating-container">
                        <div class="rating-label" title="Suggested rating based on your track ratings&#10;Rate all the included tracks to get one!">
                        Suggested Rating: </div>
                        <StarRating :title=" suggested_rating_final ? Math.ceil(suggested_rating_final*2)/2 + ' Stars' : 'Unrated'" :rating="suggested_rating_final" :star-size="22" :increment="0.5"  :show-rating="false"
                        inactive-color="#ACACAC" border-color="#000000" active-color="#4ADE80" :border-width="1" :read-only="true"/>
                    </div> 
                </div>
                <div class="actions-container h-16 w-full flex flex-row items-center justify-between mx-3 mt-3">
                    <div class="flex items-center w-auto">
                       
                        <div class="flex w-auto mr-2">
                            <button v-if="showPlayAlbumButton" class="player-album-button" @click="playAlbum()">
                                <Play  :size="40" class="text-black" />
                            </button>
                            <button v-else class="player-album-button">
                                <Pause :size="40" class="text-black" @click="playerPause()" />
                            </button>                            
                        </div>

                        <button class=" w-[125px] h-[36px] flex justify-center items-center cursor-pointer bg-green-400 active:bg-green-600 rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed"
                        @click="savedAlbumRatings" :disabled="!hasAlbumChanged" :title=" hasAlbumChanged ? 'Save Ratings' : 'Ratings Syncronized'  ">                        
                            Save Ratings
                        </button>
                    </div>
                    <div v-if="!connectionError">
                        <div class="text-white flex items-center mr-5" :class=" hasAlbumChanged ? 'animate-pulse' : null">                        
                            <Check v-if="!hasAlbumChanged" :size="20" class="text-green-400"  />
                            <Alert v-else :size="20" class="text-amber-400" />
                            <div class="mx-1"></div>
                            {{ hasAlbumChanged ? "Ratings modified and unsaved" : "Ratings Syncronized" }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-white flex items-center mr-5">                        
                            <Error :size="20" class="text-red-600"  />                            
                            <div class="mx-1"></div>
                            Error Syncing Ratings, Try again
                        </div>                        
                    </div>
                </div>
            </div>    
        </div>
        <li class="tracks-header-row ">
            <div class="tracks-left-slot">
                <div class="tracks-number"> # </div>
                <div class="tracks-title"> Title </div>
            </div>                    
            <div class="tracks-right-slot">
                <div class="tracks-rating pl-[60px]" title="Your Track Rating">
                    Rating 
                </div>
                <div class= "column" title="is this track goated? &#10;The track is so good, it is beyond 5 stars&#10;It will bost the album's suggested rating">
                    🐐 
                </div>                        
                <div @click="includeAllTracks()" class="column cursor-pointer" title="Include this track on your suggested rating calculation&#10;Click to change all shown tracks 'Included' Status">
                    Included
                </div>                        
                <div class="column" title="Duration">
                    <ClockTimeFourOutline :size="22"  class="text-gray-400"/>
                </div>
            </div>
        </li>
        <div class="tracks-full-container">
            <ul>
                <div class="tracks-by-discs-container" v-for="i in album.total_discs">
                    <li class="discs-row" v-if="album.total_discs > 1">
                        <div class="flex justify-center items-center ">
                            <div class="tracks-number">
                                <Disc :size="22" class="text-gray-400"/>
                            </div>
                            <div class="tracks-title  text-gray-400">
                                Disc {{ i }}                                                 
                            </div>
                        </div> 
                        <div class="column">
                            <button class="rounded-full" @click="showDiscs[i-1] = !showDiscs[i-1]" title="Show/Hide Tracks">
                                <ChevronDown v-if="showDiscs[i-1]" :size="22"  class="text-white"/>
                                <ChevronUp v-else :size="22" class="text-white"/>
                            </button>
                        </div>
                    </li>
                    <li  v-show="showDiscs[i-1]" class="tracks-row" v-for="(track, index) in album.tracks[i-1]" :key="track.track_id"
                    @mouseenter="isHover(true,track.track_overall_number)" @mouseleave="isHover(false,track.track_overall_number)">
                        <div class="tracks-left-slot cursor-pointer" >
                            <div class="tracks-number" >
                                <div v-if="isHovered && track.track_overall_number == trackHovered">
                                    <div v-if="track.track_id == currentTrackId && PlayerStore.songPlaying" class="" @click="playerPause()">
                                        <Pause :size="22" class="text-white hover:text-gray-200 transition-colors duration-300 ease-in-out" />                                  
                                    </div>
                                    <div v-else class="">                                        
                                        <Play :size="22" class="text-white hover:text-gray-200 transition-colors duration-300 ease-in-out" 
                                        @click="playTrack(track.track_overall_number,track.track_id)"/> 
                                    </div>
                                </div>
                                <div v-else class="">
                                    <div v-if="track.track_id == currentTrackId && PlayerStore.songPlaying" class="div">
                                        <AudioAnimation/>
                                    </div>
                                    <div v-else :class="track.track_id == currentTrackId ? 'text-green-400' : 'text-white'">
                                        {{ track.track_number_on_disc}}
                                    </div>
                                </div>
                            </div>
                            <div class="tracks-title" :title="track.track_name" :class="track.track_id == currentTrackId ? 'text-green-400' : 'text-white'">
                                <div class="text-[16px] truncate"> {{ track.track_name }} </div>
                                <div class="text-[13px] truncate" :title="track.track_artist">{{ track.track_artist }}</div>                      
                            </div>
                        </div>
                        <div class="tracks-right-slot">
                            <div class="tracks-rating pr-1">
                                <button class="button-clear ml-1" @click="album.tracks[i-1][index].track_rating = null ; album.tracks[i-1][index].goated = false">Clear</button>
                                <div class="mb-[6px]">
                                    <StarRating @click="updateRatingGoated2(i-1,index)" v-model:rating="album.tracks[i-1][index].track_rating" 
                                    :star-size="22" :increment="0.5"  :show-rating="false" 
                                    inactive-color="#ACACAC" border-color="#000000" active-color="#4ADE80"  :border-width="1"/>
                                </div>                                
                            </div> 
                            <div class="column">
                                <input  name="goated" type="checkbox"  class="checkbox" v-model="track.goated" @click="updateRatingGoated1(i-1,index)">
                            </div>
                            <div class="column">
                                <input name="included" type="checkbox" class="checkbox" v-model="track.included">
                            </div>
                            <div class="column text-[13px]">
                                {{ songDuration(track.track_duration_ms) }}
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
        <div class="w-full h-4 text-white"> 

            <!-- Current Index:{{ PlayerStore.currentIndex }}             
            <div class="flex flex-row" v-if="PlayerStore.queue.length" v-for="(trax, index) in PlayerStore.queue"> 
                <span :class=" index == PlayerStore.currentIndex ? 'text-green-400':'text-white'">
                {{ index }}</span> - {{ trax.name}}
            </div> -->
            
           
        </div>
        </div>
        <div v-else class="flex w-full h-full justify-center items-center">
            <SomethingWrong/>
        </div>       
    </div>
    <div v-else class="flex w-full h-full justify-center items-center">
        <Spinner/>   
    </div>   
    <Teleport to="Body">
        <div v-if="showModal">
            <Modal @closeModal="showModal=false" @closeModalSucess="refreshfromModal" :id_album="album.album_id" :release="album.release_type" :genres="album.genres" :styles="album.styles"/>
        </div>    
    </Teleport>    
</template>

<script setup>
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import ClockTimeFourOutline from 'vue-material-design-icons/ClockTimeFourOutline.vue'
    import Disc from 'vue-material-design-icons/Disc.vue'
    import Check from 'vue-material-design-icons/CheckBold.vue'
    import Alert from 'vue-material-design-icons/AlertCircle.vue'
    import Error from 'vue-material-design-icons/CloseCircle.vue'
    import Play from 'vue-material-design-icons/Play.vue'
    import Pause from 'vue-material-design-icons/Pause.vue'
    import AudioAnimation from '../components/AudioAnimation.vue';
    import StarRating from 'vue-star-rating'
    import { ref, computed, onBeforeMount, watch } from 'vue'
    import axios from 'axios'
    import {useRoute} from "vue-router"    
    import Spinner from '../components/SpinnerLoaderBlack.vue'
    import SomethingWrong from '../components/SomethingWrong.vue'
    import Modal from '../components/ModalEditAlbum.vue'
    import Pen from 'vue-material-design-icons/Pen.vue'
    import {usePlayerStore} from '../stores/player-store'
    import { playSong, playerPause, playerPlay } from '../spotify/player';
    import { FLASK_API } from '../../config';    
    const PlayerStore = usePlayerStore() 
    const trackHovered = ref(0)
    const isHovered = ref(false)
    const hoverCover= ref(false)
    const showModal = ref(false)
    const unratedAlbum = computed(() => suggested_rating_final.value && !album.value.rating)
    const goodResponse = ref(true)
    const showDiscs = ref([])
    const connectionError = ref(false)    
    const loading = ref(true)    
    const album = ref(false) 
    const hasAlbumChanged = ref(false)
    const genres = computed(() => album.value.genres.join(', '))
    const styles = computed(() => album.value.styles.join(', '))
    const noGenres = computed(() => genres.value == 'NOT_FOUND' ? true : false)
    const noStyles = computed(() => styles.value == 'NOT_FOUND' ? true : false)
    const bgColor = computed(() =>  `background-color: ${album.value.cover_color}` )
    const bgGradient = 'background : linear-gradient(to bottom, transparent, rgba(0,0,0,0.75) )'
    const route = useRoute()
    const paramId = computed(() => route.params.id)
    const albumRatingsParams = ref({})
    const tracksRatingsParams = ref([])     
    let albumSaved = false        
    const dateOptions = {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    //Playback functions

    const currentTrackId = computed(() =>{
        if(PlayerStore.queue.length > 0){
            return PlayerStore.currentTrack.id
        }else{
            return false
        }
    })

    const currentTrackAlbumId = computed(() =>{
        if(PlayerStore.queue.length > 0){
            return PlayerStore.currentAlbumId
        }else{
            return false
        }
    })

    const showPlayAlbumButton = computed(() => {
        if (currentTrackAlbumId.value == album.value.album_id && PlayerStore.songPlaying) {
            return false
        }else{
            return true
        }
    })

    function isHover(value,number){        
        isHovered.value = value
        trackHovered.value = number
    }

    function buildQueue(){
        let queue = []
        for (const disc of album.value.tracks) {
            for (const track of disc) {
                queue.push({
                    id: track.track_id,
                    artist: track.track_artist,
                    name: track.track_name,
                    duration: track.track_duration_ms,                    
                    album: album.value.album_name,
                    cover: album.value.cover_image,
                    album_id: album.value.album_id,
                })
            }
        }
        return queue
    }

    function playAlbum(){
       if(currentTrackAlbumId.value == album.value.album_id){
            playerPlay()
       }else{
            PlayerStore.originalQueue = buildQueue()            
            PlayerStore.currentAlbumId = album.value.album_id
            PlayerStore.queue = PlayerStore.originalQueue            
            if(PlayerStore.shuffle==false){ 
                PlayerStore.currentIndex = 0
                PlayerStore.currentTrackId = PlayerStore.queue[PlayerStore.currentIndex].id
                PlayerStore.setTrack() 
                playSong()
            }else{
                PlayerStore.currentIndex = Math.floor(Math.random() * PlayerStore.queue.length)
                PlayerStore.currentTrackId = PlayerStore.queue[PlayerStore.currentIndex].id
                PlayerStore.setTrack()
                PlayerStore.shuffleQueue()
                playSong()  
            }
       }    
    }
   
    function playTrack(index, id){
        if(currentTrackId.value == id){            
            playerPlay()
        }else{
            PlayerStore.originalQueue = buildQueue()
            PlayerStore.currentTrackId = id
            PlayerStore.currentAlbumId = album.value.album_id
            PlayerStore.queue = PlayerStore.originalQueue
            PlayerStore.currentIndex = index - 1
            PlayerStore.setTrack() 
            if(PlayerStore.shuffle==false){ 
                playSong()
            }else{
                PlayerStore.shuffleQueue()
                playSong()  
            }
        }
    }
  
    //Ratings functions
    watch( album, () => {
        if (album.value) {                    
            if(albumSaved == JSON.stringify(album.value)){
                hasAlbumChanged.value = false
            }else{
                hasAlbumChanged.value = true
            }
            tracksRatingsParams.value = album.value.tracks.flat().map(track => {
                return { track_id: track.track_id, track_rating: track.track_rating, goated: track.goated, included: track.included }
            })                
            albumRatingsParams.value = {  
                album_id: album.value.album_id,          
                simple_average_rating: simple_average_rating.value,
                weighted_average_rating: weighted_average_rating.value,
                consistency_rating: consistency_rating.value,
                greatness_rating: greatness_rating.value,            
                suggested_rating_a: suggested_rating_a.value,
                suggested_rating_b: suggested_rating_b.value,
                suggested_rating_final: suggested_rating_final.value,
                user_final_rating: album.value.rating, 
                updated_date: new Date().toLocaleString('af', dateOptions).replace(',', '')                        
            }            
        }        
    },
    { deep: true }
    )

    function ratingTitle(){
        if (unratedAlbum.value){
            return "Don't forget to rate this album! You have a suggested rating based on your track ratings!"
        }
        if(album.value.rating){
            return album.value.rating ? album.value.rating + ' Stars' : 'Unrated'
        }
        return "Rate all the included tracks to get a suggested rating or give the album a rating yourself!"
    }

    const includeAllTracks = () => {
        for (let i = 0; i < album.value.total_discs; i++) {
            if (showDiscs.value[i]) {
                for (let j = 0; j < album.value.tracks[i].length; j++) {                 
                    album.value.tracks[i][j].included = !album.value.tracks[i][j].included                  
                }
            }
        }
    }

    const canAlbumBeRated = computed(() => {
        let rated = false
        for (const disc of album.value.tracks) {
            for (const track of disc) {
                if (track.included){                    
                    if (!track.track_rating ){                        
                        return false
                    }else{
                        rated = true
                    }
                }else{
                    rated = true
                }
            }
        }
        return rated       
    })
    
    const simple_average_rating = computed(() => {        
        if (!canAlbumBeRated.value || !album.value){ 
            return null
        }  
        let ratings = album.value.tracks.flat().filter(track => track.included && track.track_rating > 0).map(track => track.track_rating)        
        if (ratings.length == 0){
            return 0
        }        
        let sum = ratings.reduce((previous, current) => current += previous)
        let rating = sum / ratings.length
        return rating      
    })

    const weighted_average_rating = computed(() => {
        if (!canAlbumBeRated.value || !album.value){ 
            return null
        } 
        let ratings = album.value.tracks.flat().filter(track => track.included && track.track_rating > 0).map(track => track.goated ? 5.5 : track.track_rating)        
        if (ratings.length == 0){
            return 0
        }        
        let sum = ratings.reduce((previous, current) => current += previous)
        let rating = sum / ratings.length
        return Math.min( rating , 5)
    })

    const greatness_rating = computed(() => {
        if (!canAlbumBeRated.value || !album.value){ 
            return null
        } 
        let ratings = album.value.tracks.flat().filter(track => track.included && track.track_rating).map(track => track.track_rating >= 4.5 ? 1 : 0)        
        if (ratings.length == 0){
            return 0
        }        
        let sum = ratings.reduce((previous, current) => current += previous)
        let rating = sum / ratings.length        
        return rating * 5
    })

    const consistency_rating = computed(() => {
        if (!canAlbumBeRated.value || !album.value){ 
            return null
        } 
        let ratings = album.value.tracks.flat().filter(track => track.included && track.track_rating > 0).map(track => track.track_rating < 4 ? 1 : 0)        
        if (ratings.length == 0){
            return 0
        }        
        let sum = ratings.reduce((previous, current) => current += previous)        
        let rating = 5 - (sum * 0.125)
        return Math.max(rating,0)
    })

    const suggested_rating_a = computed(() => {
        return ((weighted_average_rating.value * 0.85) + (greatness_rating.value * 0.15))
    })


    const suggested_rating_b = computed(() => {
        return ((weighted_average_rating.value * 0.85) + (consistency_rating.value * 0.15))
    }
    )

    const suggested_rating_final = computed(() => {
        return (suggested_rating_a.value + suggested_rating_b.value)/2        
    })

    const songDuration = (ms) => {
        let minutes = Math.floor(ms / 60000)
        let seconds = ((ms % 60000) / 1000).toFixed(0)
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`
    }

    const totalDuration = () => {
        let total = 0;
        for (const disc of album.value.tracks) {
            for (const track of disc) {
                total += track.track_duration_ms                
            }
        }               
        if (total < 3600000) {
            let minutes = Math.floor(total / 60000);
            let seconds = ((total % 60000) / 1000).toFixed(0);
            return `${minutes} mins ${(seconds < 10 ? "0" : "")}${seconds} s`;
        }else{
            let hours = Math.floor(total / 3600000);
            let minutes = Math.floor((total - (hours * 3600000)) / 60000);
            return `${hours} hrs ${minutes} mins`;
        }
    }
    
    const updateRatingGoated1 = (disc,track) => {
        if (!album.value.tracks[disc][track].goated) {
            album.value.tracks[disc][track].track_rating = 5
        }      
    }

    const updateRatingGoated2 = (disc,track) => {
        if(album.value.tracks[disc][track].track_rating < 5) {
            album.value.tracks[disc][track].goated = false
        }
    }

    const savedAlbumRatings = () => {
        const data = {            
            ar: albumRatingsParams.value,
            tr: tracksRatingsParams.value
        }        
        axios.put(`${FLASK_API}api/v1/update-album-ratings/`, { data })
        .then(response => {
            let result = response.data.msg 
            if (result){
                albumSaved = JSON.stringify(album.value)
                hasAlbumChanged.value = false
                connectionError.value = false
            }else{
                hasAlbumChanged.value = true
                connectionError.value = true                
            }                       
        })
        .catch(error => {
            hasAlbumChanged.value = true
            connectionError.value = true
            console.error(error)
        });
    }

  

  

   //Load funtions
   function loadAlbum() {
        loading.value = true
        const id_album = route.params.id
        let url = `${FLASK_API}api/v1/get-album-data/${id_album}`
        axios.get(url)
            .then((response) => {
                album.value = response.data.album
                albumSaved = JSON.stringify(album.value)
                hasAlbumChanged.value = false
                showDiscs.value = Array(album.value.total_discs).fill(true)
                album.value ? goodResponse.value = true : goodResponse.value = false
            })
            .catch((error) => {
                console.error(error);
                goodResponse.value = false
            })
            .finally(() => {
                loading.value = false
            })
   }

   function refreshfromModal() {        
        showModal.value = false
        loadAlbum()
    }

    watch(paramId, () => {
        loadAlbum()
    })

    onBeforeMount(() => {
        loadAlbum()
    })


</script>

<style scoped>
.tracks-full-container{
    @apply  bg-transparent px-6 text-white my-4;
}
.tracks-header-row{
    @apply flex h-[65px] justify-between text-[13px] text-white border-b-[1px] border-gray-600 px-6;
    @apply bg-gradient-to-l  from-violet-950 via-emerald-950 to-amber-950;
    @apply sticky top-[0px] z-[11];       
}
 .player-album-button{
    @apply flex justify-center items-center bg-green-400 rounded-full h-14 w-14 hover:scale-105 active:bg-green-600;
 }

.tracks-row{
    @apply flex h-[50px] justify-between  hover:rounded-sm ;
    @apply hover:bg-gradient-to-t hover:from-zinc-700 hover:to-zinc-500;
}
.tracks-left-slot{
    @apply flex w-[600px] min-w-[600px]
}
.tracks-number{
    @apply w-[50px] min-w-[50px] flex justify-center items-center;
}
.tracks-title{
   @apply flex flex-col justify-center w-[540px];
}
.tracks-right-slot{
    @apply flex;
}
.tracks-right-slot > .column{
    @apply flex justify-center items-center w-[75px];
}
.tracks-by-discs-container{
    @apply flex flex-col;
}
.discs-row{
    @apply flex justify-between items-center w-full min-w-[600px] h-[45px];
}
.discs-row > .column{
    @apply flex justify-center items-center w-[75px];
}
.button-clear{
    @apply text-[13px] rounded-full text-black bg-[#1ED760] font-semibold w-[55px] h-[22px];
}
.tracks-rating{ 
    @apply flex justify-between items-center w-[195px];
}
.checkbox{
    @apply h-5 w-5 accent-green-400 cursor-pointer;
}
.rating-container{
    @apply flex items-center;
}
.rating-label{
    @apply text-white text-[13px]  w-[125px] font-semibold pt-1;
}
.styles-container{
    @apply text-white w-full text-[13px];
}
.styles-label{
    @apply font-semibold w-[50px];
}
.styles-value{
    @apply ml-2 hover:underline hover:cursor-pointer ;
}
.album-header-container{
    @apply flex w-full min-w-[600px] h-[365px] rounded-t-sm overflow-hidden pt-[35px];
}
.album-header{
    @apply w-full h-full flex flex-wrap rounded-t-sm py-5;    
}
.album-cover{
@apply mx-3 w-[225px] min-w-[225px] h-[225px];
}
.album-cover img{
    @apply object-cover h-[225px] w-[225px] shadow-md shadow-black;
}
.album-data{
    @apply w-[calc(100%-250px)] h-[225px] flex flex-col ;    
}
.album-type{
    @apply text-zinc-50 text-[13x] w-full font-semibold mb-1 hover:underline cursor-pointer;
}
.album-name{
    @apply text-white h-[70px] w-full font-semibold text-6xl mb-1 truncate pr-9 ;
}
.album-artist{
    @apply text-white text-[13px] w-full flex items-center min-w-[500px];
}
.circle {
    @apply mx-1 w-1 h-1 bg-white rounded-full;   
}
</style>