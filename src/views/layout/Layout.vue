<template>
  <div
    v-if="this.$route.path.includes('/dashboard')"
    class="app-wrapper bgImg2"
    :class="{ hideSidebar: !sidebar.opened }"
  >
    <div style="height: 70px; width: 100%; position: absolute">
      <sidebar class="sidebar-container" style="display: inline"></sidebar>
    </div>
    <div class="main-container">
      <navbar class="header"></navbar>
      <app-main></app-main>
    </div>
  </div>

  <div v-else class="app-wrapper" :class="{ hideSidebar: !sidebar.opened }">
    <div style="height: 70px; width: 100%; position: absolute; z-index: 1">
      <sidebar class="sidebar-container" style="display: inline"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "@/views/layout/components";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
  // mounted() {
  //   let browerWidth = window.innerWidth; //浏览器可视宽度
  //   let baseWidth = 1920; //设计稿宽度
  //   let zoomValue = browerWidth / baseWidth; //缩放比例计算
  //   document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")"; //mainContainer为主容器id
  //   window.onresize = function () { //窗口尺寸变化时，重新计算和缩放
  //     browerWidth = window.innerWidth;
  //     zoomValue = browerWidth / baseWidth;
  //     document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
  //   }
  // }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.bgImg2 {
  overflow: hidden;
  background-image: url("../../assets/images/bgimg3.png");
}
.header {
  position: absolute;
  z-index: 1003;
  animation: headdowm 1.5s;
  top: 14px;
}
@keyframes headdowm {
  from {
    margin-top: -3%;
  }
  to {
    margin-top: 0%;
  }
}
</style>
