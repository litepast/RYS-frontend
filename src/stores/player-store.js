import { computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('PlayerStore', () => {
  const repeat = ref(0)
  const shuffle = ref(false)
  const volume = ref(0.5)
  const deviceId = ref(null)
  const songPlaying = ref(false)  
  const queue = ref([])
  const originalQueue = ref([])
  const totalTracks = computed(() => queue.value.length)
  const currentTrackId = ref(null)
  const currentAlbumId = ref(null) 
  const currentIndex = ref(0)
  const currentTrack = ref(null)
  function setIndex(){
    for(let i = 0; i < queue.value.length; i++)
    {
      if(queue.value[i].id == currentTrackId.value){
        currentIndex.value = i
        break
      }
    }     
  }
  function setTrack(){
    currentTrack.value = queue.value[currentIndex.value]
  }

  function shuffleQueue(){
    const shuffled = [...originalQueue.value]
    for(let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temp
    }
    const current = shuffled[0]
    const index = shuffled.indexOf(currentTrack.value)    
    shuffled[0] = currentTrack.value
    shuffled[index] = current
    currentIndex.value = 0
    queue.value = shuffled
    setTrack()
  }

  function setShuffle(value){
    shuffle.value = value
    if(queue.value.lenght == 0 || currentTrack.value == null){      
      return
    }
    if(shuffle.value){      
      shuffleQueue()    
    }else{
      queue.value = originalQueue.value
      setIndex()
      setTrack()
    }
  }
  return { setIndex, setTrack, setShuffle, shuffleQueue, volume, currentAlbumId , currentTrackId, shuffle, originalQueue,  repeat, deviceId, totalTracks, currentTrack, songPlaying, currentIndex, queue}
})
