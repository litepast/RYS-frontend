import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { all, oTypes, oYears, oRatings } from '../data/initFilters.js'
import genres from '../data/genres.json'
import styles from '../data/styles.json'

export const useLibraryViewStore = defineStore('LibraryView', () => {
  const loading = ref(false)
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

  const query = ref({
    album_name: '',
    artist_name: '',
    types: [],
    years: [],
    ratings: [],
    genres: [],
    styles: [],
  })


  const filtersText = computed(() => {
    let results = [] 
    let resultsArtist = ''
    let resultsAlbum = ''
    let resultsTypes = '' 
    let resultsYears = ''
    let resultsRatings = ''
    let resultsGenres = ''
    let resultsStyles = ''
    let types = {
      1: 'Album',
      2: 'Single',
      3: 'EP',
      4: 'Compilation',
    }

    if(query.value.album_name != ''){
      resultsAlbum = 'Album Name: ' + query.value.album_name
    }else{
      resultsAlbum = 'All Albums'
    }

    if(query.value.artist_name != ''){
      resultsArtist = 'Artist Name: ' + query.value.artist_name
    }else{
        resultsArtist = 'All Artists'
    }

    if(query.value.types.length){
      resultsTypes = 'Types: ' + query.value.types.map((item) => {
        return types[item]
      }).join(', ')
    }else{
        resultsTypes = 'All Types'
    }

    //
    if(query.value.years.length){
      if(query.value.years.length < 15){
          resultsYears = 'Years: ' + query.value.years.join(', ')
      }else{
          resultsYears =  'Multiple Years'
      }
    }else{
        resultsYears = 'All Years'
    }
  
    if(query.value.ratings.length){
        if(query.value.length < 15){
            resultsRatings = 'Ratings: ' + query.value.ratings.join(', ')
        }else{
            resultsRatings =  'Multiple Ratings'
        }
      }else{
          resultsRatings = 'All Ratings'
      }

    if(query.value.genres.length){
        if(query.value.genres.length < 15){
            resultsGenres = 'Genres: ' + query.value.genres.join(', ')
        }else{
            resultsGenres =  'Multiple Genres'
        }
    }else{
        resultsGenres = 'All Genres'
    }
  
    if(query.value.styles.length){
        if(query.value.styles.length < 15){
            resultsStyles = 'Styles: ' + query.value.styles.join(', ')
        }else{
            resultsStyles =  'Multiple Styles'
        }
    }else{
        resultsStyles = 'All Styles'
    }

    

    //
    results.push(resultsArtist)
    results.push(resultsAlbum)
    results.push(resultsTypes)
    results.push(resultsYears)
    results.push(resultsRatings)
    results.push(resultsGenres)
    results.push(resultsStyles)
    return 'Filters: ' +  results.join('; ')
    
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
  
  return { filtersText, loading, typeSearch, query, allTypes, optionsTypes, allYears, optionsYears, allRatings, optionsRatings, allGenres, optionsGenres, allStyles, optionsStyles, clear}
})
