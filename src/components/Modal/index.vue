<template>
  <a-modal
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
    v-bind="modalConfig"
  >
    <slot></slot>
  </a-modal>
</template>

<script>

export default {
  props: {
    modalConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
