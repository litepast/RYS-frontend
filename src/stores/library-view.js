import { ref } from 'vue'
import { defineStore } from 'pinia'
import { all, oTypes, oYears, oRatings } from '../data/initFilters.js'
import genres from '../data/genres.json'
import styles from '../data/styles.json'

export const useLibraryViewStore = defineStore('LibraryView', () => {
  const albums = ref([])
  const typeSearch = ref(false)  
  const allTypes = ref(all)  
  const optionsTypes = ref(oTypes)
  const allYears = ref(all)  
  const optionsYears = ref(oYears)
  const allRatings = ref(all)
  const optionsRatings = ref(oRatings)
  const allGenres = ref(all)
  const optionsGenres = ref(genres)
  const allStyles = ref(all)
  const optionsStyles = ref(styles)

  const query = ref({
    album_name: '',
    artist_name: '',
    types: [],
    years: [],
    ratings: [],
    genres: [],
    styles: [],
  })

  return { albums, typeSearch, query, allTypes, optionsTypes, allYears, optionsYears, allRatings, optionsRatings, allGenres, optionsGenres, allStyles, optionsStyles }
})
