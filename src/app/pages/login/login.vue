<template>
  <div class="page-module">
    <el-form ref="loginForm" class="login-form" :rules="rules" :model="form">
      <h3>欢迎登录</h3>
      <el-form-item prop="userName">
        <el-input v-model="form.userName" placeholder="请输入您的用户名/手机/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入您的密码"></el-input>
      </el-form-item>
      <el-form-item class="long-form-item">
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
      <ul class="forgot-sigup">
        <li>
          <router-link to="/forgot">忘记密码？</router-link>
        </li>
        <li>
          <a href="javascript:" @click="signup">注册新账号</a>
        </li>
      </ul>
    </el-form>
    <el-dialog title="请选择您的身份类型" :visible.sync="dialogSignupVisible">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./login.ts">
</script>
<style lang="scss" scoped>
$color: #333;

.page-module {
  position: relative;
  height: 100%;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  padding: 20px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  h3 {
    text-align: center;
  }
}
.forgot-sigup {
  float: right;
  li {
    float: left;
  }
}
// 注册类型选择
.el-dialog__wrapper /deep/ .el-dialog__header {
  text-align: center;
}
.el-radio {
  display: block;
  height: 30px;
  line-height: 30px;
  background: #e7ecf1;
  text-align: center;
  &.is-checked {
    background: #009dc7;
  }
}
.el-radio + .el-radio {
  margin-left: 0px;
  margin: 10px 0;
}
.el-radio /deep/ .el-radio__input {
  display: none;
}
.el-radio.is-checked /deep/ .el-radio__label {
  color: #fff;
}
.full-card {
  flex: 1;
}
.el-card /deep/ .el-card__header {
  text-align: center;
}
.dialog-footer {
  text-align: center;
}
</style>
<style lang="scss">
.login-page {
  height: 100%;
  body {
    height: 100%;
    background: url(../../styles/images/bg.png) no-repeat;
    background-size: cover;
  }
}
</style>
