<template>
  <div class="page-module">
    <scroller :lock-x="true" :height="'-'+ headbarHeightPX" ref="Scroller">
      <div>
        {{title}}
        <p>{{today}}</p>
        <button type="button" @click="show()">按钮</button>
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
