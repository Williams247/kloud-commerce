<template>
    <div class="flex float-right">
        <div class="px-2 pt-1">
         <span>
            <span class="numbering px-1 hs">{{page}}</span>
            <span class="info px-1 hs">-</span>
            <span class="numbering px-1 hs">{{itemsPerCurrentPage}}</span>
            <span class="info px-1 hs">of</span>
            <span class="numbering px-1 hs">{{total}}</span>
            <span class="info px-1 hs">Entries</span>
          </span>
        </div>
        <paginate
            :page-range="2"
            :page-count="Math.ceil(total / itemsPerPage)"
            :prev-text="'<'" :next-text="'>'"
            :container-class="'flex pagination-component cursor-pointer'"
            :click-handler="handlePaginateNavigate"
        >
        </paginate>
        <div class="px-1"></div>
        <div class="row-view px-2 cursor-pointer">
            <select class="cursor-pointer">
                <option value="" v-for="i in range">Rows: {{i}}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    range: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 0        
    },
    handlePaginateNavigate: {
        type: Function,
        default: () => []
    },
    itemsPerCurrentPage: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.row-view {
    background: #FFFFFF;
    border: 1px solid #E1E5EE;
    border-radius: 4px;
    outline: none;

    select {
        background: none;
        color: gray;
        font-size: 13px;
        outline: none;
    }
}

.numbering {
    color: #515b74;
    font-size: 13px;
}

.info {
    color: #8891a5;
    font-size: 13px;
}

.hs {
  display: none;
  @media (min-width: 1000px) {
    display: inline;
  }
}
</style>
