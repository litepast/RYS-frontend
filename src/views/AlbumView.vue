<template>
        <div class="album-header">
            <div class="album-cover">
                <img width="225" :src="album.cover_image">
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
                <div class="text-white text-[13px]">
                    <div class="genres flex">
                        <div class="font-semibold w-[50px]"> Genres: </div>
                        <div class="ml-2 genres-list">
                            {{ genres }}
                        </div>
                    </div>

                    <div class="styles flex">
                        <div class="font-semibold w-[50px]"> Styles: </div>
                        <div class="ml-2 styles-list">
                            {{ styles }}
                        </div>
                    </div>
                </div>
                <div class="user-rating mt-1">
                    <div class="div w-[115px] font-semibold pt-1"> Your Rating: </div>

                    <StarRating :title=" rating ? rating + ' Stars' : 'Unrated'" 
                    :rating="rating" :star-size="22" :increment="0.5"  :show-rating="false"
                    inactive-color="#332A2B" active-color="#1ED760" :border-width="1"/>

                </div>
                <div class="suggested-rating flex text-white text-[13px] mt-1">
                    <div class="div w-[115px] font-semibold pt-1" title="Suggested rating based on your track ratings"> Suggest Rating: </div>

                    <StarRating :title=" rating ? rating + ' Stars' : 'Unrated'" 
                    :rating="average_rating" :star-size="22" :increment="0.5"  :show-rating="false"
                    inactive-color="#332A2B" active-color="#1ED760" :border-width="1" :read-only="true"/>
                </div>              

            </div>
        </div>
</template>





<script setup>
    import StarRating from 'vue-star-rating'
    import { ref, computed } from 'vue'

    const album={
        release_type: 'Album',
        album_name: 'In Rainbows',
        artist_name: 'Radiohead',
        album_id: '5vkqYmiPBYLaalcmjujWxK',
        genres: ['Electronic','Rock'],
        styles: ['Alternative Rock','Art Rock','Experimental','Indie Rock' ],
        total_discs: 1,
        total_tracks: 10,
        release_date: '2007-10-10',
        cover_image: 'https://i.scdn.co/image/ab67616d00001e02de3c04b5fc750b68899b20a9',
        tracks: [
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
                track_rating: 4.5,
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
        ]
    }

    const average_rating = computed(() => {
        let sum = 0
        let count = 0
        for (const track of album.tracks) {
            if (track.included) {
                sum += track.goated ? 5.5 : track.track_rating
                count++
            }
        }
        return Math.min(5.0, sum / count)
    })

    // a computed ref where the album genres are joined by commas
    const genres = computed(() => album.genres.join(', '))

    // the same as above but for the styles
    const styles = computed(() => album.styles.join(', '))
   
    const totalDuration = () => {
        let total = 0;
        album.tracks.forEach(track => {
            total += track.track_duration_ms;
        });
        let minutes = Math.floor(total / 60000);
        let seconds = ((total % 60000) / 1000).toFixed(0);
        return `${minutes} mins ${(seconds < 10 ? "0" : "")}${seconds} s`;
    }

    


</script>


<style scoped>

.album-header{
    @apply w-full flex bg-gradient-to-b from-[#c36666] to-[#0a0a0a] rounded-t-sm py-5 overflow-hidden;
    min-width: 500px

}

.album-cover{
@apply mx-3;
min-width: 225px
}

.album-data{
    @apply w-[calc(100%-275px)] flex flex-col ;
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



.user-rating{
    @apply text-white text-[13px] flex items-center align-middle h-[22px];
}

.circle {
    @apply mx-1 w-1 h-1 bg-white rounded-full;   
}
</style>

