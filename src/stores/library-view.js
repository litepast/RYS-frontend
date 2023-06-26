import { ref } from 'vue'
import { defineStore } from 'pinia'
import { all, oTypes, oYears, oRatings } from '../data/initFilters.js'
import genres from '../data/genres.json'
import styles from '../data/styles.json'

export const useLibraryViewStore = defineStore('LibraryView', () => {

  const typeSearch = ref(true)  
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
  const resultfor = ref('')

  const query = ref({
    album_name: '',
    artist_name: '',
    types: [],
    years: [],
    ratings: [],
    genres: [],
    styles: [],
  })
  
  function clear() {    
    allTypes.value.selected = true
    allYears.value.selected = true
    allRatings.value.selected = true
    allGenres.value.selected = true
    allStyles.value.selected = true
    optionsTypes.value.forEach((item) => {
      item.selected = false
    })

    optionsYears.value.forEach((item) => {
      item.selected = false
    }) 

    optionsRatings.value.forEach((item) => {
      item.selected = false
    })

    optionsGenres.value.forEach((item) => {
      item.selected = false
    })
    
    optionsStyles.value.forEach((item) => {
      item.selected = false
    })
  }
  
  return { typeSearch, query, allTypes, optionsTypes, allYears, optionsYears, allRatings, optionsRatings, allGenres, optionsGenres, allStyles, optionsStyles, clear, resultfor }
})
