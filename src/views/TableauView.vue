<template> 
<div class="h-full w-full flex pt-[70px] items-center justify-center">

  <div class='tableauPlaceholder' id='viz1698899778626' style='position: relative'>
    <noscript>
    <a href='#'>
        <img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyRatingDashboard&#47;MyRYSRatingsStats&#47;1_rss.png' style='border: none' />
    </a>
    </noscript>
    <object class='tableauViz'  style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='MySpotifyRatingDashboard&#47;MyRYSRatingsStats' />
        <param name='tabs' value='yes' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyRatingDashboard&#47;MyRYSRatingsStats&#47;1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='es-ES' />
        <param name='filter' value='publish=yes' />
    </object>
  </div>


    
</div>

</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
   
  var divElement = document.getElementById('viz1698899778626');
  var vizElement = divElement.getElementsByTagName('object')[0];

  // if ( divElement.offsetWidth > 800 ) {
  //   vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';
  //   console.log("opc 1")
  // } else if ( divElement.offsetWidth > 500 ){
  //   vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';
  //   console.log("opc 2")
  // } else {
  //   vizElement.style.width='100%';vizElement.style.height='100%';
  //   console.log("opc 3")
  // }
  
  vizElement.style.width='100%';vizElement.style.height='100%';

  
  var scriptElement = document.createElement('script');                    
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
  vizElement.parentNode.insertBefore(scriptElement, vizElement);   
    
}
)
  

</script>

<style scoped>


</style>