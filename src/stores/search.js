import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('Search', () => {
  const input = ref('')
  const enterCount = ref(false)
  function enter() {
    this.enterCount=!this.enterCount       
  }

  return { input, enterCount, enter }
})
