<template>
    <div class="card" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="cover-container">
            <div class="img-container">
                <div v-show="hoverCard" class="button-add"
                    @click="addAlbum(id,name)">
                    <Plus :size="30"/>
                </div>
                <img  :src="cover" />
            </div> 
        </div>      
        <div class="name" :title="name">{{name}} </div>
        <div class="artist" :title="artist">{{year}} - {{artist}}</div>            
    </div>

</template>

<script setup>
    import{ref, defineEmits} from 'vue'
    import Plus from 'vue-material-design-icons/Plus.vue';
    const hoverCard = ref(false)
    const { id, cover, name , year, artist  }  = defineProps([
            'id',
            'cover',
            'name',
            'year',
            'artist'
        ]) 
    const emit = defineEmits(["addAlbum"])

    function addAlbum(a_id,a_name){  
            emit("addAlbum",a_id,a_name)
    }
</script>


<style scoped>

   .card{
    @apply rounded-xl bg-zinc-900 hover:bg-zinc-700;
    @apply flex flex-col mb-3 mr-3;
    @apply w-[220px] h-[290px];
    @apply transition-all duration-300 ease-in-out;
    }

    .cover-container{
        @apply flex w-full h-[220px] justify-center items-center
    }
    .img-container{
        @apply relative flex justify-center items-center w-[200px] h-[200px]
    }

    img{
        @apply w-[200px] h-[200px] object-contain;
    }

    .button-add{
        @apply cursor-pointer absolute rounded-full w-[50px] h-[50px] z-[2];
        @apply bg-green-600 right-[15px] bottom-[15px] hover:bg-green-400 p-[10px];
        @apply hover:scale-110;
        @apply transition-all duration-300 ease-in-out;
    }
   
   
    .name{
        @apply truncate font-semibold my-1 w-full text-white px-2;
    }
    .artist{
        @apply truncate font-medium w-full px-2 text-gray-400;
    }


</style>