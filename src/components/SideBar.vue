<template>    
    <div class="sidebar">
        <SideBarLogo/>        
        <RouterLink to="/">
            <SideBarItem materialIcon="Search" :sizeIcon="sizeIcon" label="Search"  pageUrl="/" title="Look on the Spotify catalog to add albums to your Library" />
        </RouterLink>
        <RouterLink to="/library">
            <SideBarItem materialIcon="Library" :sizeIcon="sizeIcon" label="Library"  pageUrl="/library" title="Browse the albums you have added by different filters and the go rate them!" />
        </RouterLink>
        <RouterLink to="/dashboard">            
            <SideBarItem materialIcon="ChartBox" :sizeIcon="sizeIcon" label="Statistics" pageUrl="/dashboard" title="Check out some stats based on your library content!" />          
        </RouterLink>  
        <RouterLink to="/tableaudashboard">            
            <SideBarItem materialIcon="ViewDashboardVariant" :sizeIcon="sizeIcon" label="Tableu" pageUrl="/tableaudashboard" title="Check out some stats now in tableau!" />          
        </RouterLink>   
    </div>
</template>

<script setup>
    import { RouterLink} from 'vue-router';
    import SideBarItem from '../components/SideBarItem.vue';
    import SideBarLogo from '../components/SideBarLogo.vue';
    const sizeIcon = 35
</script>

<style>
    .sidebar{
        @apply w-full bg-gradient-to-b from-black to-slate-800        
    }
</style>


