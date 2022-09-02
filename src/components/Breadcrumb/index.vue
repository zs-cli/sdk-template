<template>
  <div class="combinecrumb">
    <Crumb />
    <slot />
  </div>
</template>

<script>
import Crumb from './crumb'
export default {
  components: {
    Crumb
  }
}
</script>

<style lang="less" scoped>
.combinecrumb {
  display: flex;
  align-items: center;
  height: 54px;
  padding-right: 16px;
  background-color: #fff;
}
</style>
