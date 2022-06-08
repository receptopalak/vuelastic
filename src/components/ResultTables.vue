<template>
  <div id="example-table" ref="example-table"></div>
</template>
<script>
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator_bootstrap4.min.css";
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
  name: "ResultTables",
  data() {
    return {
      tabulator: null,
      paginationSize: 10,
    };
  },
  computed: {
    ...mapGetters({
      tableDatas: "getSearchedData",
      countData: "getAllDataCount",
    }),
  },
  methods: {
    hideIcon: function () {
      //plain text value
      return "<i class='icon-plus'><img style='width: 100%;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEX0lEQVRoge3ZS4xURRQG4G8aYXiIgAq61IQoiBITN0oG8RFXRtywUTesXKBoTPARUPZGdiYuMCobVyobDa5MCGJQfCWQqJgQ45KICcj0NMwLF+e29L1d3X1vd88Qk/mTSqZr6pz6T9U5VafOZQELWEA3jMyBzlFswN1YhxVZfx3n8Dt+xeQczD0w1uEVfI/LuJi1y5jJWrH/JF7G2uvAtw2bcBgNseJXK7Z6JvtZpmvesQaHMiLTPciWadOYwIeZ7nnBNvwtVrIbuUlcKLTJHjINnMfWqqSqBvuLeBvLE/+bFTs0i2M4jj+F0XAL7sBYRnQEN6KW0DWBV/FeRX6lsB/jOrvFF2K3yixODY9kMhPiMEjFz/6hWoDd0kaM4ztsHED3JnGCddK/awDdOWyTPpHqeM1w7qIRvNFlnrFBJ7hZ+HhK+ZM9ZB8UK/1D1k5mfd2wXdqY81jdlwUZDmk/ncoYATuF/zflJrK+XkgZ08D7Fbn/h3sTCseFO5XBTlxqkb2knCGwV3vM1PUZi4flL7sZEdhlY2IQQ0aEO7aeZtMiA6iEddpdagL3VNAxiCFwn7xrNl0smZulLiN4TlxsTcziK/xSgcigOI2jBR4zeCY1uJMhz8rf3nUcGAa7ijggYqWJFYJbG1KGjIptbUUz7ZhvHE303Y8lxc6UIRtwpdB3TPjofGNW5GytuCIebTnckBAuDprCN4W+LeJ47oaHEn3bJFazgFP4tuX3cTyBxQWOp1uFUobcVpisgbOFMe+KM32mB6nlhb93ZK0TFoln8AMtfWczDk1DluD2omDKkJXy1s/in8KYGpZ1IZRCTaTtZca14qL8ybU449hV6H+L1I5cEnGxKPtdw02FMbNiu8u4VnOxZsUF1w2L5FcfVskv+JR2D0kack48SZdmv5dhfWHMbuWCfYdr7jSBT3Gih9ypwu/18m48mXHsic3CL1tTg8/LCBYwaIrSxJECl4sSi5iKkTPiUmzF1g5j5xo17Y+qUVHkaxtYxBXt21vDw0OhVg2Par+If5aoUnZa5Y/lA3MF9gyFWjXskT+y64JbaayVTuOrVAMHjZHN0i/FW1ODO+3IXyLIWo/XUXxkbgrfRdSyuZa29E2L8tH5TgKd8JZ88lgTD6vXB+NYCntFPtXKbxJv9qvwA+niw1MlZPstPjwt7VIHK3LPYY3YylQ5aHsP2X7KQSkjrgpXX9WXBS3Y2kF5XbjAsAp0+7rMs2UIc4AXOkwyjh+1vyirYDN+ki6Z1vH8ALqT2C9tzIzw/yN4TLkMoIbH8aXuRex9ZclVdYtdeEfnzwrjmc6vxcvuD/nPCncKVx3LyK7swGFCfMobKMB7YUwcAP186JnqIdMQgT20mOiF1aIWWy9BrkybynQdNITTqR9sFG+MhnSw9mrNj6GfiOrNdcdavCSqH62foRsitZjO/r7g2ufpE+KBlsydqmIu8qbFYqfuEhWZZvY6Ll52Z/CbcKcFLGAB84R/AcGT59xStT+MAAAAAElFTkSuQmCC'/></i>";
    },
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
      height: "75vh",
      width: "100%",
      pagination: "remote",
      paginationSize: this.paginationSize,
      paginationInitialPage: 20,
      paginationButtonCount: 6,
      paginationSizeSelector: [3, 6, 8, 10],
      movableColumns: true,
      paginationCounter: function (
        pageSize,
        currentRow,
        currentPage,
        totalRows,
        totalPages
      ) {
        this.paginationSize = pageSize;
        console.log(this.paginationSize);
        console.log(
          "Showing " +
            pageSize +
            " rows of " +
            totalRows +
            " total" +
            " currentRow " +
            currentPage +
            " currentRow " +
            currentRow +
            " totalpages " +
            totalPages
        );
        return (
          "Showing " +
          pageSize +
          " rows of " +
          totalRows +
          " total" +
          " currentRow " +
          currentPage +
          " currentRow " +
          currentRow +
          " totalpages " +
          totalPages
        );
      },
      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          hozAlign: "center",
          headerSort: false,
          width: "5px",
          cellClick: function (e, cell) {
            cell.getRow().toggleSelect();
          },
        },
        {
          formatter: this.hideIcon,
          align: "center",
          title: "",
          width: "5px",
          headerSort: false,
          cellClick: function (e, row) {
            const id = row.getData()._id;
            const element = $(".subTable" + id + "");
            element.toggleClass("open");
          },
        },
        {
          title: "Id",
          field: "_id",
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "Index",
          field: "_index",
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "Score",
          field: "_score",
          hozAlign: "center",
          headerHozAlign: "center",
        },
      ],
      rowFormatter: function (row) {
        //create and style holder elements
        var holderEl = document.createElement("div");
        var tableEl = document.createElement("div");
        holderEl.setAttribute("id", "holder");
        tableEl.setAttribute("id", "table2");
        const id = row.getData()._id;
        tableEl.setAttribute("class", "subTable" + id + " closeTable");
        holderEl.appendChild(tableEl);
        row.getElement().appendChild(holderEl);

        holderEl.setAttribute("class", "subTable" + id + " closeTable");
        holderEl.style.boxSizing = "border-box";
        holderEl.style.padding = "10px 30px 10px 10px";
        holderEl.style.borderTop = "1px solid #333";
        holderEl.style.borderBotom = "1px solid #333";
        tableEl.style.border = "1px solid #333";

        holderEl.appendChild(tableEl);

        row.getElement().appendChild(holderEl);
        new Tabulator(tableEl, {
          data: [row.getData()._source],
          autoColumns: true,
          width: "50%",
        });
      },
    });
  },
};
</script>
<style type="scss" >
/* @import  "~tabulator/dist/scss/bootstrap/tabulator_bootstrap4"; */

div#holder {
  background: #898989;
}

.closeTable {
  display: none;
}

.col-xs-12 > .tabulator {
  /* box-shadow: 1.3rem 1rem #959595; */
  border-radius: 2rem;
}
div#table2 {
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem black;
}

i.icon-plus {
  font-weight: bold;
  font-size: 1.1em;
}
.tabulator .tabulator-header .tabulator-col {
  background-color: #424242;
  color: aliceblue;
}
.open {
  display: grid;
}
</style>