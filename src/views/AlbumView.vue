<template>
    <div v-if="album">
        <div class="album-header-container" :style="bgColor">
            <div class="album-header" :style="bgGradient">
                <div class="album-cover">
                    <img :src="album.cover_image">
                </div>        
                <div class="album-data">
                    <div class="album-type">
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
                        <div> {{ album.total_tracks }} {{ album.total_tracks > 1 ? " songs" :"song" }}</div>
                        <div class="circle"></div>                    
                        <div class="text-gray-200"> {{ totalDuration()}} </div>
                    </div> 
                    <div class="styles-container">
                        <div class="flex">
                            <div class="styles-label"> Genres: </div>
                            <div class="styles-value"> {{ genres }} </div>
                        </div>
                        <div class="flex">
                            <div class="styles-label"> Styles: </div>
                            <div class="styles-value"> {{ styles }} </div>
                        </div>
                    </div>
                    <div class="rating-container">
                        <div class ="rating-label" :title=" album.rating ? album.rating + ' Stars' : 'Unrated'" > Your Rating: </div>
                        <StarRating 
                        v-model:rating="album.rating" :star-size="22" :increment="0.5"  :show-rating="false" inactive-color="#332A2B"
                        active-color="#1ED760" :border-width="1"/>
                        <button class="button-clear ml-2 mt-1" @click="album.rating = 0">Clear</button>
                    </div>
                    <div class="rating-container">
                        <div class="rating-label" title="Suggested rating based on your track ratings&#10;Rate all the included tracks to get one!">
                        Suggest Rating: </div>
                        <StarRating :title=" suggested_rating_final ? Math.ceil(suggested_rating_final*2)/2 + ' Stars' : 'Unrated'" :rating="suggested_rating_final" :star-size="22" :increment="0.5"  :show-rating="false"
                        inactive-color="#332A2B" active-color="#1ED760" :border-width="1" :read-only="true"/>
                    </div> 
                </div>

                <div class="actions-container h-[55px] w-full flex flex-row items-center justify-between mx-3 mt-1">
                    <button class=" w-[155px] shadow-md flex items-center cursor-pointer bg-[#1ED760] rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
                    @click="savedAlbumRatings" :disabled="!hasAlbumChanged" :title=" hasAlbumChanged ? 'Save Ratings' : 'Ratings Syncronized'  ">
                        <Unsaved :size="40" fillColor="#00000"/>
                        Save Ratings
                    </button>

                    <div v-if="!connectionError">
                        <div class="text-white flex items-center mr-5">                        
                            <Check v-if="!hasAlbumChanged" :size="20" fillColor="#1ED760"  />
                            <Alert v-else :size="20" fillColor="#FAFAA0" />
                            <div class="mx-1"></div>
                            {{ hasAlbumChanged ? "Save Ratings" : "Ratings Syncronized" }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-white flex items-center mr-5">                        
                            <Error :size="20" fillColor="#FAA0A0"  />                            
                            <div class="mx-1"></div>
                            Error Syncing Ratings, Try again
                        </div>                        
                    </div>
                </div>

            </div>    
        </div>  

        <div class="tracks-full-container">
            <ul>
                <li class="tracks-header-row">
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
                        <div class="column" title="Include this track on your suggested rating calculation">
                            Included
                        </div>                        
                        <div class="column" title="Duration">
                            <ClockTimeFourOutline :size="22" fillColor="#9CA3AF"/>
                        </div>
                    </div>
                </li>
                <div class="tracks-by-discs-container" v-for="i in album.total_discs">
                    <li class="discs-row" v-if="album.total_discs > 1">
                        <div class="tracks-number">
                            <Disc :size="22" fillColor="#9CA3AF"/>
                        </div>
                        <div class="tracks-title  text-gray-400">
                            Disc {{ i }}                                                 
                        </div>
                    </li>
                    <li class="tracks-row" v-for="(track, index) in album.tracks[i-1]" :key="track.track_id">
                        <div class="tracks-left-slot">
                            <div class="tracks-number">
                                {{ track.track_number_on_disc }}
                            </div>
                            <div class="tracks-title" :title="track.track_name">
                                <div class="text-[16px] truncate"> {{ track.track_name }} </div>
                                <div class="text-[13px] truncate" :title="track.track_artist">{{ track.track_artist }}</div>                      
                            </div>
                        </div>
                        <div class="tracks-right-slot">
                            <div class="tracks-rating pr-1">
                                <button class="button-clear ml-1" @click="album.tracks[i-1][index].track_rating = 0 ; album.tracks[i-1][index].goated = false">Clear</button>
                                <div class="mb-[6px]">
                                    <StarRating @click="updateRatingGoated2(i-1,index)" v-model:rating="album.tracks[i-1][index].track_rating" 
                                    :star-size="22" :increment="0.5"  :show-rating="false" inactive-color="#332A2B" active-color="#1ED760" :border-width="1" />
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
    </div>
    <div v-else class="text-white">
        <div v-if="!loading">
            <NotFound/>
        </div>        
    </div>       
</template>

<script setup>
    import ClockTimeFourOutline from 'vue-material-design-icons/ClockTimeFourOutline.vue'
    import Unsaved from 'vue-material-design-icons/ContentSaveOutline.vue'  
    import Disc from 'vue-material-design-icons/Disc.vue'
    import Check from 'vue-material-design-icons/CheckBold.vue'
    import Alert from 'vue-material-design-icons/AlertCircle.vue'
    import Error from 'vue-material-design-icons/CloseCircle.vue'
    import StarRating from 'vue-star-rating'
    import { ref, computed, onBeforeMount, watch } from 'vue'
    import axios from 'axios'
    import {useRoute} from "vue-router"
    import NotFound from '../components/NotFound.vue'

    
    const connectionError = ref(false)    
    const loading = ref(true)    
    const album = ref(false) 
    const hasAlbumChanged = ref(false)
    const genres = computed(() => album.value.genres.join(', '))
    const styles = computed(() => album.value.styles.join(', '))
    const bgColor = computed(() =>  `background-color: ${album.value.cover_color}` )
    const bgGradient = 'background : linear-gradient(to bottom, transparent, rgba(0,0,0,0.75) )'
    const route = useRoute()
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

    const canAlbumBeRated = computed(() => {
        let rated = true
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
            return 0
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
            return 0
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
            return 0
        } 
        let ratings = album.value.tracks.flat().filter(track => track.included && track.track_rating > 0).map(track => track.track_rating >= 4.5 ? 1 : 0)        
        if (ratings.length == 0){
            return 0
        }        
        let sum = ratings.reduce((previous, current) => current += previous)
        let rating = sum / ratings.length
        return rating * 5
    })

    const consistency_rating = computed(() => {
        if (!canAlbumBeRated.value || !album.value){ 
            return 0
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
        axios.put('http://192.168.100.14:5000/api/v1/update-album-ratings/', { data })
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
        });
    }

    onBeforeMount(async () => {
        loading.value = true
        const id_album = route.params.id
        let url = `http://192.168.100.14:5000/api/v1/get-album-data/${id_album}`
        axios.get(url)
            .then((response) => {
                album.value = response.data.album
                albumSaved = JSON.stringify(album.value)
                hasAlbumChanged.value = false
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                loading.value = false
            })
    })

</script>

<style scoped>
.tracks-full-container{
    @apply  bg-[#121212] mx-6 text-white my-4;
}
.tracks-header-row{
    @apply flex h-[25px] justify-between text-[13px] text-gray-400 pb-2 mb-4 border-b-[1px] border-[#2C2C2C];
}
.tracks-row{
    @apply flex h-[50px] justify-between hover:bg-[#2C2C2C] hover:rounded-sm ;
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
    @apply flex justify-start w-auto min-w-[600px] h-[50px];
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
    @apply text-white text-[13px]  w-[115px] font-semibold pt-1;
}
.styles-container{
    @apply text-white w-full text-[13px];
}
.styles-label{
    @apply font-semibold w-[50px];
}
.styles-value{
    @apply ml-2;
}
.album-header-container{
    @apply flex w-full min-w-[600px] h-[345px] rounded-t-sm overflow-hidden pt-[35px];
}
.album-header{
    @apply w-full h-full flex flex-wrap rounded-t-sm py-5;    
}
.album-cover{
@apply mx-3 w-[225px] min-w-[225px] h-[225px];
}
.album-cover img{
    @apply object-contain h-[225px] w-[225px] shadow-md shadow-black;
}
.album-data{
    @apply w-[calc(100%-250px)] h-[225px] flex flex-col ;
    /* @apply w-full min-w-[500px] flex flex-col ; */
}
.album-type{
    @apply text-zinc-50 text-[13x] w-full font-semibold mb-1;
}
.album-name{
    @apply text-white h-[70px] w-full font-semibold text-6xl mb-1 truncate pr-9 ;
}
.album-artist{
    @apply text-white text-[13px] w-full flex items-center;
}
.circle {
    @apply mx-1 w-1 h-1 bg-white rounded-full;   
}
</style>











