<template>
  <v-container>
    <div class="mt-6 mx-7 body-2">
      <h4 class="font-weight-regular">
        We assessed how funds voted on shareholder proposals covering
        <span class="e--text">environmental</span>,
        <span class="s--text">social</span> and
        <span class="g--text">good governance</span> topics across the last 10
        years.
      </h4>
      <div class="main-legend fade mt-9 mx-12 caption text-none">
        <v-row class="pt-0 pb-0" style="border-bottom: 1px dashed grey">
          <v-col cols="3" class="d-flex justify-center align-center">
            <Icon3Circles />
          </v-col>
          <v-col cols="9" class="d-flex  align-center"
            >Each fund has three circles
          </v-col>
        </v-row>
        <v-row class="py-1" style="border-bottom: 1px dashed grey">
          <v-col cols="3" class="d-flex justify-center align-center">
            <IconHighLow />
          </v-col>
          <v-col cols="9" class="d-flex  align-center"
            >A higher position means the fund supported a larger share of
            proposals
          </v-col>
        </v-row>
        <v-row class="py-1" style="border-bottom: 1px dashed grey">
          <v-col cols="3" class="d-flex justify-center align-center">
            <IconManyFew />
          </v-col>
          <v-col cols="9" class="d-flex  align-center"
            >A larger circle indicates that a fund voted more often
          </v-col>
        </v-row>
        <v-row class="py-1" style="border-bottom: 2px solid grey">
          <v-col cols="3" class="d-flex justify-center align-center">
            <Icon3CirclesAverage />
          </v-col>
          <v-col cols="9" class="d-flex  align-center">
            The highlighted circles show the average of all funds
          </v-col>
        </v-row>
        <v-row class="py-1">
          <v-col cols="3" class="d-flex justify-center align-center">
            <IconHover />
          </v-col>
          <v-col cols="9" class="d-flex  align-center"
            >Hover to connect the circles of one fund. <br />
            Click for more details.
          </v-col>
        </v-row>
      </div>
      <div class="mt-6 d-flex justify-center">
        <v-btn
          @click="clickHighlights"
          class="text-none subtitle-2"
          tile
          text
          color="primary"
        >
          <v-icon>mdi-star-circle-outline</v-icon>&nbsp;See the highlights
        </v-btn>
      </div>
      <div class="mt-4 d-flex justify-center">
        <v-btn
          @click="clickSearch"
          class="text-none subtitle-2"
          tile
          outlined
          color="primary"
        >
          <v-icon>mdi-magnify</v-icon>&nbsp;Search your own fund
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import Icon3Circles from "~/components/Icon3Circles.vue";
import IconHighLow from "~/components/IconHighLow.vue";
import IconManyFew from "~/components/IconManyFew.vue";
import IconHover from "~/components/IconHover.vue";
import Icon3CirclesAverage from "~/components/Icon3CirclesAverage.vue";

export default {
  components: {
    Icon3Circles,
    IconHighLow,
    IconManyFew,
    IconHover,
    Icon3CirclesAverage
  },
  methods: {
    clickHighlights() {
      this.$store.commit(
        "interfaceFundSearchBar/ChangeCurrentTab",
        "tab-Highlights"
      );
    },
    clickSearch() {
      this.$store.commit(
        "interfaceFundSearchBar/ChangeCurrentTab",
        "tab-Search & compare"
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
