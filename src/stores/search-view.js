import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchViewStore = defineStore('SearchView', () => {
  const albums = ref([])
  const typeSearch = ref(true)
  return { albums, typeSearch }
})
