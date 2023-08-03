<template>
    <div  class="w-full h-full flex bg-gradient-to-r from-slate-800 to-black justify-start">
        <div class="track-info-container flex items-center w-1/3 h-full">
            <div class="cover-container  w-20 items-center justify-center flex">
                <img class="object-contain w-14 h-14 rounded-md" 
                src="https://i.scdn.co/image/ab67616d00001e0210930c40ba09b44819fd9ccb" alt="cover">
            </div>
            <div class="flex flex-col">
                <div class="text-white text-sm"> Radiohead</div>
                <div class="text-gray-400 text-xs">Paranoid Android</div>
            </div>
        </div>

        <div class="controls-container flex flex-col w-1/3 h-full">
            <div class="flex items-center w-full justify-center h-2/3 ">
                <Prev :size="30"  class="text-gray-200 hover:text-white transition-all duration-300 ease-in-out"/>
                <button class="w-[36px] h-[36px] mx-2 bg-gray-200 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out">
                    <Play :size="30" class="text-black"/>
                </button>                
                <Next :size="30"  class="text-gray-200 hover:text-white transition-all duration-300 ease-in-out"/>
            </div>

            <div class="flex w-full h-1/5  px-2 items-center">
                <p class="text-gray-400 text-xs mr-2" id="currentTime">00:00</p>
                <input
                    type="range"
                    value="0"
                    ref="progressBar"
                    id="progressBar" min="0" max="100"                    
                />
                <p class="text-gray-400 text-xs ml-2" id="finalTime">00:00</p>
            </div>

        </div>

        <div class="volume-container flex items-center w-1/3 h-full bg-red-800">

        </div>
        
        


    </div>
</template>

<script setup>
    import Play from 'vue-material-design-icons/Play.vue'
    import Next from 'vue-material-design-icons/SkipNext.vue'
    import Prev from 'vue-material-design-icons/SkipPrevious.vue'

</script>

<style lang="scss" scoped>
#progressBar {
  -webkit-appearance: none;
  appearance: none;
  width: 98%;
  height: 4px;
  background: grey;
  cursor: pointer;
}

#progressBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgb(0, 205, 0);
}

</style>