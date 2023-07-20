<template>    
    <div class="sidebar"> 
        <RouterLink to="/">
            <SideBarItem materialIcon="Home" :sizeIcon="sizeIcon" label="Home"  pageUrl="/" />
        </RouterLink>
        <RouterLink to="/search">
            <SideBarItem materialIcon="Search" :sizeIcon="sizeIcon" label="Search"  pageUrl="/search" />
        </RouterLink>
        <RouterLink to="/library">
            <SideBarItem materialIcon="Library" :sizeIcon="sizeIcon" label="Library"  pageUrl="/library" />
        </RouterLink>
        <RouterLink to="/dashboard">            
            <SideBarItemG :sizeIcon="sizeIcon" label="Statistics" pageUrl="/dashboard" />          
        </RouterLink>   
    </div>
</template>

<script setup>
    import { RouterLink} from 'vue-router';
    import SideBarItem from '../components/SideBarItem.vue';
    import SideBarItemG from '../components/SideBarItemGraph.vue';
    const sizeIcon = 35
</script>

<style>
    .sidebar{
        @apply bg-black text-white;
    }
</style>


