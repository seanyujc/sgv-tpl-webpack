<template>
  <div class="page-module">
  <headbar></headbar>
    {{title}}
    <p>{{tomorrow}}</p>
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
