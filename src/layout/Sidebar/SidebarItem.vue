<template>
  <div v-if="!item.hidden" class="sidebar-item">
    <el-submenu v-if="item.children && item.children.length > 0" :index="item.meta && item.meta.menuTag">
      <div slot="title" class="sidebar-submenu--title">
        <i class="sidebar-item--icon iconfont" :class="item.meta.icon" />
        <span>{{ item.meta && item.meta.title }}</span>
      </div>
      <SidebarItem
        v-for="child in item.children"
        :key="child.name"
        :base-path="item.path"
        :is-nest="true"
        :item="child"
      />
    </el-submenu>
    <Link v-else :to="item.path">
      <el-menu-item v-if="item.meta.isMenu" :index="item.meta && item.meta.menuTag">
        <i class="sidebar-item--icon iconfont" :class="item.meta.icon" />
        <span slot="title">{{ item.meta && item.meta.title }}</span>
      </el-menu-item>
    </Link>
  </div>
</template>

<script>
import Link from './Link'

export default {
  name: 'SidebarItem',
  components: {
    Link
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    // resolvePath(routePath) {
    //   if (isExternal(routePath)) {
    //     return routePath
    //   }
    //   if (isExternal(this.basePath)) {
    //     return this.basePath
    //   }
    //   return path.resolve(this.basePath, routePath)
    // }
  }
}
</script>
