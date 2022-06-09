<template>
  <div>
    <b-card>
      <b-card
        :title="this.selectedRow._index"
        :sub-title="this.selectedRow._id"
        class="text-center bg-dark text-white"
      >
        <b-container class="bv-example-row">
          <b-row
            v-for="(index, data) in this.selectedRow._source"
            :key="data.index"
            
          >
            <b-col class="ListCol">
              <b-list-group>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center  text-white bg-myColor "
                >
                  <div class="mx-auto">{{ data?.toString() || "-" }}</div>
                </b-list-group-item>
              </b-list-group></b-col
            >
            <b-col class="ListCol">
              <b-list-group>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center text-white bg-myColor"
                  
                >
                  <div class="mx-auto">
                    {{
                      typeof index == "number"
                        ? index.toString()
                        : index == ""
                        ? "-"
                        : index?.toString() || "-"
                    }}
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ResultCard",
  data() {
    return {};
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
};
</script>
<style>
.ListCol {
  padding: 0;
}
.card {
  overflow: auto;
  max-height: 75vh;
  border: none;
  background-color: #f0f8ff00;
}

.card-body {
  background: linear-gradient(#000000, #2c394f);
  padding: 0.6rem 0.6rem;
}

.bg-myColor{
   background:  #435169;
}
</style>