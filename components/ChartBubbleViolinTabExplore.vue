<template>
  <div>
    <!-- <h2>
      Chart options…
    </h2> -->
    <p class="body-2 grey--text">
      Try out these options to change the graph
    </p>
    <v-row justify="center">
      <ChartBubbleViolinControls />
    </v-row>
  </div>
</template>

<script>
import ChartBubbleViolinControls from "../components/ChartBubbleViolinControls.vue";
export default { components: { ChartBubbleViolinControls } };
</script>

<style lang="scss" scoped></style>
