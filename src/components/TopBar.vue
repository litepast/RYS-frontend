<template>
     <div class="topbar" :style=" transparent ? 'background-color: transparent' : 'background-color: #101010'  ">
        <div class="flex items-center">
            <div class="nav-buttons">
                <button type="button" >
                    <ChevronLeft @click="goBack()" fillColor="#FFFFFF" :size="30" />
                </button>
                <div class="ml-2"></div>
                <button type="button" >
                    <ChevronRight @click="goFoward()" fillColor="#FFFFFF" :size="30" />
                </button>
            </div>
            <SearchBox/>            
        </div> 
        <button  class="profile-container" @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'">
            <div class="flex items-center">
                <img class="profile-img"  width="27" src="src\components\img\profile.jpg">
                <div class="profile-name"> Enrique</div>
                <ChevronDown v-if="!openMenu" fillColor="#FFFFFF" :size="25" />
                <ChevronUp v-else fillColor="#FFFFFF" :size="25" />
            </div>
        </button>
        <!-- <div v-if="openMenu"
            class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
            <ul class="text-gray-200 font-semibold text-[14px]">
                <li @click="goProfile()" class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
                <li @click="logOut()" class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
            </ul>
        </div>         -->
    </div>
   
</template>

<script setup>
  import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
  import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
  import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
  import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
  import SearchBox from '../components/SearchBox.vue'
  import { ref, computed} from 'vue'
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter()
  const route = useRoute()
  const nameView = computed(() => route.name)

  const transparent = computed(() =>{
        if (nameView.value == 'album' || nameView.value == 'dashboard'){
            return true
        }
        else{
            return false
        }}
     )




  const openMenu = ref(false)
  const goBack = () =>{ router.back() }
  const goFoward = () =>{ router.forward()}
  const goProfile = () =>{  }
  const logOut = () => {  }
</script>

<style scoped>


.topbar{
    @apply flex items-center w-[calc(100%-195px)] h-full justify-between ;
    /*w-[calc(100%-195px)] h-[60px] fixed left-[175px] z-10  bg-[#101010] bg-opacity-80*/
         
}

.nav-buttons{
    @apply flex items-center h-full ml-2;
}

.nav-buttons button{
    @apply rounded-full bg-black p-[1px] hover:bg-[#A0A0A0]  cursor-pointer;
}

.profile-container{
    @apply right-0 mr-3 px-2 opacity-50 hover:opacity-100 rounded-lg;
}
.profile-img{
     @apply rounded-full mr-3;
}
.profile-name{
    @apply text-white text-[14px] ml-1.5 font-semibold;
} 

</style>