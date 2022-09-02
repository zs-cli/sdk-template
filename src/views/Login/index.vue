<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container_img">
        <img src="@/assets/common/login-logo.png" alt="">
      </div>
      <el-tabs ref="tabsRef" v-model="activeName" stretch>
        <el-tab-pane label="账号登录" name="account" class="tab-pane" />
        <el-tab-pane label="短信验证码登录" name="phone" class="tab-pane" />
      </el-tabs>
      <div class="login-form">
        <!-- account -->
        <Account v-if="activeName === 'account'" ref="formRef" />
        <!-- phone -->
        <Phone v-if="activeName === 'phone'" ref="formRef" />
      </div>
      <div class="login-button">
        <el-button
          :loading="loading"
          class="login-button--button"
          size="default"
          type="primary"
          @click.native.prevent="clickLogin"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Account from './account'
import Phone from './phone'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  components: {
    Account,
    Phone
  },
  data() {
    return {
      loading: false,
      activeName: 'account',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    }
  },
  methods: {
    clickLogin() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          try {
            const loginForm = this.$refs.formRef.formData
            this.loading = true
            if (this.activeName === 'account') {
              await this.$store.dispatch('user/login', loginForm)
            } else {
              await this.$store.dispatch('user/phoneLogin', loginForm)
            }
            const token = getToken()
            if (token) {
              await this.$store.dispatch('menu/getMenuPermList')
              if (this.menuList && this.menuList.length) {
                this.$router.push({ path: this.menuList[0].path })
              } else {
                this.$router.push('/404')
              }
            }
          } catch (error) {
            console.error(`error: ${error}`)
          }
          this.loading = false
        }
      })
    },
    inputHandle(val) {
      this.phone.formData.code = val
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/login-bg.png") no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 490px;
  height: 470px;
  padding: 34px 55px;
  background: #fff;
  border-radius: 8px;
  &_img {
    text-align: center;
    padding-top: 16px;
    padding-bottom: 30px;
    img {
      width: 198px;
    }
  }
}
.login-button {
  margin-top: 10px;
  &--button {
    width: 100%;
  }
}
.login-form {
  margin-top: 40px;
}
.text-link {
  cursor: pointer;
}

/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-tabs__item {
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;
  color: #82888f;
}
/deep/ .el-tabs__item.is-active {
  font-size: 16px;
  color: #31363F;
}
/deep/ .el-tabs__active-bar {
  // height: 5px;
  background-color: #066cf1;
  // border-radius: 5px;
}
/deep/ .el-tabs__item  {
  padding: 0!important;
}
</style>
