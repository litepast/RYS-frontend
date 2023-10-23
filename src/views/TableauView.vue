<template> 
<div class="h-full w-full bg-[#285000] mt-[60px] pl-44 flex items-center justify-center">


    <div class='tableauPlaceholder' id='viz1697876776821'>
      <noscript>
        <a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyRatingDashboard&#47;MyRYSRatingStats&#47;1_rss.png' style='border: none' />
          <!-- <a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyRatingDashboard&#47;MyGenresandStylesStats&#47;1_rss.png' style='border: none' /> -->
        </a>
      </noscript>
      <object class='tableauViz'  style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' /> 
        <param name='site_root' value='' />
        <param name='name' value='MySpotifyRatingDashboard&#47;MyRYSRatingsStats' />
        <param name='tabs' value='yes' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyRatingDashboard&#47;MyRYSRatingStats&#47;1.png' /> 
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='es-ES' />
      </object>
    </div>
    
  </div>

</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    var divElement = document.getElementById('viz1697876776821');
    var vizElement = divElement.getElementsByTagName('object')[0];
    console.log(divElement.offsetWidth)

    if (divElement.offsetWidth > 800 ){ 
      vizElement.style.width='1400px';vizElement.style.height='800px';
      console.log("opc1")      
    } else
    if (divElement.offsetWidth > 500 ){
       vizElement.style.width='1400px';vizElement.style.height='800px';
       console.log("opc2")  
    } 
    else { 
      vizElement.style.width='150%';vizElement.style.height='860px';
      console.log("opc3")  
    }   

    var scriptElement = document.createElement('script');                    
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);        
}
)
  

</script>

<style scoped>


</style>