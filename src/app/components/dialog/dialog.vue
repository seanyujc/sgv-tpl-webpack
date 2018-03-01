<template>
  <div class="comp-module">
    <x-dialog v-model="isShow" hide-on-blur @on-hide="onClose">
      <div class="dialog-box" v-if="isShowMsg">{{msg}}</div>
      <div class="diglog-bg" v-if="isShowConform">
        <div class="conform-dialog">
          <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
          <section>
            <p>{{conformMsg}}</p>
          </section>
          <button @click="conformBtn()">{{options.okText}}</button>
          <button class="cancel" @click="cancelBtn()">{{options.cancelText}}</button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script lang="ts" src="./dialog.ts">
</script>
<style lang="scss">
.comp-module .weui-dialog {
  width: auto;
  max-width: 6.2rem;
}
</style>

<style lang="scss" scoped>
.comp-module {
  .dialog-box {
    width: 2.2rem;
    text-align: center;
    padding: 0.12rem 0.1rem;
    color: #ffffff;
    background: #666;
    position: fixed;
    top: 70%;
    left: 2.75rem;
    border-radius: 0.05rem;
    z-index: 99999;
  }
  .diglog-bg {
    // width: 100%;
    // height: 100%;
    // position: fixed;
    // top: 0rem;
    // background: rgba(0,0,0,0.4);
    // z-index: 9998;
    .conform-dialog {
      width: 6.2rem;
      height: 4.5rem;
      padding: 0.6rem 0.2rem 0.2rem 0.2rem;
      // background: url(../../styles/images/dialog.png) #fff no-repeat center
      //   0.6rem;
      background-size: 0.8rem 0.8rem;
      .glyphicon {
        font-size: 1.5rem;
        color: #4285f4;
      }
      section {
        height: 1.08rem;
        text-align: center;
      }
      button {
        width: 2.2rem;
        height: 0.7rem;
        border-radius: 0.35rem;
        background: #4285f4;
        border: #4284f3 0.02rem solid;
        color: #fff;
        font-size: 0.34rem;
      }
      .cancel {
        margin-left: 0.5rem;
        background: #ffffff;
        color: #4285f4;
      }
    }
  }
}
</style>
