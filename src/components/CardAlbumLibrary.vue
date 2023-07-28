<template>
    <div class="card" @click="clickEvent(id,name)" @mouseenter="hoverCard=true" @mouseleave="hoverCard=false" :key="id">
        <div class="cover-container">
            <div class="img-container">
                <img  :src="cover" />  
                <div v-show="hoverCard" @mouseenter="hoverDelete=true" @mouseleave="hoverDelete=false"  class="button-delete" :title="`Delete ${name}  from Library`" >
                    <Delete :size="30"/>
                </div>
            </div>
        </div> 
        <div class="rating-container w-full px-2">
            <StarRating :title=" rating ? rating + ' Stars' : 'Unrated'" :rating="rating" :star-size="16" :read-only="true" :increment="0.5"  :show-rating="false"
            inactive-color="#332A2B" active-color="#1ED760" :border-width="1"/>            
        </div>
     

        <div class="name" @click="goToAlbumView" :title="name">{{name}} </div>
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
    const hoverDelete = ref(false)
    
    const { id, cover, name , year, artist  }  = defineProps([
            'id',
            'cover',
            'name',
            'year',
            'artist',
            'rating'
        ]) 

    function goToAlbumView() {       
            router.push(`/library/${id}`)            
        }

    const emit = defineEmits(["deleteAlbum"])

    function deleteAlbum(a_id,a_name){              
            emit("deleteAlbum",a_id,a_name)
    }

    function clickEvent(a_id,a_name){
        if(hoverDelete.value){
            deleteAlbum(a_id,a_name)
            return            
        }        
        goToAlbumView()
    }

    


</script>


<style scoped>

    .card{
        @apply rounded-xl bg-zinc-900 hover:bg-zinc-700;
        @apply flex flex-col mb-3 mr-3 cursor-pointer;
        @apply w-[220px] h-[305px];
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

    .button-delete{
        @apply cursor-pointer absolute rounded-full w-[50px] h-[50px] z-10;
        @apply bg-green-600 right-[5px] top-[5px]  p-[10px] opacity-30;
        @apply hover:scale-110 hover:bg-green-400 hover:opacity-100;
        @apply transition-all duration-300 ease-in-out;
    }
      
    .name{
        @apply truncate font-semibold my-1 w-full text-white px-2 hover:underline cursor-pointer;
    }
    .artist{
        @apply truncate font-medium w-full px-2 text-gray-400;
    }



</style>