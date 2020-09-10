<template>
  <transition name="fade-slow">
    <div class="d-flex align-center">
      <v-autocomplete
        class="mt-3 mb-n4"
        v-model="autocompleteModel"
        @change="changeInput"
        :items="fundsTest"
        item-text="search"
        item-value="id"
        prepend-inner-icon="mdi-magnify"
        color="primary"
        search-input="test"
        clearable
        label="Find up to two funds"
        outlined
        multiple
        chips
        small-chips
        dense
      >
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            :color="fundManagers[item.fund_manager].color"
            class="body-1 font-weight-light white--text"
          >
            <v-icon color="#fff"></v-icon>
          </v-list-item-avatar>
          <!-- {{
              item.fund_is_esg ? "mdi-earth" : ""
            }} -->
          <!-- {{ esgTags[item.fund_is_esg] }} -->
          <v-list-item-content>
            <v-list-item-title
              v-text="fundManagers[item.fund_manager].name"
            ></v-list-item-title>
            <v-list-item-subtitle v-text="item.fund"></v-list-item-subtitle>
            <v-list-item-subtitle
              >({{ item.tickersDisplay }})</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-icon :color="fundManagers[item.fund_manager].color">
              {{ item.fund_is_esg ? "mdi-earth" : "" }}
            </v-icon>

            <span class="caption grey--text">{{
              item.fund_is_esg ? "ESG-promoted" : ""
            }}</span>
          </v-list-item-action>
        </template>
        <template v-slot:selection="{ item }">
          <v-chip
            small
            close
            @click="remove(item)"
            @click:close="remove(item)"
            style="max-width: 46%;"
            outlined
          >
            <div
              style="max-width: 90%; overflow:hidden; text-overflow: ellipsis;"
            >
              {{ item.fund }}
            </div>
          </v-chip>
        </template>
      </v-autocomplete>
    </div>
  </transition>
</template>

<script>
// Todo: replace later
import bubbleData from "../static/data/bubble_chart.csv";

import { mapState } from "vuex";

import ChartBubbleViolinControls from "~/components/ChartBubbleViolinControls.vue";

export default {
  components: { ChartBubbleViolinControls },
  // This controls the opening and closing of the navigation drawer
  data: () => ({
    modelIDs: null,
    funds: bubbleData,
    fundManagers: [
      { name: "BlackRock", color: "#000", icon: "mdi-square" },
      { name: "Vanguard", color: "#9D0022", icon: "mdi-ferry" },
      { name: "State Street", color: "#003285", icon: "mdi-ferry" }
    ],
    esgTags: ["all", "ESG"]
  }),
  computed: {
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll,
      selectedFunds: state => state.interfaceFundSearchBar.selectedFunds,
      showInterface: state => state.interfaceFundSearchBar.showInterface
    }),
    fundsTest() {
      const test = this.funds.map(x => {
        // console.log(x.fund_tickers_sec);
        x.tickers = JSON.parse(x.fund_tickers_sec.replace(/'/g, '"'));
        x.tickersDisplay = x.tickers.join(", ");
        x.search = `${x.fund_manager} ${x.fund} ${
          x.fund_all_names
        } ${x.tickers.join(" ")} ${x.fund_is_esg ? "esg" : ""}`;
        return x;
      });
      return test;
    },
    autocompleteModel: {
      set(array) {
        // console.log(array);
        // Fund is already selected

        let arrayCopy = array;
        if (arrayCopy.length > 2) {
          arrayCopy.shift();
        }
        const arrayWithCategory = arrayCopy.map(x => {
          let indexCategory = 0;
          const matchWithCurrent = this.selectedFunds.find(s => s.id == x);
          if (matchWithCurrent) {
            indexCategory = matchWithCurrent.indexCategory;
          } else {
            // console.log("happened");
            const possibleCategories = [0, 1, 2];
            const usedCategories = this.selectedFunds.map(x => x.indexCategory);
            const openCategories = possibleCategories.filter(
              x => usedCategories.indexOf(x) === -1
            );
            // console.log(openCategories);
            indexCategory = openCategories[0];
            // console.log(indexCategory);
          }
          return {
            id: x,
            indexCategory: indexCategory
          };
        });
        this.$store.commit(
          "interfaceFundSearchBar/ChangeSelectedFunds",
          arrayWithCategory
        );
      },
      get() {
        return this.selectedFunds.map(x => x.id);
      }
    }
  },
  mounted() {
    // console.log(this.funds);
  },
  methods: {
    changeInput() {
      // console.log(this.modelIDs);
      // console.log(this.selectedFunds);
    },
    remove(item) {
      // console.log(item);
      let selectedFundsLocal = JSON.parse(JSON.stringify(this.selectedFunds));
      const foundIndex = selectedFundsLocal.findIndex(x => x.id === item.id);
      selectedFundsLocal.splice(foundIndex, 1);
      this.$store.commit(
        "interfaceFundSearchBar/ChangeSelectedFunds",
        selectedFundsLocal
      );
    }
  }
};
</script>
