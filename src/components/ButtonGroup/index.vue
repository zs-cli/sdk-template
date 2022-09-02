<template>
  <el-button-group class="button-group">
    <el-button
      v-for="item in data"
      :key="item.value"
      :class="{ 'button-active' : active === item.value }"
      size="medium"
      :disabled="item.disabled"
      @click="clickButtonHandle(item)"
    >{{ item.label }}</el-button>
  </el-button-group>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    active: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    clickButtonHandle(item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.button-group {
  flex-shrink: 0;
  .el-button--medium {
    padding: 8px 15px;
  }
  .el-button:active,
  .el-button:focus,
  .el-button:hover,
  .button-active {
    border-color: #1885f2;
    color: #1885f2;
    background-color: #fff;
    z-index: 2;
  }
  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #D9D9D9;
  }
}
</style>
