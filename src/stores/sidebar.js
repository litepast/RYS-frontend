import { ref, } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('Sidebar', () => {  
  const expandedBar = ref(false)  
  function expand() {
    this.expandedBar=!this.expandedBar       
  }

  return {expandedBar, expand}
})
