<template>
  <section class="app-main">
    <Breadcrumb />
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  beforeDestroy() {
    window._axiosPromiseArr.forEach((ele, index) => {
      ele.cancel(index)
      delete window._axiosPromiseArr[index]
    })
  }
}
</script>

<style lang="less" scoped>
.app-main {
  height: 100%;
  position: relative;
  overflow: auto;
}
</style>
