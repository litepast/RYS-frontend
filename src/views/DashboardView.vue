<template> 
    <div  ref="c" class=" text-white pt-[60px] w-full h-full bg-gradient-to-b from-slate-600 via-sky-900 to-green-950">
        <iframe :width="w" :height="h" src="http://192.168.100.14:8050" ></iframe> 
      
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useElementSize } from '@vueuse/core'
const c = ref(null)
const size = useElementSize(c, { width: 0, height: 0 })
const w = computed(() => size.width.value)
const h = computed(() => size.height.value )


</script>

<style scoped>


</style>