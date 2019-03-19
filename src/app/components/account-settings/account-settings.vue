<template>
  <div class="account-settings">

    <el-dropdown placement="bottom"
                 @command="handleCommand">
      <span class="el-dropdown-link">
        <img :src="AVATAR['account']"
             alt=""
             srcset=""
             class="avatar"
             height="30">
        <span>{{accountInfo.nickName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="settings">账户设置</el-dropdown-item>
        <el-dropdown-item class="link"><a href="/help"
             target="_blank">帮助</a></el-dropdown-item> -->
        <el-dropdown-item command="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="账户设置"
               :close-on-click-modal="false"
               width="500px"
               :visible.sync="isVisibleSettingsDialog">
      <el-form label-width="80px"
               ref="accountForm"
               :model="model"
               :rules="rules">
        <el-form-item label="旧密码"
                      prop="oldPassword">
          <el-input type="password"
                    v-model="model.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="password1">
          <el-input type="password"
                    v-model="model.password1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="password2">
          <el-input type="password"
                    v-model="model.password2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isVisibleSettingsDialog=false">取 消</el-button>
        <el-button type="primary"
                   @click="handleSettingsSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./account-settings.ts">
</script>
<style lang="scss" scoped>
.avatar {
  margin: 15px;
}
.account-settings {
  display: flex;
}
.el-dropdown-link {
  display: flex;
  line-height: 60px;
  cursor: pointer;
}
.el-dropdown-menu__item {
  a {
    color: inherit;
    display: block;
  }
}
.el-dropdown-menu--small .link {
  padding: 0;
  a {
    padding: 0 15px;
  }
}
</style>
