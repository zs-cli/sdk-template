<template>
  <div class="toptip">
    <p v-for="item in tooltip" :key="item.text">
      <span v-if="item.label" class="toptip--label">{{ item.label }}</span>
      <span>{{ item.text }}</span>
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ApplyTooltip',
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    tipkey: {
      type: String,
      default: ''
    }
  },
  computed: {
    tooltip() {
      if (this.tipkey) {
        const list = this.data?.filter(item => {
          return item.tooltip && item.tooltip.includes(this.tipkey)
        })
        return list
      } else {
        return this.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toptip {
  padding: 0 20px;
  &--label {
    position: relative;
    color: #BDD9FF;
    &::before {
      position: absolute;
      left: -12px;
      top: 8px;
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #BDD9FF;
    }
  }
}
</style>
