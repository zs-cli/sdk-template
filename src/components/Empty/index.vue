<template>
  <div class="empty">
    <img v-if="isImg" class="empty-img" src="@/assets/no-data@2x.png" alt="no data">
    <div class="empty-description">{{ description }}</div>
    <slot name="add" />
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    isImg: Boolean
  }
}
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .empty-img {
    width: 150px;
    margin-bottom: 10px;
  }
  .empty-description {
    color: #909399;
  }
}
.empty-no-image {
  /deep/ .el-empty__description {
    margin-top: 0;
  }
}
</style>
