<template>
  <div>
    <!-- <h5>
      Search & compare your fund
    </h5> -->
    <InterfaceFundSearchBar />
    <div v-if="selectedFundsIDs.length > 0" class="mt-4" style="height: 70%;">
      <!-- <h4 class="mt-2">
        Fund details
      </h4> -->
      <div class="my-8">
        <div
          v-for="(fund, indexFund) in selectedFundsComputed"
          class="my-4"
          :key="`fund-label-${indexFund}`"
        >
          <div class="my-1 body-1">
            <span class="font-weight-bold"
              >{{ indexFund + 1 }}. {{ fund.data.fund }}</span
            >
            <div class="body-2">
              voted
              {{ fund.data.e_vote + fund.data.s_vote + fund.data.g_vote }}
              times and supported
              <span class="font-weight-bold e--text">
                {{ fund.data.e_support.toFixed(1) }}%
              </span>
              of environmental,
              <span class="font-weight-bold s--text">
                {{ fund.data.s_support.toFixed(1) }}%
              </span>
              of social and
              <span class="font-weight-bold g--text">
                {{ fund.data.g_support.toFixed(1) }}%
              </span>
              of governance related proposals.
            </div>
          </div>
        </div>
      </div>
      <!-- <h5 class="my-4">
        Shareholder proposals the fund{{
          selectedFundsIDs.length > 1 ? "s" : ""
        }}
        voted on
      </h5> -->
      <v-card width="100%" class=" mt-1 background" elevation="0">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          :label="
            `In the table below – filter the proposals the fund${
              selectedFundsIDs.length > 1 ? 's' : ''
            } voted on`
          "
          hide-details
        ></v-text-field>
      </v-card>
      <div
        id="fund-table"
        v-if="selectedFundsIDs.length > 0"
        class="mt-4 mx-n3"
        style="height: 75%; overflow: auto;"
      >
        <div class="mt-5 position-relative">
          <!-- ! Todo: decide on multi-sort -->
          <!-- multi-sort -->
          <v-data-table
            class="elevation-0 minimal-table caption"
            :headers="headers"
            :items="proposalsTable"
            :items-per-page="-1"
            :item-key="proposalsTable.id"
            :search="search"
            hide-default-footer
            dense
          >
            <!-- <template v-slot:item.fund1Vote="{ item }">
              <v-icon :class="`${item.fund1Vote.toLowerCase()}--text`">
                {{ getIcon(item.fund1Vote) }}
              </v-icon>
            </template> -->
            <template v-slot:item.proposal="{ item }">
              <a :href="item.link" v-if="item.link" target="_blank"
                ><div>
                  {{ item.proposal }}
                  <v-icon v-if="item.link" small style="color: currentColor"
                    >mdi-open-in-new</v-icon
                  >
                </div></a
              >
              <div v-else>{{ item.proposal }}</div>
            </template>

            <template v-slot:item.fund1Vote="{ item }">
              <v-icon :class="`${item.fund1Vote.toLowerCase()}--text`">
                {{ getIcon(item.fund1Vote) }}
              </v-icon>
            </template>
            <template v-slot:item.fund2Vote="{ item }">
              <v-icon :class="`${item.fund2Vote.toLowerCase()}--text`">
                {{ getIcon(item.fund2Vote) }}
              </v-icon>
            </template>
            <template v-slot:item.outcome="{ item }">
              <span
                v-if="item.outcome != '-'"
                :class="
                  `${
                    parseInt(item.outcome) > 50
                      ? 'for--text font-weight-bold'
                      : ''
                  }`
                "
              >
                {{ item.outcome }}&thinsp;%</span
              >
            </template>
          </v-data-table>
          <div
            class="transparent-gradient pointer-events-none"
            style="position: sticky; bottom: -2px; height: 50%; width: 100%;"
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import proposals from "../static/data/proposals.csv";
import bubbleData from "../static/data/bubble_chart.csv";

import { mapState } from "vuex";

import InterfaceFundSearchBar from "../components/InterfaceFundSearchBar.vue";

export default {
  components: {
    InterfaceFundSearchBar
  },
  data() {
    return {
      search: "",
      proposals: proposals,
      data: bubbleData
    };
  },
  computed: {
    selectedFundsIDs() {
      return this.selectedFunds.map(x => x.id);
    },
    selectedFundsComputed() {
      const selectedFundsMapped = this.selectedFunds.map(s => {
        const id = s.id;
        const data = this.data.find(x => x.id == s.id);
        return { id, data };
      });
      return selectedFundsMapped;
    },
    headers() {
      const selected = this.selectedFundsIDs.length;
      // const reactivity = this.reactivity.clickedSameID + this.overlap;
      let headers = [];
      if (this.selectedFunds.length > 0) {
        headers = headers.concat([
          {
            text: "Year",
            value: "year",
            width: "77px"
          },
          { text: "Proposal", value: "proposal", sortable: false },
          { text: "Company", value: "company", width: "110px" },
          { text: "1. Vote", value: "fund1Vote", width: "95px" }
        ]);
        if (this.selectedFunds.length > 1) {
          headers.push({ text: "2. Vote", value: "fund2Vote", width: "95px" });
        }
        headers.push({ text: "Outcome", value: "outcome", width: "105px" });
      }
      return headers;
    },
    proposalsTable() {
      const proposalsLocal = JSON.parse(JSON.stringify(this.proposals));
      const selectedFundsIDsLocal = JSON.parse(
        JSON.stringify(this.selectedFundsIDs)
      );

      const parsedProposals = proposalsLocal.map(x => {
        let parsed = x;
        parsed.funds_for = JSON.parse(x.funds_for);
        parsed.funds_against = JSON.parse(x.funds_against);
        return parsed;
      });

      const filteredProposals = parsedProposals.filter(x => {
        if (selectedFundsIDsLocal.length == 0) {
          return false;
        }
        if (selectedFundsIDsLocal.length == 1) {
          const firstID = selectedFundsIDsLocal[0];
          return (
            x.funds_for.includes(firstID) || x.funds_against.includes(firstID)
          );
        }
        if (selectedFundsIDsLocal.length == 2) {
          const firstID = selectedFundsIDsLocal[0];
          const secondID = selectedFundsIDsLocal[1];
          return (
            x.funds_for.includes(firstID) ||
            x.funds_against.includes(firstID) ||
            x.funds_for.includes(secondID) ||
            x.funds_against.includes(secondID)
          );
        }
      });
      // console.log(JSON.parse(JSON.stringify(filteredProposals)));
      const matchedProposals = filteredProposals.map(p => {
        let matched = p;
        matched.fund1Vote = "–";
        if (this.selectedFundsIDs.length > 0) {
          if (p.funds_for.includes(this.selectedFundsIDs[0])) {
            matched.fund1Vote = "For";
          }
          if (p.funds_against.includes(this.selectedFundsIDs[0])) {
            matched.fund1Vote = "Against";
          }
        }
        if (this.selectedFundsIDs.length > 1) {
          matched.fund2Vote = "–";

          if (p.funds_for.includes(this.selectedFundsIDs[1])) {
            matched.fund2Vote = "For";
          }
          if (p.funds_against.includes(this.selectedFundsIDs[1])) {
            matched.fund2Vote = "Against";
          }
        }
        return matched;
      });
      // console.log(matchedProposals);
      // const ids = matchedProposals.map(x => x.id).sort();
      // console.log(ids);
      return matchedProposals;
    },

    ...mapState({
      selectedFunds: state => state.interfaceFundSearchBar.selectedFunds
    })
  },
  methods: {
    getIcon(vote) {
      if (vote == "For") {
        return "mdi-menu-up";
      }
      if (vote == "Against") {
        return "mdi-menu-down";
      }
      if (vote == "–") {
        return "mdi-minus";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
