<template>
    <div class="card" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="cover-container">
            <img  :src="cover" />
        </div> 
        <StarRating :title=" rating ? rating + ' Stars' : 'Unrated'" 
        :rating="rating" :star-size="16" :read-only="true" :increment="0.5"  :show-rating="false"
                inactive-color="#332A2B" active-color="#1ED760" :border-width="1"/>
        <div class="name" :title="name">{{name}} </div>
        <div class="artist" :title="artist">{{year}} - {{artist}}</div>            
    </div>

</template>

<script setup>
    import{ref, defineEmits} from 'vue'
    import StarRating from 'vue-star-rating'

    const hoverCard = ref(false)
    
    const { id, cover, name , year, artist  }  = defineProps([
            'id',
            'cover',
            'name',
            'year',
            'artist',
            'rating'
        ]) 

    // const emit = defineEmits(["addAlbum"])

    // function addAlbum(a_id,a_name){  
    //         emit("addAlbum",a_id,a_name)
    // }

</script>


<style scoped>

    .cover-container{
        @apply relative
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