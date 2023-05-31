<template>
    <div class="card" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="button-container">
            <div v-show="hoverCard" class="button-add"
                @click="addAlbum(id)">
                <Plus :size="30"/>
            </div>
            <img  :src="cover" />
        </div> 
        <div class="name" :title="name">{{name}} </div>
        <div class="artist">{{year}} - {{artist}}</div>            
    </div>
</template>

<script setup>
    import{ref} from 'vue'
    import Plus from 'vue-material-design-icons/Plus.vue';
    const hoverCard = ref(false)
    const { id, cover, name , year, artist  }  = defineProps([
            'id',
            'cover',
            'name',
            'year',
            'artist'
        ])   

    function addAlbum(album_id){
            console.log(album_id)
            return;
        }
</script>


<style scoped>
    .button-container{
        @apply relative
    }
    .button-container .button-add{
        @apply cursor-pointer absolute rounded-full w-[50px] h-[50px] z-10;
        @apply bg-green-600 right-[15px] bottom-[15px] hover:bg-green-400 p-[10px];

    }
    .card{
    @apply m-2 rounded-lg bg-slate-900 hover:bg-slate-800 border-none p-3 w-[200px];
    }
    .card img{
        width: 100%;
        height: width;
    }
    .card .name{
        @apply truncate font-semibold mt-1 text-white;
    }
    .card .artist{
        @apply truncate font-medium mt-1 text-gray-500;
    }


</style>