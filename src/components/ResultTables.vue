<template>
  <div id="example-table" ref="example-table"></div>
</template>
<script>
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator_bootstrap4.min.css";
import { mapGetters } from "vuex";

export default {
  name: "ResultTables",
  data() {
    return {
      tabulator: null, //variable to hold your table
    };
  },
  computed: {
    ...mapGetters({ tableDatas: "getSearchedData" }),
  },
  watch: {
    tableDatas: {
      handler: function (newData) {
        this.tabulator.replaceData(newData);
      },
      deep: true,
    },
  },
  mounted() {
    this.tabulator = new Tabulator(this.$refs["example-table"], {
      data: this.tableDatas,
      reactiveData: true,
      layout: "fitColumns",
      columns: [
        {
          title: "Id",
          field: "_id",
        },
        {
          title: "Index",
          field: "_index",
        },
        {
          title: "Score",
          field: "_score",
        },
        {
          title: "Source",
          field: "_source",
        },
      ],
    });
  },
};
</script>
<style type="scss" >
/* @import  "~tabulator/dist/scss/bootstrap/tabulator_bootstrap4"; */
</style>