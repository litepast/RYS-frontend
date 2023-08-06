import { computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('PlayerStore', () => {
  const deviceId = ref(null)
  const songPlaying = ref(false)
  const currentIndex = ref(0)  
  const queue = ref([])
  const currentTrack = computed(() => queue.value[currentIndex.value])
  const totalTracks = computed(() => queue.value.length)
  return {  deviceId, totalTracks, currentTrack, songPlaying, currentIndex, queue}
})
