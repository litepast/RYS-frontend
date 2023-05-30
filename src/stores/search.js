import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('Search', () => {
  const input = ref('')
  const enterCount = ref(false)
  //const doubleCount = computed(() => count.value * 2)
  function enter() {
    if(input.value.length){
        this.enterCount=!this.enterCount
        
    }
  }

  return { input, enterCount, enter }
})
