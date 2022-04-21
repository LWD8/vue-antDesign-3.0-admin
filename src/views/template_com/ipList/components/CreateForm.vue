<template>
  <a-modal
    title="新建规则"
    :width="500"
    :visible="visible"
    :confirmLoading="loading"
    @ok="
      () => {
        $emit('ok')
      }
    "
    @cancel="
      () => {
        $emit('cancel')
      }
    "
  >
    <a-alert type="warning" style="margin-bottom: 20px">
      <div slot="message" style="font-size: 12px; line-height: 20px" v-html="hintText"></div>
    </a-alert>
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="IP分组" required>
          <a-select v-model="form.status" placeholder="请选择IP分组">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="上号上限" required>
          <a-input
            placeholder="请输入IP上号上限，1~100"
          />
        </a-form-item>
        <a-form-item label="IP资源" required>
          <a-textarea
            :rows="4"
            placeholder="请输入IP资源，一行一个"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

const HINT_TEXT = `
 1、IP分组：用于归纳IP资源，给IP分类，后续使用均以分组为单位使用，系统会智能分配使用分组内负载最低的IP<br/>
 2、上号上限： 约定每个IP最多可上号数量，如达到上限，系统则不会继续使用该IP上号<br/>
 3、资源：仅支持SOCKS5代理IP资源<br/>
     <div style="text-indent:19px">格式 帐号:密码@地址:端口<div>
     <div style="text-indent:19px">有帐号密码示例 user:pass@111.111.111.111:888<div>
     <div style="text-indent:19px">无帐号密码示例 111.111.111.111:888<div>
`

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    }
    return {
      hintText: HINT_TEXT,
      form: this.$form.createForm(this)
    }
  },
  created() {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
