import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useSearchViewStore = defineStore('SearchView', () => {
  const albums = ref([])
  const typeSearch = ref(true)
  const firstLoad = ref(true)
  const welcomeMsg = ref(true)
  const goodResponse = ref(false)
  return { albums, typeSearch, firstLoad, welcomeMsg, goodResponse }
})
