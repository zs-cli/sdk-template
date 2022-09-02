<template>
  <div class="verification-code">
    <el-input
      ref="codeRef"
      v-model="code"
      :maxlength="maxlength"
      :placeholder="placeholder"
      class="verification-code--input"
      type="text"
      @input="inputHandle"
    />
    <el-button :disabled="isCountdown" class="verification-code--button" @click="sendCodeHandle">
      <span v-if="!isCountdown">获取验证码</span>
      <span v-else>{{ time }}秒</span>
    </el-button>
  </div>
</template>

<script>
import { sendSms } from '@/api/common'

export default {
  props: {
    phone: {
      type: [Number, String],
      default: ''
    },
    maxlength: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: '请输入验证码'
    }
  },
  data() {
    return {
      code: '',
      time: 60,
      timer: null,
      isCountdown: false
    }
  },
  methods: {
    async sendCodeHandle() {
      if (!this.phone) {
        this.$emit('validate')
        return
      }
      // this.$emit('sendCodeHandle')
      try {
        await sendSms({ phone: this.phone })
        this.isCountdown = true
        this.$refs.codeRef.focus()
        this.countdown()
        this.$message.success('发送成功')
      } catch (res) {
        console.log(res)
      }
    },
    inputHandle(val) {
      this.code = val.replace(/[^\d]/g, '')
      this.$emit('input', val)
    },
    // 倒计时
    countdown() {
      if (this.time === 0) {
        clearTimeout(this.timer)
        this.time = 60
        this.isCountdown = false
        return
      } else {
        this.isCountdown = true
        this.time--
      }
      this.timer = setTimeout(() => {
        this.countdown()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.verification-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &--button {
    width: 120px;
    height: 40px;
    margin-left: 12px;
    &:focus, &:hover {
      color: #066CF1;
      border-color: #066CF1;
      background-color: #fff;
    }
    &.is-disabled:focus, &.is-disabled:hover {
      color: #C0C4CC;
      border-color: #EBEEF5
    }
  }
}
</style>
