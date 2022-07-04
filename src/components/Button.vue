<template>
  <button
    :style="`background: ${color}; color: ${textColor}`"
    :class="config ? `${config}`:'px-3 py-2'"
    @click="clickAction"
  >
    <span>{{label}}</span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    config: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    clickAction: {
      type: Function,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-family: 'Open Sans Light';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
  border-radius: 4px;
  &:active {
    transform: scale(.9);
  }
}
</style>
