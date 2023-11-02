<template> 
    <div  ref="c" class="pt-[60px] w-full h-full">
        <!-- <div v-if="loading" class="flex w-full h-full justify-center items-center">
            <Spinner/>
        </div>
        <div v-else class="flex w-full h-full justify-center items-center">
            
            <div v-if="!iframeLoaded">
                <SomethingWrong/>
            </div>

            <div v-else class="w-full h-full">
                <iframe :width="w" :height="h" src="http://192.168.100.14:8050"  ></iframe>
            </div> 
        </div> -->
        <iframe :width="w" :height="h" :src="DASH_URL"  ></iframe>
                     
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useElementSize } from '@vueuse/core'
import SomethingWrong from '../components/SomethingWrong.vue'
import Spinner from '../components/SpinnerLoaderBlack.vue'
import { DASH_URL } from '../../config'
const c = ref(null)
const size = useElementSize(c, { width: 0, height: 0 })
const w = computed(() => size.width.value)
const h = computed(() => size.height.value )
const iframeLoaded = ref(false)
const loading = ref(true)

function isServerUp() {
    loading.value = true
    const url = 'http://192.168.100.14:8050';
    fetch(url, { method: 'HEAD' }) 
    .then(response => {
      if (response.ok) {
        iframeLoaded.value = true 
      } else {
        iframeLoaded.value = false
      }
    })
    .catch(error => {
      console.error('Error:', error);
      iframeLoaded.value = false 
    })
    .finally(() => {
        loading.value = false
    })    
}

// onBeforeMount(async () => {    
//     isServerUp()
  
// })

 

</script>

<style scoped>


</style>