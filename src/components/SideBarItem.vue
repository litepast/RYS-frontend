<template>
    <div class="px-2">
        <div class="item" @mouseenter="hover=true" @mouseleave="hover=false" :class="bgColor()">
            <div class="icon-container">
                <Icon :class="textColor()" class="transition-all duration-500 ease-in-out" v-show="isActive" :size="sizeIcon"/>
                <IconOutline  :class="textColor()" class="transition-all duration-500 ease-in-out" v-show="!isActive" :size="sizeIcon" />
            </div>          
                <span :class="textColor()">{{label}}</span>
        </div> 

    </div>
    <!-- :class="bgColor()" -->
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
    const hover = ref(false)    
    

    const isActive = computed(() => {
        if(path.value == pageUrl ){
            return true
        }else{
            return false
        }
    }
    )
   

 

    const bgColor = () =>{
        if (isActive.value){
            return "bg-gradient-to-r from-violet-600 via-emerald-400 to-amber-500"
        }
        if(hover.value){
            return "bg-gray-600"
        }
        else{
            return "bg-transparent"
        }
    }


    const textColor = () =>{
        if (isActive.value){
            return "text-white"
        }
        if(hover.value){
            return "text-white"
        }
        else{
            return "text-gray-400"
        }
    }


</script>

<style scoped>

.item{
    @apply flex justify-start items-center mb-1 rounded-lg transition-all duration-300 ease-in-out;
}

.icon-container{
    @apply flex justify-center items-center w-9 h-9 pr-2 
}

.item span{
    @apply text-left text-[13px] ml-2 transition-all duration-500 ease-in-out; 
}
</style>