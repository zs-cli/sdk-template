<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
      <span>{{ item }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

export default {
  name: 'Breadcrumb',
  computed: {
    levelList() {
      const levelList = this.$route.meta.crumbs || []
      return levelList
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  padding: 0 16px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  /deep/ .el-breadcrumb__inner,
  /deep/ .el-breadcrumb__inner a {
    font-weight: 500;
    color: #82888F;
  }
}
</style>
