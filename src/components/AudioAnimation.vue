<template>
<div class="playing">
  <span class="playing__bar playing__bar1"></span>
  <span class="playing__bar playing__bar2"></span>
  <span class="playing__bar playing__bar3"></span>
  <span class="playing__bar playing__bar4"></span>
</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.playing {
 @apply flex items-end justify-between h-4 w-4;
}

.playing__bar {
  @apply bg-green-400;
  display: inline-block;
  width: 21%;   
  height: 100%;
  animation: up-and-down 1.3s ease infinite alternate;
}

.playing__bar1 {
  height: 60%;
}

.playing__bar2 {
  height: 30%;
  animation-delay: -2.2s;
}

.playing__bar3 {
  height: 75%;
  animation-delay: -3.7s;
}

.playing__bar4 {
  height: 50%;
  animation-delay: -4.5s;
}


@keyframes up-and-down {
  10% {
    height: 30%;
  }
  
  30% {
    height: 100%;
  }
  
  60% {
    height: 50%;
  }
  
  80% {
    height: 75%;
  }
  
  100% {
    height: 60%;
  }
}

</style>