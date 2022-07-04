<template>
 <div id="banner" class="px-10">
   <img id="banner-logo" src="../assets/kloud.png" />
   <div class="w-full mt-3">
     <div class="flex justify-center">
        <div>
            <p id="kloud-commerce-challenge">KLOUD COMMERCE CHALLENGE</p>
            <p id="display-multi-text" class="text-center mt-2">{{logs[count]}}</p>
            <div class="flex justify-center mb-10">
              <div class="flex mt-5">
                <div :class="`${count === 0 ? 'dash mx-2 active':'dash mx-2'}`"></div>
                <div :class="`${count === 1 ? 'dash mx-2 active':'dash mx-2'}`"></div>
                <div :class="`${count === 2 ? 'dash mx-2 active':'dash mx-2'}`"></div>
              </div>
            </div>
        </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      logs: ["Have fun", "Create", "Explore"]
    }
  },
  mounted() {
    setInterval(() => {
      if (this.count === 2) {
        this.count = 0
      } else {
        this.count ++
      }
    }, 3000)
  }
}
</script>

<style lang="scss" scroped>
#banner {
  background: #2A2A8F;
  margin-top: 25px;
  #banner-logo {
    width: 203px;
    height: 68px;
    position: relative;
    top: -30px;
  }
  #kloud-commerce-challenge {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 65px;
    display: flex;
    align-items: center;
    color: #EFF1F4;
  }
  #display-multi-text {
    font-family: 'Open Sans Light';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 34px;
    color: rgba(255, 255, 255, 0.7);
    animation-name: showSlow;
    animation-duration: 3000ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes showSlow {
    from { opacity: .8 }
    to { opacity: 1 }
  }

  .dash {
    width: 32px;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    transition: 1000ms ease-in-out;
  }

  .active {
    background: #FFFFFF !important;
  }
}
</style>
