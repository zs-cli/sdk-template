<template>
  <div class="header">
    <img class="header-logo" src="@/assets/common/logo.png">
    <User />
  </div>
</template>

<script>
import User from './user'

export default {
  components: {
    User
  },
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";
.header {
  padding: 0 30px 0 16px;
  height: @navbarHeight;
  position: relative;
  background: #262F3E;
  box-shadow: inset 0px -1px 0px 0px #3A465A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.header-logo {
  width: 135px;
}
</style>
