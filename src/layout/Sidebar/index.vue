<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="false"
        mode="vertical"
      >
        <SidebarItem v-for="menu in menuList" :key="menu.name" :base-path="menu.path" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.less'

export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      menuList: []
    }
  },
  computed: {
    menus() {
      return this.$store.state.menu.menuList
    },
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta: { activeMenu, menuTag }} = route
      // if set path, the sidebar will highlight the path you set
      if (activeMenu) {
        return activeMenu
      }
      return menuTag
    },
    variables() {
      return variables
    },
  },
  created() {
    this.initMenuList()
  },
  methods: {
    async initMenuList() {
      const menus = this.menus || []
      this.handelMenuData(menus)
      this.menuList = menus
    },
    handelMenuData(data) {
      data.forEach(item => {
        item.meta = {
          title: item.title,
          icon: item.icon,
          isMenu: true,
          menuTag: item.menuTag || item.name,
          // accessible: item.accessible
        }
        if (item.children && item.children.length > 0) {
          this.handelMenuData(item.children)
        }
      })
    }
  }
}
</script>
