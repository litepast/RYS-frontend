<template>
  <div class="loader"></div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  background: #4ede80;
  background: -moz-linear-gradient(left, #4ede80 10%, rgba(78,222,128, 0) 42%);
  background: -webkit-linear-gradient(left, #4ede80 10%, rgba(78,222,128, 0) 42%);
  background: -o-linear-gradient(left, #4ede80 10%, rgba(78,222,128, 0) 42%);
  background: -ms-linear-gradient(left, #4ede80 10%, rgba(78,222,128, 0) 42%);
  background: linear-gradient(to right, #4ede80 10%, rgba(78,222,128, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #4ede80;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #000000;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>