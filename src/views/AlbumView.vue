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
                        <button class="button-clear ml-2 mt-1" @click="album.rating = NaN">Clear</button>
                    </div>
                    <div class="rating-container">
                        <div class="rating-label" title="Suggested rating based on your track ratings&#10;Rate all the included tracks to get one!">
                        Suggest Rating: </div>
                        <StarRating :title=" suggested_rating ? Math.ceil(suggested_rating*2)/2 + ' Stars' : 'Unrated'" :rating="suggested_rating" :star-size="22" :increment="0.5"  :show-rating="false"
                        inactive-color="#332A2B" active-color="#1ED760" :border-width="1" :read-only="true"/>
                    </div> 
                </div>
                <div class="actions-container flex w-auto mx-3 mt-4">
                    <Unsaved v-if="saved" :size="50" fillColor="#1ED760" title="Save track ratings" class="cursor-pointer" @click="saved=!saved"/>
                    <Saved v-else :size="50" fillColor="#1ED760" title="Track ratings saved" class="cursor-pointer"  @click="saved=!saved"/>
                    <button class="text-[#1ED760] ml-8"> Save test</button>
                </div>
            </div>    
        </div>
        <div class="text-white">
            div test
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
                                <button class="button-clear ml-1" @click="album.tracks[i-1][index].track_rating = NaN">Clear</button>
                                <div class="mb-[6px]">
                                    <StarRating @click="updateRatingGoated2(i-1,index)" v-model:rating="album.tracks[i-1][index].track_rating" 
                                    :star-size="22" :increment="0.5"  :show-rating="false" inactive-color="#332A2B" active-color="#1ED760" :border-width="1" />
                                </div>                                
                            </div> 
                            <div class="column">
                                <input  name="goated" type="checkbox"  class="checkbox" v-model="track.goated" @click="updateRatingGoated(i-1,index)">
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
    @apply flex w-full max-h-[335px] rounded-t-sm overflow-hidden;
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


<script setup>
    import ClockTimeFourOutline from 'vue-material-design-icons/ClockTimeFourOutline.vue'
    import Unsaved from 'vue-material-design-icons/ContentSaveOutline.vue'
    import Saved from 'vue-material-design-icons/ContentSaveCheck.vue'
    import Disc from 'vue-material-design-icons/Disc.vue'
    import StarRating from 'vue-star-rating'
    import { ref, computed, onMounted, onBeforeMount } from 'vue'
    import axios from 'axios'
    import {useRoute} from "vue-router"
    import NotFound from '../components/NotFound.vue'

    const saved = ref(false)
    const loading = ref(true)
    const route = useRoute()
    const album = ref(false)
    const genres = computed(() => album.value.genres.join(', '))
    const styles = computed(() => album.value.styles.join(', '))
    const bgColor = computed(() =>  `background-color: ${album.value.cover_color}` )
    const bgGradient = 'background : linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) )'

    const updateRatingGoated = (disc,track) => {
        if (!album.value.tracks[disc][track].goated) {
            album.value.tracks[disc][track].track_rating = 5
        }
      
    }

    const updateRatingGoated2 = (disc,track) => {
        if(album.value.tracks[disc][track].track_rating < 5) {
            album.value.tracks[disc][track].goated = false
        }
    }

    const average_rating = computed(() => {
        let sum = 0
        let count = 0
        for ( const disc of album.value.tracks) {
            for (const track of disc) {
                if (track.included) {               
                    sum += track.goated ? 5.5 : track.track_rating
                    count++
                }
            }
        }
        let avg = sum / count
        return Math.min(5.0, avg)
    })

    const greatness_rating = computed(() => {
        let great = 0
        let count = 0
        for (const disc of album.value.tracks) {
            for (const track of disc) {
                if (track.included) {
                    count++
                    if (track.track_rating >= 4.5) {
                        great++
                    }
                }
            }
        }       
        return ((great / count) * 5)
    })

    const consistency_rating = computed(() => {
        let consistency = 5
        for (const disc of album.value.tracks) {
            for (const track of disc) {
                if (track.included) {
                    if (track.track_rating < 4.0) {
                        consistency -= 0.125
                    }
                }
            }
        }    
        return Math.max(0, consistency)
    })

    const suggested_rating1 = computed(() => {
        return ((average_rating.value * 0.85) + (greatness_rating.value * 0.15))
    })


    const suggested_rating2 = computed(() => {
        return ((average_rating.value * 0.85) + (consistency_rating.value * 0.15))
    }
    )


    const suggested_rating = computed(() => {
        return (suggested_rating1.value + suggested_rating2.value)/2        
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

    onBeforeMount(async () => {
        loading.value = true
        const id_album = route.params.id
        var url = 'http://192.168.100.14:5000/api/v1/get-album-data/' + id_album
        axios.get(url)
            .then((response) => {
                album.value = response.data.album                     
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                loading.value = false
            })
    })

</script>











