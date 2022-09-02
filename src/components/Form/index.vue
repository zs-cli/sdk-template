<template>
  <el-form
    ref="formRef"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :model="formData"
    :rules="formRules"
    :size="size"
    class="form"
    :class="{ 'form-no-rules' : noRules }"
  >
    <el-row :class="!inline && 'form-column'" :gutter="10">
      <el-col
        v-for="config in formConfig"
        :key="config.key"
        :span="inline ? (config.span ? config.span : 6) : 24"
        :style="`height: ${ inline ? colHeight : '' }px; width: ${config.width === 'auto' ? 'auto' : `${config.width + 10}px`}`"
      >
        <el-form-item
          :label="config.label"
          :label-width="config.labelWidth"
          :prop="config.key"
          :rules="config.rules"
          style="width: 100%;"
        >
          <!-- text -->
          <span v-if="config.type === 'text'">{{ formData[config.key] }}</span>
          <!-- Input -->
          <el-input
            v-if="config.type === 'input'"
            v-model.trim="formData[config.key]"
            auto-complete="off"
            :autosize="config.autosize || false"
            :class="config.kind === 'number' && 'global-input-number'"
            :clearable="config.clearable"
            :disabled="config.disabled"
            :maxlength="config.maxlength"
            :minlength="config.minlength"
            :placeholder="config.placeholder || `请输入${config.label}`"
            :prefix-icon="config.prefixIcon"
            :readonly="config.readonly"
            :rows="config.rows"
            :show-password="config.showPassword"
            :show-word-limit="config.showWordLimit"
            style="width: 100%"
            :suffix-icon="config.suffixIcon"
            :type="config.kind || 'text'"
            @focus="inputFocus(config)"
            @change="val => inputChange(val, config.key, config)"
            @input="val => onInput(val, config.key, config)"
          >
            <!-- Input前置内容 -->
            <template slot="prepend">
              <slot :name="config.prepend" />
            </template>
            <!-- Input后置内容 -->
            <template slot="append">
              <slot :name="config.append" />
            </template>
          </el-input>
          <!-- InputNumber -->
          <el-input-number
            v-if="config.type === 'inputNumber'"
            v-model="formData[config.key]"
            :controls-position="config.controlsPosition || 'right'"
            :disabled="config.disabled"
            :max="config.max"
            :min="config.min"
            :placeholder="config.placeholder"
            :precision="config.precision"
            :step="config.step"
            style="width: 100%"
            @change="val => inputNumberChange(val, config.key, config)"
          />
          <!-- Select -->
          <el-select
            v-if="config.type === 'select'"
            v-model="formData[config.key]"
            :clearable="config.clearable"
            :collapse-tags="config.collapseTags"
            :disabled="config.disabled"
            :filterable="config.filterable"
            :loading="config.loading"
            :multiple="config.multiple "
            :placeholder="config.placeholder"
            :remote="config.remote"
            :remote-method="config.remoteMethod ? (query) => config.remoteMethod(query, config.key, config) : null"
            style="width: 100%"
            @change="val => selectChange(val, config.key, config)"
          >
            <!-- 枚举格式 -->
            <template v-if="config.isEnum">
              <el-option
                v-for="(option, index) in config.options"
                :key="index"
                :label="option"
                :value="index"
              />
            </template>
            <!-- 数组 -->
            <template v-else>
              <el-option
                v-for="(option, index) in config.options"
                :key="index"
                :disabled="option.disabled"
                :label="config.optionKeys ? option[config.optionKeys.label] : option.label"
                :value="config.optionKeys ? option[config.optionKeys.value] : option.value"
              />
            </template>
          </el-select>
          <!-- Radio -->
          <el-radio-group
            v-if="config.type === 'radio'"
            v-model="formData[config.key]"
            :disabled="config.disabled"
            @change="val => radioChange(val, config.key, config)"
          >
            <el-radio
              v-for="(option, index) in config.options"
              :key="index"
              :disabled="option.disabled"
              :label="option.value"
            >{{ option.label }}</el-radio>
          </el-radio-group>
          <!-- Checkbox -->
          <el-checkbox-group
            v-if="config.type === 'checkbox'"
            v-model="formData[config.key]"
            :disabled="config.disabled"
            @change="val => checkboxChange(val, config.key, config)"
          >
            <el-checkbox
              v-for="(option, index) in config.options"
              :key="index"
              :disabled="option.disabled"
              :label="option.value"
            >{{ option.label }}</el-checkbox>
          </el-checkbox-group>
          <!-- Switch -->
          <el-switch
            v-if="config.type === 'switch'"
            v-model="formData[config.key]"
            :active-color="config.activeColor"
            :active-text="config.activeText"
            :disabled="config.disabled"
            :inactive-color="config.inactiveColor"
            :inactive-text="config.inactiveText"
            style="width: 100%"
            @change="val => switchChange(val, config.key, config)"
          />
          <!-- Cascader -->
          <el-cascader
            v-if="config.type === 'cascader'"
            v-model="formData[config.key]"
            :clearable="config.clearable"
            :disabled="config.disabled"
            :filterable="config.filterable"
            :options="config.options"
            :placeholder="config.placeholder || '请选择'"
            :props="config.props"
            style="width: 100%"
            @change="val => cascaderChange(val, config.key, config)"
          />
          <!-- DatePicker  -->
          <el-date-picker
            v-if="config.type === 'datePicker'"
            v-model="formData[config.key]"
            :align="config.align || 'left'"
            :clearable="config.clearable"
            :disabled="config.disabled"
            :end-placeholder="config.endPlaceholder || '结束日期'"
            :format="config.format"
            :picker-options="config.pickerOptions"
            :placeholder="config.placeholder || '选择日期'"
            :range-separator="config.rangeSeparator"
            :start-placeholder="config.startPlaceholder || '开始日期'"
            style="width: 100%"
            :type="config.kind || 'date'"
            :value-format="config.valueFormat || 'yyyy-MM-dd'"
            @change="val => datePickerChange(val, config.key, config)"
          />
          <!-- slot form-item content -->
          <slot :config="config" :data="formData" :name="config.slotName" />
          <!-- slot label -->
          <template slot="label">
            <slot :name="config.labelKey" />
          </template>
        </el-form-item>
      </el-col>
      <!-- slot form content -->
      <slot />
      <!-- search -->
      <div v-if="inline && type === 'search'" class="form-search">
        <el-button :loading="loading" type="primary" @click="searchFormHandle">搜索</el-button>
        <el-button :loading="loading" @click="resetFormHandle">重置</el-button>
      </div>
    </el-row>
  </el-form>
</template>

<script>
/**
 * props
 * 场景：适用于表单类提交及查询，缺少的开发遇到再添加
 * @param {object}  formData - form数据，例： { demo: '' }
 * @param {array}   formConfig - form配置，和formData一一对应，例： [{ type: 'input', key: 'demo', label: '我是demo' }]
 * @param {object}  formRules - form验证规则，与element保持一致，例如{ demo: [ { required: true, message: '请输入demo', trigger: 'change' } ] }
 * @param {boolean} inline - 是否为inline表单
 * @param {string}  labelPosition - label位置
 * @param {string}  labelWidth - label宽度，通常inline模式需定义
 * @param {string}  colHeight - inline为true时el-col默认高度
 * @param {string} type - search 搜索按钮
 */

/**
 * formConfig 包含element默认及自定义配置
 * config 自定义配置参数
 * @param {string} width - 宽度，例： width: '220px'
 * @param {string} key - 与formData中对应，也作为el-form-item的prop
 * @param {any}    v-model - 绑定对应的formData-key，例：formData[config.key]
 * @param {string} type - 类型，现有input/inputNumber/select/datePicker等
 * @param {string} kind - 类型，type=input/type=datePicker时使用，指向element的type字段
 * @param {boolean} isEnum - 是否是枚举对象，type=select时使用，当为true，表示options是枚举类型
 * @param {object} optionKeys - type=select  options为数组时起作用，指定option中label-value的key，例如：{ label: 'name', value: 'id' }
 */

export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Array,
      default: () => ([])
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    colHeight: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    loading: Boolean,
    size: {
      type: String,
      default: 'small'
    },
  },
  computed: {
    noRules() {
      return JSON.stringify(this.formRules) === '{}'
    }
  },
  methods: {
    inputFocus(config) {
      // password 和 readonly 一起用，来去除网站默认填充密码
      if (config.kind === 'password') {
        config.readonly = false
      }
    },
    inputChange(value, key, item) {
      this.$emit('inputChange', { value, key, item })
    },
    onInput(value, key, item) {
      if (item.kind === 'int') {
        this.formData[key] = value.replace(/[^\d]/g, '')
      }
    },
    inputNumberChange(value, key, item) {
      this.$emit('inputNumberChange', { value, key, item })
    },
    selectChange(value, key, item) {
      this.$emit('selectChange', { value, key, item })
    },
    radioChange(value, key, item) {
      this.$emit('radioChange', { value, key, item })
    },
    checkboxChange(value, key, item) {
      this.$emit('checkboxChange', { value, key, item })
    },
    switchChange(value, key, item) {
      this.$emit('switchChange', { value, key, item })
    },
    cascaderChange(value, key, item) {
      this.$emit('cascaderChange', { value, key, item })
    },
    datePickerChange(value, key, item) {
      this.$emit('datePickerChange', { value, key, item })
    },
    // Form Method
    submitForm() {
      return new Promise(resove => {
        this.$refs.formRef.validate(valid => resove(valid))
      })
    },
    validate(cb) {
      return this.$refs.formRef.validate(cb)
    },
    validateField(val) {
      this.$refs.formRef.validateField(val)
    },
    resetFields() {
      this.$refs.formRef.resetFields()
    },
    clearValidate(val) {
      this.$refs.formRef.clearValidate(val)
    },
    // Search Handle
    searchFormHandle() {
      this.$emit('searchFormHandle')
    },
    resetFormHandle() {
      this.$emit('resetFormHandle')
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
}
.form-column {
  display: flex;
  flex-direction: column;
}
.form-search {
  float: right;
  padding-right: 10px;
  margin-left: 8px;
  &--column {
    text-align: center;
  }
  button {
    width: 75px;
    height: 32px;
  }
}
textarea {
  resize: none;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}
/deep/ .el-form-item__label {
  font-weight: 500;
  font-size: 14px;
  // color: #333;
}
/deep/ .el-input__inner {
  font-weight: 500;
}
.el-form--label-top /deep/ .el-form-item__label {
  line-height: 20px;
}
.form-no-rules {
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
