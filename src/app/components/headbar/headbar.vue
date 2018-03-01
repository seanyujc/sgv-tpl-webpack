<template>
  <header>
    <a class="back" href="javascript: void(0);" @click="back" >
      <i></i>
    </a>
    <h4>{{title}}</h4>
    <div class="tool-box">
      <i class="icon c-service" @click="jumpCustomer" v-if="hasCService">
      </i>
      <i class="icon canlendar" @click="openCanlendar" v-if="hasCanlendar">
      </i>
      <i class="icon" :style="customButton.styles" :class="customButton.classes"  @click="customButton.click" v-if="hasCustomButton">
        {{customButton.text}}
      </i>
    </div>
  </header>
</template>

<script lang="ts" src="./headbar.ts">
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 9999;
  display: flex;
  background: #fff;
}
.back {
  width: 0.94rem;
  height: 0.84rem;
  i {
    margin-top: 0.25rem;
    display: block;
    width: 100%;
    height: 0.34rem;
    background: no-repeat url(../../styles/images/back.png) center center;
    background-size: auto 100%;
  }
}
h4 {
  flex: 1;
  text-align: center;
  font-size: 0.34rem;
  line-height: 0.84rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tool-box {
  width: 0.94rem;
}
</style>
