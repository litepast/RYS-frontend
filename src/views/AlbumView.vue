<template>
        <div class="album-header">
            <div class="album-cover">
                <img :src="album.cover_image">
            </div>        
            <div class="album-data">
                <div class="album-type">
                    {{ album.release_type}}
                </div>
                <div class="album-name">
                    {{ album.album_name}}
                </div>
                <div class="album-artist">
                    <div class="font-semibold"> {{album.artist_name}} </div>
                    <div class="circle"></div>
                    <div> {{ album.release_date.substring(0,4) }}</div>
                    <div class="circle"></div>                    
                    <div> {{ album.total_tracks }} {{ album.total_tracks > 1 ? " songs" :"somg" }}</div>
                    <div class="circle"></div>                    
                    <div class="text-gray-400"> {{ totalDuration()}} </div>
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
                </div>
                <div class="rating-container">
                    <div class="rating-label" title="Suggested rating based on your track ratings"> Suggest Rating: </div>
                    <StarRating :title=" suggested_rating ? suggested_rating + ' Stars' : 'Unrated'" :rating="Number(suggested_rating)" :star-size="22" :increment="0.5"  :show-rating="false"
                    inactive-color="#332A2B" active-color="#1ED760" :border-width="1" :read-only="true"/>
                </div> 
            </div>
        </div>


        <!-- <div class="text-white flex w-[600px] min-w-[600px] m-3">
           "rating: " {{ album.rating}}" avg: " {{ average_rating }} " greatness: " {{greatness_rating}} " consitency: " {{ consistency_rating }} " s1: " {{ suggested_rating1 }}" s2: " {{ suggested_rating2 }}
           " final: " {{ suggested_rating }}
        </div>
       -->

        <div class="tracks-container bg-[#121212] mx-6 text-white my-4">
            <ul>
                <li class="flex h-[25px] justify-between text-[13px] text-gray-400 pb-2 mb-4 border-b-[1px] border-[#2C2C2C]">                    
                    <div class="left-column flex w-[600px] min-w-[600px]">
                        <div class="w-[50px] min-w-[50px] flex justify-center items-center">
                            #
                        </div>
                        <div class="flex flex-col justify-center w-[540px]">
                            Title 
                        </div>
                    </div>
                    <div class="right-column flex" >
                        <div class="flex justify-center items-center w-[135px]" title="Your Track Rating">
                            Rating
                        </div>                   
                        <div class="flex justify-center items-center w-[75px]" title="is this track goated? &#10;The track is so good, it is beyond 5 stars&#10;It will bost the album's suggested rating">
                            🐐 ?
                        </div>
                        <div class="flex justify-center items-center w-[75px]" title="Include this track on your suggested rating calculation">
                            Included
                        </div>
                        <div class="flex justify-center items-center w-[75px]" title="Duration">
                            <ClockTimeFourOutline :size="22" fillColor="#9CA3AF"/>
                        </div>
                    </div>
                </li>
                <div class="discs flex flex-col" v-for="i in album.total_discs">                    
                    <li class="h-[50px] flex justify-start" v-if="album.total_discs > 1">                        
                         <div class="flex w-auto min-w-[600px]">
                            <div class="w-[50px] min-w-[50px] flex justify-center items-center">
                                <Disc :size="22" fillColor="#9CA3AF"/>
                            </div>
                            <div class="flex justify-center items-center  text-gray-400">
                                Disc {{ i }}                                                 
                            </div>
                        </div>
                    </li>

                    <li class="flex h-[50px]  hover:bg-[#2C2C2C] hover:rounded-sm justify-between" v-for="(track, index) in album.tracks[i-1]" :key="track.track_id">                    
                        <div class="left-column flex w-[600px] min-w-[600px]">
                            <div class="w-[50px] min-w-[50px] flex justify-center items-center">
                                {{ track.track_number_on_disc }}
                            </div>
                            <div class="flex flex-col justify-center w-[540px]" :title="track.track_name">
                                <div class="text-[16px] truncate">
                                    {{ track.track_name }}  
                                </div>
                                <div class="text-[13px] truncate" :title="track.track_artist">
                                    {{ track.track_artist }}
                                </div>                      
                            </div>
                        </div>
                        <div class="right-column flex">
                            <div class="flex justify-center w-[135px]">
                                <StarRating 
                                v-model:rating="album.tracks[i-1][index].track_rating" :star-size="22" :increment="0.5"  :show-rating="false" inactive-color="#332A2B"
                                active-color="#1ED760" :border-width="1" />
                            </div>                   
                            <div class="flex justify-center items-center w-[75px]">
                                <input  type="checkbox"  class="checkbox" v-model="track.goated" @click="updateRatingGoated(i-1,index)">

                            </div>
                            <div class="flex justify-center items-center w-[75px]">
                                <input type="checkbox" class="checkbox" v-model="track.included">
                            </div>
                            <div class="flex justify-center items-center text-[13px] w-[75px]">
                                {{ songDuration(track.track_duration_ms) }}
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
        

</template>


<script setup>

//
    import ClockTimeFourOutline from 'vue-material-design-icons/ClockTimeFourOutline.vue'
    import Disc from 'vue-material-design-icons/Disc.vue'
    import StarRating from 'vue-star-rating'
    import { ref, computed } from 'vue'

    const albumData={
        release_type: 'Album',
        album_name: 'In Rainbows',
        artist_name: 'Radiohead',
        album_id: '5vkqYmiPBYLaalcmjujWxK',
        genres: ['Electronic','Rock'],
        styles: ['Alternative Rock','Art Rock','Experimental','Indie Rock' ],
        rating: 5,
        total_discs: 1,
        total_tracks: 10,
        release_date: '2007-10-10',
        cover_image: 'https://i.scdn.co/image/ab67616d00001e02de3c04b5fc750b68899b20a9',
        tracks: [
                [
                    {
                        track_id: '4oXg7xT4ksBxHTx8PcmSXw',
                        track_disc_number: 1,
                        track_number_on_disc: 1,
                        track_name: '15 Step',
                        track_artist: 'Radiohead',
                        track_rating: 4.5,
                        goated: false,
                        included: true,
                        track_duration_ms: 237293 
                    },
                    {
                        track_id: '7ouMYWpwJ422jRcDASZB7P',
                        track_disc_number: 1,
                        track_number_on_disc: 2,
                        track_name: 'Bodysnatchers',
                        track_artist: 'Radiohead',
                        track_rating: 4.0,
                        goated: false,
                        included: true,
                        track_duration_ms: 242293                
                    },
                    {
                        track_id: '2QcZxj3mI4aVBEmk4e0R4g',
                        track_disc_number: 1,
                        track_number_on_disc: 3,
                        track_name: 'Nude',
                        track_artist: 'Radiohead',
                        track_rating: 5.0,
                        goated: true,
                        included: true,
                        track_duration_ms: 255386
                    },
                    {
                        track_id: '6V9YnBmFjWmXCBaUVRCVXP',
                        track_disc_number: 1,
                        track_number_on_disc: 4,
                        track_name: 'Weird Fishes/Arpeggi',
                        track_artist: 'Radiohead',
                        track_rating: 5.0,
                        goated: true,
                        included: true,
                        track_duration_ms: 318186
                    },
                    {
                        track_id: '3sv3TtGRqgJGn7XsYkscx2',
                        track_disc_number: 1,
                        track_number_on_disc: 5,
                        track_name: 'All I Need',
                        track_artist: 'Radiohead',
                        track_rating: 4.5,
                        goated: false,
                        included: true,
                        track_duration_ms: 228746
                    },
                    {
                        track_id: '7hDVYcQqEwGj5gk0dIdgI7',
                        track_disc_number: 1,
                        track_number_on_disc: 6,
                        track_name: 'Faust Arp',
                        track_artist: 'Radiohead',
                        track_rating: 4.5,
                        goated: false,
                        included: true,
                        track_duration_ms: 129679
                    },
                    {
                        track_id: '2nTsKOXIVGDf2iPeVQO2Gm',
                        track_disc_number: 1,
                        track_number_on_disc: 7,
                        track_name: 'Reckoner',
                        track_artist: 'Radiohead',
                        track_rating: 5.0,
                        goated: false,
                        included: true,
                        track_duration_ms: 290213
                    },
                    {
                        track_id: '2PzU4IB8Dr6mxV3lHuaG34',
                        track_disc_number: 1,
                        track_number_on_disc: 8,
                        track_name: 'House of Cards',
                        track_artist: 'Radiohead',
                        track_rating: 4.0,
                        goated: false,
                        included: true,
                        track_duration_ms: 328293
                    },
                    {
                        track_id: '2PzU4IB8Dr6mxV3lHuaG34',
                        track_disc_number: 1,
                        track_number_on_disc: 9,
                        track_name: 'Jigsaw Falling Into Place',
                        track_artist: 'Radiohead',
                        track_rating: 5.0,
                        goated: false,
                        included: true,
                        track_duration_ms: 248893
                    },
                    {
                        track_id: '2PzU4IB8Dr6mxV3lHuaG34',
                        track_disc_number: 1,
                        track_number_on_disc: 10,
                        track_name: 'Videotape',
                        track_artist: 'Radiohead',
                        track_rating: 5.0,
                        goated: false,
                        included: true,
                        track_duration_ms: 279634
                    }
                ],
               
        ]
    }

    const album = ref(albumData)
    const genres = computed(() => album.value.genres.join(', '))
    const styles = computed(() => album.value.styles.join(', '))
    

    const updateRatingGoated = (disc,track) => {
        if (!album.value.tracks[disc][track].goated) {
            album.value.tracks[disc][track].track_rating = 5
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
                if (track.included) {
                    total += track.track_duration_ms
                }
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

</script>

<style scoped>

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
    @apply text-white text-[13px];
}

.styles-label{
    @apply font-semibold w-[50px];

}

.styles-value{
    @apply ml-2;
}

.album-header{
    @apply w-full flex bg-gradient-to-b from-[#c36666] to-[#0a0a0a] rounded-t-sm py-5 overflow-hidden;
    @apply max-h-[265px] ;
 
}

.album-cover{
@apply mx-3 min-w-[225px] h-[225px] ;
}

.album-cover img{
    @apply object-contain h-[225px] w-[225px] ;
}

.album-data{
    @apply w-[calc(100%-275px)] flex flex-col min-w-[500px];
}

.album-type{
    @apply text-white text-[13x] font-semibold mb-1;
}
.album-name{
    @apply text-white h-[60px] font-semibold text-6xl mb-1 truncate pr-9 ;
}
.album-artist{
    @apply text-white text-[13px] flex items-center;
}

.circle {
    @apply mx-1 w-1 h-1 bg-white rounded-full;   
}
</style>








