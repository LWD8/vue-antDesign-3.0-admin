import modal from 'ant-design-vue/es/modal'

const beforeClose = {
  before_close_normal: (resolve) => {
    modal.confirm({
      content: '确定要关闭这一页吗',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}

export default beforeClose
