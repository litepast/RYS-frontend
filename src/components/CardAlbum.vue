<template>
    <div class="card" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="button-container">
            <div v-show="hoverCard" class="button-add"
                @click="addAlbum(id,name)">
                <Plus :size="30"/>
            </div>
            <img  :src="cover" />
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

    .button-container{
        @apply relative
    }
    .button-container .button-add{
        @apply cursor-pointer absolute rounded-full w-[50px] h-[50px] z-[2];
        @apply bg-green-600 right-[15px] bottom-[15px] hover:bg-green-400 p-[10px];
        @apply hover:scale-110;

    }
    .card{
    @apply m-2 rounded-xl bg-slate-900 hover:bg-slate-800 border-none p-3 w-[200px];
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