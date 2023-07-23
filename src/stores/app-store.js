import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', () => {
  const userName = ref('Enrique')  
  const expandedBar = ref(false)
  const stateHistory = ref({})  
  function changeSideBar() {
    this.expandedBar=!this.expandedBar       
  }

  return {expandedBar, stateHistory, userName, changeSideBar}
})
