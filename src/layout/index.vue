<template>
  <div class="app-wrapper">
    <Header />
    <div class="main-container" :class="{ 'main-wrapper-header' : fixedHeader }">
      <Sidebar class="sidebar-wrapper" />
      <el-scrollbar v-if="showMain" class="main-wrapper">
        <Main />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Header,
    Sidebar,
    Main,
  },
  data() {
    return {
      menuList: []
    }
  },
  computed: {
    ...mapGetters(['permission']),
    showMain() {
      return this.permission && this.permission.length
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
  }
}
</script>

<style lang="less" scoped>
.main-wrapper {
  height: 100%;
  width: 100%;
  /deep/ .el-scrollbar__wrap {
    overflow: auto;
    width: 100%;
  }
}
/deep/ .el-scrollbar__wrap::-webkit-scrollbar {
  width: 0;
}
</style>
