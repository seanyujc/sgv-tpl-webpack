<template>
  <div class="page-module">
    <scroller :lock-x="true" :height="'-'+ headbarHeightPX" ref="xScroller" :use-pulldown="true" :use-pullup="true" :pulldown-config="PULLDOWN_CONFIG" :pullup-config="PULLUP_CONFIG" @on-pulldown-loading="pullDonwRefresh" @on-pullup-loading="pullUpLoad">
      <div>
        <p v-for="i in 80" :key="i">placeholder {{i}}</p>
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
}
</style>
