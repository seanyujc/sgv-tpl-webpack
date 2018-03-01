<template>
  <div class="page-module">
    <scroller :lock-x="true" :height="'-'+ headbarHeightPX" ref="Scroller">
      <div>
        <p v-for="i in 80">placeholder {{i}}</p>
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
