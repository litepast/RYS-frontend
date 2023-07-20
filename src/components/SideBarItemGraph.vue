<template>
    <div class="item" @mouseenter="hover=true" @mouseleave="hover=false">  
        <Icon v-show="isActive" :size="sizeIcon" :fillColor="color()"/>
        <IconOutline v-show="!isActive" :size="sizeIcon" :fillColor="color()"/>
        <span :style="{color : color() }">{{label}}</span>
    </div> 
</template>

<script setup>
    import {ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    const { sizeIcon, label , pageUrl  }  = defineProps([        
        'sizeIcon',
        'label',
        'pageUrl'
    ])
    const route = useRoute() 
    const path = computed (() => route.fullPath )  
    import Icon from 'vue-material-design-icons/ChartBox.vue';
    import IconOutline from 'vue-material-design-icons/ChartBoxOutline.vue';
 

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
    @apply flex items-center my-2 
}

.item span{
    @apply text-left pl-2 text-lg; 
}
</style>