<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <div class="card-left">
          <span class="card-title">{{ title }}</span>
          <span v-if="subtitle" class="card-subtitle">{{ subtitle }}</span>
          <el-tooltip v-if="tooltip" placement="top-start" :popper-class="tooltipAuto ? '' : popperClass">
            <div slot="content">
              <slot name="content">
                <span>{{ content }}</span>
              </slot>
            </div>
            <i class="el-icon-info card-info" />
          </el-tooltip>
        </div>
        <slot name="headerRight" />
      </slot>
    </div>
    <div v-loading="loading" class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    tooltip: Boolean,
    content: {
      type: String,
      default: ''
    },
    popperClass: {
      type: String,
      default: 'card-tooltip'
    },
    tooltipAuto: Boolean,
    loading: Boolean,
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(213, 217, 222, 0.5);
  & + .card {
    margin-top: 16px;
  }
}
.card-header {
  height: 54px;
  padding: 0 16px;
  border-bottom: 1px solid #e4e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  .card-subtitle {
    font-size: 16px;
    color: #82888F;
    margin-left: 8px;
  }
  .card-info {
    font-size: 14px;
    margin-left: 8px;
    color: #a6acb3;
    cursor: pointer;
  }
}
.card-content {
  padding: 16px;
}
.card-left {
  flex-shrink: 0;
  margin-right: 10px;
}
</style>

<style lang="less">
.card-tooltip {
  width: 286px;
}
</style>
