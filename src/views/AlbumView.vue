<template>
    <div class="p-8 overflow-x-hidden">      
        <div class="flex items-center w-full relative h-full">
            <img width="250" :src="album.cover_image">

            <div class="w-full ml-5">

                <div                  
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-semibold text-7xl"
                >
                    {{ album.album_name}}
                </div>


                <div class="text-gray-300 text-[13px] flex">
                    <div class="flex font-semibold">{{album.artist_name}}</div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ album.release_date.substring(0,4) }}</span>
                    </div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ album.total_tracks }} songs </span>
                    </div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ totalDuration()}} </span>
                    </div>
                     
                </div>

                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <button class="p-1 rounded-full bg-white" @click="playFunc()">
                        <Play v-if="!isPlaying" fillColor="#181818" :size="25"/>
                        <Pause v-else fillColor="#181818" :size="25"/>
                    </button>
                    <button type="button">
                        <Heart fillColor="#1BD760" :size="30"/>
                    </button>
                    <button type="button">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

     
     
    </div>
</template>

<script setup>
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
                track_rating: null,
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
                track_rating: null,
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
                track_rating: null,
                goated: false,
                included: true,
                track_duration_ms: 255386
            },
            {
                track_id: '6V9YnBmFjWmXCBaUVRCVXP',
                track_disc_number: 1,
                track_number_on_disc: 4,
                track_name: 'Weird Fishes/Arpeggi',
                track_artist: 'Radiohead',
                track_rating: null,
                goated: false,
                included: true,
                track_duration_ms: 318186
            },
            {
                track_id: '3sv3TtGRqgJGn7XsYkscx2',
                track_disc_number: 1,
                track_number_on_disc: 5,
                track_name: 'All I Need',
                track_artist: 'Radiohead',
                track_rating: null,
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
                track_rating: null,
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
                track_rating: null,
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
                track_rating: null,
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
                track_rating: null,
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
                track_rating: null,
                goated: false,
                included: true,
                track_duration_ms: 279634
            }
        ]
    }

   
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
  .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>