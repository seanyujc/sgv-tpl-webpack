<template>
  <div class="page-module">
    <scroller :lock-x="true" :height="'-'+ headbarHeightPX" ref="xScroller" :use-pulldown="true" :use-pullup="true" :pulldown-config="PULLDOWN_CONFIG" :pullup-config="PULLUP_CONFIG" @on-pulldown-loading="pullDonwRefresh" @on-pullup-loading="pullUpLoad">
      <div>
        <div class="wraper">
          <div class="item"></div>
        </div>
        <div class="item2" id="item2" :class="{down: isDown}"></div>
        <p v-for="i in 80" :key="i">placeholder {{i}}
          <span class="glyphicon glyphicon-thumbs-up"></span>
        </p>
      </div>
    </scroller>
  </div>
</template>
<script lang="ts" src="./foo.ts">
</script>
<style lang="scss" scoped>
$color: #333;

.page-module {
  color: $color;
  font-size: 0.3rem;
  .glyphicon-thumbs-up {
    float: right;
  }
  p {
    line-height: 0.5rem;
    margin: 0 0.2rem;
  }

  .item,
  .item2 {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    position: absolute;
    top: 1rem;
    left: 0rem;
    background-color: red;
  }

  .wraper {
    animation: vertical-animation 3s ease-in 1s 1;
  }

  .wraper .item {
    animation: hor-animation 3s linear 1s 1;
  }

  @keyframes hor-animation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(4rem);
    }
  }

  @keyframes vertical-animation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(4rem);
    }
  }

  .item2 {
    top: 2rem;
    left: 0;
    transition: top 3s ease-in 1s, left 3s linear 1s;
    transform: translate3d(0, 0, 0);
  }

}
</style>
