<template>
    <div class="card" @click="goToAlbumView" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="cover-container">
            <img  :src="cover" />
            <div v-show="hoverCard" class="button-delete" :title="`Delete ${name}  from Library`">
                <Delete :size="30"/>
            </div>
        </div> 
        <StarRating :title=" rating ? rating + ' Stars' : 'Unrated'" 
        :rating="rating" :star-size="16" :read-only="true" :increment="0.5"  :show-rating="false"
                inactive-color="#332A2B" active-color="#1ED760" :border-width="1"/>
        <div class="name" :title="name">{{name}} </div>
        <div class="artist" :title="artist">{{year}} - {{artist}}</div>            
    </div>

</template>

<script setup>
    import{ref} from 'vue'
    import { useRouter } from 'vue-router';
    import StarRating from 'vue-star-rating'
    import Delete from 'vue-material-design-icons/Delete.vue'
    const router = useRouter()
    const hoverCard = ref(false)
    
    const { id, cover, name , year, artist  }  = defineProps([
            'id',
            'cover',
            'name',
            'year',
            'artist',
            'rating'
        ]) 

    const goToAlbumView = () => {       
            router.push(`/library/${id}`)
            
        }


</script>


<style scoped>

    .button-delete{
        @apply cursor-pointer absolute rounded-full w-[50px] h-[50px] z-10;
        @apply bg-green-600 right-[5px] top-[5px]  p-[10px] opacity-30;
        @apply hover:scale-110 hover:bg-green-400 hover:opacity-100;
    }

    .cover-container{
        @apply relative w-[176px] h-[176px]
    }

    .cover-container img{
        @apply object-contain  w-[176px] h-[176px];
    }
  
    .card{
    @apply m-2 rounded-xl bg-slate-900 hover:bg-slate-800 border-none p-3 w-[200px];
    @apply cursor-pointer;
    }
   
    .card .name{
        @apply truncate font-semibold mt-1 text-white;
    }
    .card .artist{
        @apply truncate font-medium mt-1 text-gray-500;
    }


</style>