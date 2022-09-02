<template>
  <div class="user">
    <el-dropdown trigger="click" class="userInfo">
      <span class="el-dropdown-link">
        <div class="user-avatar">
          <img v-if="userInfo.avatar" :src="avatar">
          <img v-else src="@/assets/common/avatar.png">
        </div>
        <span class="user-account">{{ userInfo.username }}</span>
        <i class="el-icon-caret-bottom el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item
          icon="el-icon-edit-outline"
          @click.native="changePassword"
        >修改密码</el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-mobile-phone"
          @click.native="phoneBind"
        >手机号绑定</el-dropdown-item> -->
        <el-dropdown-item
          icon="el-icon-switch-button"
          @click.native="logout"
        >退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },
  methods: {
    changePassword() {},
    phoneBind() {},
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  line-height: 30px;
  display: flex;
  justify-content: flex-end;
  &:focus {
    outline: none;
  }
  .userInfo {
    cursor: pointer;
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  .user-account {
    margin-left: 6px;
  }
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
