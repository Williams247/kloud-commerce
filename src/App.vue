<template>
  <div id="layout-view">
    <div class="container mx-auto pt-10 pb-4">
      <Banner />
        <Table />
    </div>
  </div>
</template>

<script>
import Banner from "./components/Banner.vue";
import Table from "./components/Table.vue";
import Space from "./components/Space.vue"
export default {
  components: {
    Banner,
    Table,
    Space
  }
}
</script>

<style lang="scss" scoped>
#layout-view {
  background: #f3f5fa;
  padding-bottom: 160px;
}
</style>
