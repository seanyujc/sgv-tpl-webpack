<template>
  <div class="page-module">
    <p>{{tomorrow}}</p>
    <button type="button" @click="show()">按钮</button>
    <router-link to="/foo">登录</router-link>
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