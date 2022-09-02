<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <img class="pic-404" src="@/assets/404@2x.png" alt="404">
      <div class="bullshit">
        <div class="bullshit__headline">404</div>
        <div class="bullshit__info">你要找的页面不存在</div>
        <el-button type="primary" class="bullshit__return-home" @click="clickToHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Page404',
  computed: {
    ...mapGetters(['menuList'])
  },
  methods: {
    clickToHome() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .pic-404 {
    width: 484px;
  }
  .bullshit {
    position: relative;
    padding: 30px 0;
    margin-left: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__headline {
      font-size: 100px;
      color: #82888F;
      margin-bottom: 9px;
    }
    &__info {
      font-size: 18px;
      color: #82888F;
      margin-bottom: 21px;
    }
    &__return-home {
      height: 34px;
      background: #066CF1;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
