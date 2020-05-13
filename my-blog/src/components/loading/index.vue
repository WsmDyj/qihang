<template>
  <div size="100" class="domino__Wrapper-sc-81zu9-0 hWslho">
    <div class="domino__Bar-sc-81zu9-1 dnYhMw"></div>
    <div class="domino__Bar-sc-81zu9-1 kvhidN"></div>
    <div class="domino__Bar-sc-81zu9-1 dWilrx"></div>
    <div class="domino__Bar-sc-81zu9-1 dSijKn"></div>
    <div class="domino__Bar-sc-81zu9-1 ilQrOA"></div>
    <div class="domino__Bar-sc-81zu9-1 bRIWUz"></div>
    <div class="domino__Bar-sc-81zu9-1 keqAUf"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({default: false}) loading!: boolean
}
</script>

<style lang="scss" scoped>
.hWslho {
  position: relative;
  width: 100px;
  height: 20px;
}
.domino__Bar-sc-81zu9-1 {
  position: absolute;
  right: 0px;
  width: 3.33333px;
  height: 20px;
  transform-origin: 50% 100%;
  background-color: rgb(68, 138, 255);
}
.dnYhMw {
  transform: translateX(100px) rotate(0deg);
  animation: 3s linear 0s infinite normal none running cUkqCz;
}
.dnYhMw:nth-child(1) {
  opacity: 0.22;
}
.kvhidN {
  transform: translateX(85px) rotate(0deg);
  animation: 3s linear -0.42s infinite normal none running cUkqCz;
}
.dWilrx {
  transform: translateX(70px) rotate(0deg);
  animation: 3s linear -0.84s infinite normal none running cUkqCz;
}
.dSijKn {
  transform: translateX(55px) rotate(10deg);
  animation: 3s linear -1.26s infinite normal none running cUkqCz;
}
.ilQrOA {
  transform: translateX(40px) rotate(40deg);
  animation: 3s linear -1.68s infinite normal none running cUkqCz;
}
.bRIWUz {
  transform: translateX(25px) rotate(60deg);
  animation: 3s linear -2.1s infinite normal none running cUkqCz;
}
.keqAUf {
  transform: translateX(10px) rotate(70deg);
  animation: 3s linear -2.52s infinite normal none running cUkqCz;
}
@keyframes cUkqCz {
  0% {
    transform: translateX(0px) rotate(0deg);
    opacity: 0;
  }
  14.28% {
    transform: translateX(-12.5px) rotate(0deg);
    opacity: 1;
  }
  28.56% {
    transform: translateX(-25px) rotate(0deg);
    opacity: 1;
  }
  37.12% {
    transform: translateX(-37.5px) rotate(0deg);
    opacity: 1;
  }
  42.84% {
    transform: translateX(-50px) rotate(10deg);
    opacity: 1;
  }
  57.12% {
    transform: translateX(-62.5px) rotate(40deg);
    opacity: 1;
  }
  71.4% {
    transform: translateX(-75px) rotate(62deg);
    opacity: 1;
  }
  85.68% {
    transform: translateX(-87.5px) rotate(72deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-100px) rotate(74deg);
    opacity: 0;
  }
}

</style>
