<template>
    <div class="item" @mouseenter="hover=true" @mouseleave="hover=false">  
        <Icon v-show="isActive" :size="sizeIcon" :fillColor="color()"/>
        <IconOutline v-show="!isActive" :size="sizeIcon" :fillColor="color()"/>
        <span :style="{color : color() }">{{label}}</span>
    </div> 
</template>

<script setup>
    import {defineAsyncComponent, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    const { materialIcon, sizeIcon, label , pageUrl  }  = defineProps([
        'materialIcon',
        'sizeIcon',
        'label',
        'pageUrl'
    ])
    const route = useRoute() 
    const path = computed (() => route.fullPath )    
    const IconOutlineName = materialIcon+'Outline'
    const IconName = materialIcon   
    const Icon = defineAsyncComponent(()=> import(/* @vite-ignore */ `./materialIcons/${IconName}.vue`))
    const IconOutline = defineAsyncComponent(()=> import(/* @vite-ignore */ `./materialIcons/${IconOutlineName}.vue`))
    const isActive = computed (() => path.value == pageUrl)
    const hover = ref(false)   
    const color = () =>{
        if (isActive.value){
            return "#FFFFFF"
        }
        if(hover.value){
            return "#FFFFFF"
        }
        else{
            return "#A0A0A0"
        }
    }

</script>

<style scoped>

.item{
    @apply p-0 flex items-center my-2 
}

.item span{
    @apply text-left pl-2 text-[16px]; 
}
</style>