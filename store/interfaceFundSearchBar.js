export const state = () => ({
  currentTab: "tab-Legend",
  showInterface: false,
  selectedFunds: []
});

export const mutations = {
  ChangeCurrentTab(state, string) {
    state.currentTab = string;
  },
  ChangeSelectedFunds(state, array) {
    state.selectedFunds = array;
  },
  ChangeShowInterface(state, bool) {
    state.showInterface = bool;
  }
};
