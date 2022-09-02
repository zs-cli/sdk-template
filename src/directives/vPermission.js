import Vue from 'vue'
import store from '../store'

const permission = Vue.directive('permission', {
  inserted: function(el, binding) {
    const { menu: { permission }} = store.state
    const value = binding.value
    if (permission && value) {
      if (!permission.includes(value)) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
})

export { permission }
