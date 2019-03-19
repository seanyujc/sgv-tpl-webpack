import { Aside, Container, Footer, Header, Main } from "element-ui";
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

// Register the router hooks with their names
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate", // for vue-router 2.2+
]);

@Component({
  components: {},
  computed: {},
})
export default class App extends Vue {
  /* 生命钩子 START */
  mounted() {
    //
  }
}
