<template>
  <div>
    <vue-good-table
      mode="remote"
      v-on:page-change="onPageChange"
      v-on:sort-change="onSortChange"
      v-on:column-filter="onColumnFilter"
      v-on:per-page-change="onPerPageChange"
      :totalRows="countData"
      :totalPage="totalPage"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        position: 'bottom',
        setCurrentPage: 1,
        nextLabel: 'Sonraki',
        prevLabel: 'Önceki',
        rowsPerPageLabel: 'Sayfadaki Satır Sayısı',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
        dropdownAllowAll: false,
      }"
      :rows="tableDatas"
      :columns="columns"
      :sort-options="{
        enabled: true,
      }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchService from "@/services/index";

export default {
  name: "my-component",
  data() {
    return {
      totalPage: 10,
      lastPage: "1",
      lastSize: "10",
      lastSortFiled: "",
      lastSortType: "",
      isLoading: false,
      columns: [
        {
          label: "Id",
          field: "_id",
        },
        {
          label: "Index",
          field: "_index",
        },
        {
          label: "Score",
          field: "_score",
        },
      ],
      totalRecords: 0,
      serverParams: {
        columnFilters: {},
        sort: {
          field: "",
          type: "",
        },
        page: 1,
        perPage: 10,
      },
    };
  },
  computed: {
    ...mapGetters({
      tableDatas: "getSearchedData",
      countData: "getAllDataCount",
      searched: "getCurrentSearch",
    }),
  },
  watch: {
    tableDatas: {
      handler: function (newData) {
        console.log(newData);
      },
      deep: true,
    },
    searched: {
      handler: function (newData) {
        console.log(newData);
      },
      deep: true,
    },
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      const prevPageParam = (params.currentPage - 1) * params.currentPerPage;
      this.lastSortFiled == ""
        ? this.changeData(this.searched, params.currentPerPage, prevPageParam)
        : this.sortingData(
            this.searched,
            params.currentPerPage,
            prevPageParam,
            this.lastSortFiled,
            this.lastSortType
          );
    },

    onPerPageChange(params) {
      this.lastSize = params.currentPerPage;
      this.lastSortFiled == ""
        ? this.changeData(this.searched, params.currentPerPage, "0")
        : this.sortingData(
            this.searched,
            params.currentPerPage,
            "0",
            this.lastSortFiled,
            this.lastSortType
          );
    },

    onSortChange(params) {
      this.lastSortFiled = params[0].field;
      this.lastSortType = params[0].type;
      this.sortingData(
        this.searched,
        this.lastSize,
        "0",
        params[0].field,
        params[0].type
      );
    },

    onColumnFilter(params) {
      console.log(params);
      console.log("onColumnFilter");
    },
    changeData(searched, size, from) {
      SearchService.query(searched, size, from).then((data) => {
        this.$store.dispatch("search", searched);
        this.$store.dispatch("data", data.hits.hits);
        this.$store.dispatch("countData", data.hits.total.value);
      });
    },
    sortingData(searched, size, from, column, type) {
      SearchService.querySort(searched, size, from, column, type).then(
        (data) => {
          this.$store.dispatch("search", searched);
          this.$store.dispatch("data", data.hits.hits);
          this.$store.dispatch("countData", data.hits.total.value);
        }
      );
    },
  },
};
</script>
<style >
.vgt-responsive {
  max-height: 60vh;
}
</style>