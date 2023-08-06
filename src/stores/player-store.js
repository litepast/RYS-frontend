import { computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('PlayerStore', () => {
  const repeat = ref(0)
  const shuffle = ref(false)
  const deviceId = ref(null)
  const songPlaying = ref(false)
  const currentIndex = ref(0)
  const originalQueue = ref([])  
  const queue = ref([])
  const currentTrack = computed(() => queue.value[currentIndex.value])
  const shuffledQueue = ref([])
  const totalTracks = computed(() => queue.value.length)
 
  function shuffleQueue(){
    const shuffled = [...queue.value]
    for(let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temp
    }
    //exchange the order of the currenttrack with the first item in the shuffled array
    const current = shuffled[0]
    const index = shuffled.indexOf(currentTrack.value)
    shuffled[0] = currentTrack.value
    shuffled[index] = current
    shuffledQueue.value = shuffled

  }



  return { shuffleQueue, shuffledQueue, shuffle, originalQueue,  repeat, deviceId, totalTracks, currentTrack, songPlaying, currentIndex, queue}
})
