<template>
  <div class="container" id="Result">
    <div class="row resultRow" id="resultRow1">
      <div class="col-md-12">
        <vue-good-table
          ref="my-table"
          mode="remote"
          v-on:page-change="onPageChange"
          v-on:sort-change="onSortChange"
          v-on:column-filter="onColumnFilter"
          v-on:per-page-change="onPerPageChange"
          v-on:selected-rows-change="selectionChanged"
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
            ofLabel: '/',
            pageLabel: 'page', // for 'pages' mode
            allLabel: 'All',
            dropdownAllowAll: false,
          }"
          :rows="tableDatas"
          :columns="columns"
          :sort-options="{
            enabled: true,
          }"
          theme="nocturnal"
          styleClass="vgt-table striped"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true, // disable the select info panel on top
            selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }"
          v-on:row-click="onRowClick"
          :row-style-class="rowStyleClassFn"
        />
      </div>
    </div>
    <div class="row resultRow" id="resultRow2">
      <div class="col-md-12">
        <ResultCard />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchService from "@/services/index";
import ResultCard from "@/components/ResultCard.vue";

export default {
  name: "my-component",
  components: {
    ResultCard,
  },
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
      selectedRow: "getSelectedRows",
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
    selectedRow: {
      handler: function (newData) {
        return newData;
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
    selectionChanged() {
      // Seçilen satırları aşağıdaki şekilde yakalaya biliyoruz.
      console.log(this.$refs["my-table"].selectedRows);
    },
    onRowClick(params) {
      this.$store.dispatch("selectRows", params.row);
      console.log(params.row);
    },
    rowStyleClassFn(row) {
      return row.originalIndex == this.selectedRow.originalIndex
        ? "selectedRowClass"
        : "notSelectedRowClass";
    },
  },
};
</script>
<style >
.vgt-responsive {
  max-height: 65vh;
}
.vgt-table.nocturnal thead th {
  color: #c7ced8;
  border-bottom: 2px solid #9b9b9b;
  background: linear-gradient(#000000, #2c394f);
}
#vgt-table > thead > tr > th.vgt-checkbox-col {
  background: linear-gradient(#000000, #2c394f);
  border-bottom: 2px solid #9b9b9b;
  color: #c7ced8;
}

.vgt-wrap.nocturnal .vgt-wrap__footer {
  color: #c7ced8;
  border-bottom: 2px solid #9b9b9b;
  background: linear-gradient(#2c394f, #000000);
}

#Result {
  display: flex;
  justify-content: space-between;
}

.resultRow {
  width: 100%;
}

.selectedRowClass {
  background-color: #1205057a !important;
}
.row {
  padding: 0 0.5rem;
}

.container {
  max-width: 100%;
  margin: 0;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 800px) {
  #Result {
    flex-direction: column;
  }
  #resultRow2 {
    padding-top: 1em;
    margin-bottom: 2em;
  }
  .row {
    padding: 0 0.5rem;
    margin: 0;
  }
  .container {
    padding: 0;
  }
  .row > * {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>