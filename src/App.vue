<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'App',
  computed: {
    title() {
      return this.$store.state.settings.title
    },
    crumbs() {
      const crumbs = this.$route.meta.crumbs || []
      return crumbs
    },
  },
  watch: {
    'crumbs': {
      handler(val) {
        if (val && val.length) {
          const menuStr = cloneDeep(val).reverse().join('-')
          document.title = `${menuStr} 【${this.title}】`
        } else {
          document.title = `【${this.title}】`
        }
      },
      immediate: true
    }
  }
}
</script>

