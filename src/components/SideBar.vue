<template>    
    <div class="sidebar"> 
        <div class="logo-container">
            <div class="logo-icon">
                <MusicCircle fillColor="#FFFFFF" :size="48"/>
            </div>
            <div class="logo-label">
                Rate Yr. Spotify
            </div>                                   
        </div> 
        <div class="my-8"></div>
        <RouterLink to="/">
            <SideBarItem materialIcon="Home" :sizeIcon="sizeIcon" label="Home"  pageUrl="/" />
        </RouterLink>
        <RouterLink to="/search">
            <SideBarItem materialIcon="Search" :sizeIcon="sizeIcon" label="Search"  pageUrl="/search" />
        </RouterLink>
        <RouterLink to="/library">
            <SideBarItem materialIcon="Library" :sizeIcon="sizeIcon" label="Library"  pageUrl="/library" />
        </RouterLink>        
        
    </div>
      
    
</template>

<script setup>
    import { RouterLink} from 'vue-router';
    import MusicCircle from 'vue-material-design-icons/MusicCircle.vue';
    import SideBarItem from '../components/SideBarItem.vue'
    const sizeIcon = 35
</script>


<style>
    .sidebar{
        @apply h-[100%] p-4 w-[240px] fixed z-50 bg-black text-white font-sans;
    }

    .logo-container{
        @apply flex items-center
    }

    .logo-label{
        @apply text-xl font-bold p-1 
    }
</style>


