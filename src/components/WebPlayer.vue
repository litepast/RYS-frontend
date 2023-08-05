<template>
    <div  v-if="PlayerStore.queue.length>0" class="player-container">
        <div class="info-container">
            <div class="cover-container ">
                <img  
                :src="currentTrack.cover" alt="cover" @click="goToAlbumView()">
            </div>
            <div class="flex flex-col">
                <div class="text-white text-sm"> {{ currentTrack.name }}</div>
                <div class="text-gray-400 text-xs">{{currentTrack.artist }}</div>
            </div>            
        </div>
        <div class="controls-container">
            <div class="buttons-container">
                <div class="prevNext-button" @click="playNext" title="Previous Track">
                    <Prev  :size="30"  class="prevNext" @click="playPrev"/>
                </div>                
                <div v-if="!songPlaying" class="play-button" title="Play" @click="playPause">
                    <Play :size="30" class="text-black"/>
                </div>
                <div v-else class="play-button" title="Pause" @click="playPause">
                    <Pause :size="30" class="text-black"/>
                </div>
                <div class="prevNext-button" @click="playNext" title="Next Track" >
                    <Next :size="30"  class="prevNext"/>
                </div>                
                
            </div>
            <div class="progress-container">
                <p class="text-gray-400 text-xs mr-2" id="currentTime">00:00</p>
                <input
                    type="range"
                    value="0"
                    ref="progressBar"
                    id="progressBar" min="0" max="100" 
                    @change="seekSong()" @mousedown="forceUpdate(false)" @mouseup="forceUpdate(true)"                   
                />
                <p class="text-gray-400 text-xs ml-2" id="finalTime">00:00</p>
            </div>
        </div>
        <div class="volume-container">
            <VolumeOff title="Unmute" v-show="volume==0" :size="30" class="prevNext"/>
            <VolumenMedium title="Mute" v-show="volume > 0 && volume < 50" :size="30" class="prevNext"/>
            <VolumeUp :size="30" title="Mute" v-show="volume >= 50" class="prevNext"/>
            <input
                v-model="volume"
                type="range"                
                ref="volumeBar"
                id="volumeBar" min="0" max="100"                    
            />
            <div class="w-6"></div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import Play from 'vue-material-design-icons/Play.vue'
    import Pause from 'vue-material-design-icons/Pause.vue'
    import Next from 'vue-material-design-icons/SkipNext.vue'
    import Prev from 'vue-material-design-icons/SkipPrevious.vue'
    import VolumeOff from 'vue-material-design-icons/VolumeOff.vue'
    import VolumenMedium from 'vue-material-design-icons/VolumeMedium.vue'
    import VolumeUp from 'vue-material-design-icons/VolumeHigh.vue'
    import { playerPlay , playerPause, seekPlayerSong, forceTimeUpdation, jumptoprevious, jumptonext} from '../spotify/player.js'
    import { usePlayerStore } from '../stores/player-store.js'
    const PlayerStore = usePlayerStore() 
    const volume = ref(0)
    const songPlaying = computed(() => PlayerStore.songPlaying)
    const currentTrack = computed(() => PlayerStore.currentTrack)
    import { useRouter } from 'vue-router'
    const router = useRouter()

    function goToAlbumView() {         
        router.push(`/library/${currentTrack.value.album_id}`)
    }

    function playPause() {
      if (songPlaying.value == true) {
        playerPause();       
      } else {
        playerPlay();        
        
      }
    }

    function playPrev() {
        jumptoprevious()
    }

    function playNext() {
        jumptonext()
    }
    
    function seekSong(){
      seekPlayerSong(document.getElementById('progressBar').value);
    }

    function forceUpdate(value){
      forceTimeUpdation(value);
    }

</script>

<style lang="scss" scoped>
.player-container{
    @apply w-full h-full flex bg-gradient-to-r from-slate-800 to-black justify-start
}

.info-container{
    @apply  flex items-center w-1/3 h-full;
}
.cover-container{
    @apply  w-20 items-center justify-center flex;
}

img{
    @apply object-contain w-14 h-14 rounded-md cursor-pointer;
}

.controls-container{
    @apply  flex flex-col w-1/3 h-full;
}

.buttons-container{
    @apply  flex items-center w-full justify-center h-2/3; 
} 
.prevNext-button{
    @apply bg-transparent;
}
.prevNext{
    @apply text-gray-200 hover:text-white transition-all duration-300 ease-in-out;
}
.play-button{
    @apply cursor-default w-[36px] h-[36px] mx-2 bg-gray-200 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out;
    @apply active:scale-75;
}

.progress-container{
    @apply flex w-full h-1/5  px-2 items-center;
}

.volume-container{
    @apply flex justify-end items-center w-1/3 h-full;
}


#progressBar {
    -webkit-appearance: none;
    appearance: none;
    @apply w-full h-1 bg-gray-400 rounded-xl cursor-pointer;
    
}

#progressBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    @apply appearance-none w-3 h-3  accent-orange-400 bg-green-400 rounded-xl;
}

#volumeBar {
    -webkit-appearance: none;
    appearance: none;
    @apply appearance-none w-1/4 h-1 bg-gray-400 rounded-xl cursor-pointer;
}

#volumeBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    @apply appearance-none w-3 h-3 bg-green-400 rounded-xl;
}


</style>