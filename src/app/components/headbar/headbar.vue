<template>
  <div class="comp-module">
    <div class="logo">
      <img src="../../styles/images/logo.png"
           alt="cchrpp logo">
    </div>
    <h1>云GCP平台</h1>
    <div class="account-box">
      <img src="../../styles/images/avatar_boy.png"
           alt="avatar">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          小铭<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">账户设置</el-dropdown-item>
          <el-dropdown-item command="e"
                            divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" src="./headbar.ts">
</script>
<style lang="scss" scoped>
$color: #333;

.comp-module {
  height: 60px;
  position: relative;
  background: #2b3643;
}
.logo {
  width: 102px;
  float: left;
  height: 100%;
  position: relative;
  img {
    width: 66px;
    height: 28px;
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translate(0, -50%);
  }
}
h1 {
  float: left;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: PingFang-SC-Bold;
  font-size: 20px;
  color: #9ba3aa;
  letter-spacing: 0;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  padding: 0 0 0 11px;
  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    display: inline-block;
    height: 20px;
    border-left: 1px solid #6d6f70;
  }
}
.account-box {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  float: right;
  height: 32px;
  img {
    width: 32px;
    height: 32px;
    float: left;
    border-radius: 16px;
  }
  .el-dropdown {
    float: left;
    margin: 0 30px 0 14px;
    line-height: 32px;
    cursor: pointer;
  }
}
.el-dropdown-link {
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  color: #c6cfda;
  letter-spacing: 0;
}

</style>
