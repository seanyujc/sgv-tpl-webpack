<template>
  <div class="comp-module">
    <div class="data-loading" :class="{android: isAndroid}" v-if="isLoading"><span>
      <!-- <img :src="PUBLIC_PATH + 'assets/images/loading.png'" alt=""> -->
      </span><i v-if="isAndroid">请稍后...</i></div>
  </div>
</template>
<script lang="ts" src="./loading.ts">
</script>
<style lang="scss" scoped>
@keyframes loadingAnimat {
  0% {
    background-position: -0rem -0rem;
  }
  100% {
    background-position: -20rem -0rem;
  }
}
@keyframes loadingAnimatAndroid {
  0% {
    background-position: -0.22rem -0rem;
  }
  100% {
    background-position: -20.22rem -0rem;
  }
}
.comp-module {
  .data-loading {
    line-height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0.4rem;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #e7e7e7, $alpha: 1);
    border-radius: 0.1rem;
    span {
      position: relative;
      display: block;
      float: left;
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      background: url(../../styles/images/loading.png) no-repeat;
      background-size: 20rem 1rem;
      // background-position: -0.22rem -0rem;
      animation: loadingAnimat 0.8s steps(20) infinite;
      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }
    i {
      font-style: normal;
    }
    &.android {
      background-color: inherit;
      width: auto;
      span {
        width: 0.55rem;
        margin-right: 0.2rem;
        background-position: -0.22rem -0rem;
        animation: loadingAnimatAndroid 0.8s steps(20) infinite;
      }
      i {
        float: left;
      }
    }
  }
}
</style>
