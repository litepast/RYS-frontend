import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', () => {
  const expandedBar = ref(false)
  const stateHistory = ref({})
  const scrollSearch = ref(0)
  const scrollLibrary = ref(0)  
  function changeSideBar() {
    this.expandedBar=!this.expandedBar       
  }

  return {scrollSearch , scrollLibrary, expandedBar, stateHistory, changeSideBar}
})
