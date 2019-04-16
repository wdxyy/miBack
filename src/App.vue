<template>
  <div id="app">
    <keep-alive>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.topbar {
  padding: 20px 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.el-dialog--small {
  width: 25% !important;
}
.buyBtn {
  width: 100px;
}
.buyBtn:nth-child(2) {
  margin-left: 30px !important;
}
</style>