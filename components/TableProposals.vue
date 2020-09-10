<template>
  <div
    id="fund-table"
    v-if="selectedFundsComputed.length > 0"
    style="height: calc(100% - 280px); overflow: auto;"
  >
    <div class="position-relative">
      <v-data-table
        class="elevation-0 minimal-table caption"
        :headers="headers"
        :items="proposalsTable"
        :items-per-page="-1"
        :search="search"
        hide-default-footer
        dense
      ></v-data-table>
      <div
        class="transparent-gradient pointer-events-none"
        style="position: sticky; bottom: -2px; height: 22%; width: 100%;"
      >
        &nbsp;
      </div>
    </div>
    <v-card width="300" class="pl-4 mt-1 background" elevation="0">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search proposals"
        hide-details
      ></v-text-field>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
