
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  template: `<header>
  <div>{{title}}</div>
  <router-link to="home">首页</router-link>
  <router-link to="login">登录</router-link>
</header>`,
  props: {
    title: String,
  },
})
export default class Headbar extends Vue {

}
</script>

