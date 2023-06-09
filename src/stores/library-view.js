import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLibraryViewStore = defineStore('LibraryView', () => {
  const albums = ref([])
  const typeSearch = ref(false)
  const query = ref({
    album_name: '',
    artist_name: '',
    types: [],
    years: [],
    ratings: [],
    genres: [],
    styles: [],
  })

  return { albums, typeSearch, query }
})
