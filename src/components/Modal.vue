<template>
 <div
    v-if="isOpen"
    :class="`modal w-full ${zIndex}`"
 >
   <div class="pt-20">
    <slot></slot>
   </div>
 </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: String,
      default: "z-10"
    }
  }
}
</script>

<style lang="scss" scoped>
 .modal {
    background: rgba(0,0,0,0.2);
    position: fixed;
    bottom: 0;
    height: 100%;
    left: 0;
    right: 0;
 }
</style>
