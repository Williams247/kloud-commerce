<template>
  <div>
    <div id="control-panel">
      <Space>
      <div class="flex py-3">
        <div class="w-1/2 pt-2">
          <span id="view-all-users">View All Users</span>
        </div>
        <div class="w-1/2">
          <div class="float-right">
            <Button
              label="Create New User"
              color="#3399FF"
              :clickAction="functionCall"
            />
          </div>
        </div>
      </div>
      </Space>
    </div>
  </div>
</template>

<script>
import Space from "./Space.vue";
import Button from "./Button.vue";
export default {
  props: {
    functionCall: {
      type: Function,
      default: () => []
    }
  },
  components: {
    Space,
    Button
  }
}
</script>

<style lang="scss" scoped>
#control-panel {
  background: white;
  border: 1px solid #E1E5EE;
  #view-all-users {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #4e4e4e;
  }
}
</style>
