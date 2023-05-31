import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchViewStore = defineStore('SearchView', () => {
  const albums = ref([])
  const typeSearch = ref(false)
  const input = ref('')
  //const doubleCount = computed(() => count.value * 2)
//   function enter() {
//     if(input.value.length){
//         this.enterCount=!this.enterCount
        
//     }
//   }

  return { albums, typeSearch }
})
