<template>
  <el-table-column
    :align="item.align"
    :fixed="item.fixed"
    :label="item.label"
    :min-width="item.minWidth"
    :prop="item.prop"
    :sortable="item.sortable"
    :width="item.width"
  >
    <template v-if="item.children && item.children.length">
      <Column v-for="(child, childIndex) in item.children" :key="child.prop || childIndex" :item="child" />
    </template>
    <!-- 表头 -->
    <template slot="header" slot-scope="{ column }">
      <span v-if="!item.customHeader">{{ column.label }}</span>
      <slot v-else :column="item" :name="item.customHeader" />
    </template>
    <!-- 插槽内容 -->
    <template slot-scope="{ row, column, $index }">
      <slot
        v-if="item.slotName"
        :$index="$index"
        :column="column"
        :name="item.slotName"
        :row="row"
      />
      <template v-else>
        <span v-if="item.filter">{{ (row[item.prop] || row[item.prop] === 0) ? item.filter(row[item.prop]) : '' }}</span>
        <span v-else-if="item.render">{{ item.render(row[item.prop], row) }}</span>
        <span v-else>{{ (row[item.prop] || row[item.prop] === 0) ? row[item.prop] : "" }}</span>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'Column',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>

