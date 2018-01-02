<template>
  <div class="page-module">
    <headbar></headbar>
    <p>{{tomorrow}}</p>
    <button type="button" @click="show()">按钮</button>
    <calandar></calandar>
    <footbar></footbar>
  </div>
</template>
<script lang="ts" src="./home.ts">

</script>
<style lang="scss" scoped>
$color-red: #f00;

.page-module {
  color: $color-red;
  font-size: 0.6rem;
}
</style>
