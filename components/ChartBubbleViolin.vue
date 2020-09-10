<template>
  <v-container
    class="position-relative fade"
    fluid
    v-resize="onResize"
    :style="`opacity: ${reactivity.simulations > 0 ? 1 : 0};`"
  >
    <v-row class="px-8">
      <v-col cols="10">
        <!-- <div :style="`margin-left: ${margin.left}px`"> -->
        <div :style="`margin-left: ${margin.left}px`">
          <h2 class="title font-weight-bold text--secondary">
            Support of funds voting on shareholder proposals (2009 – 2019)
            <!-- <span class="font-weight-regular">
              Break down by topic covered in the proposal:
              <span class="e--text">Environmental</span>,
              <span class="s--text">social</span> or
              <span class="g--text">good governance</span>. (2009 – 2019)
            </span> -->
          </h2>
        </div>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <v-row class="mt-2 px-8 position-relative">
      <!-- Brush part -->
      <v-col id="brush-column" class="pr-3 " cols="1">
        <div
          class="d-flex justify-end"
          :style="`height:${yAxisCategoryLabelsHeight}px`"
        >
          <div class="d-flex justify-end" :style="`width:${brushWidth}px`">
            <div class="d-flex justify-center flex-column">
              <v-icon color="grey">mdi-magnify-scan</v-icon>
              <div class="subtitle-2 grey--text text-lighten-1">Zoom</div>
            </div>
          </div>
          <!-- magnifier top -->
        </div>
        <div
          class="position-absolute-tl0 d-flex align-center"
          :style="
            ` transform-origin: bottom left; transform: translateY(${this.scale.y.static(
              0
            ) +
              yAxisCategoryLabelsHeight +
              5}px) translateX(64px) rotate(-90deg)`
          "
        >
          <span class="font-weight-regular">Support&nbsp;</span>
          as a share of proposals the fund voted on (%)
        </div>
        <div class="position-relative d-flex justify-end">
          <svg id="brush" :width="brushSVGWidth" :height="svgHeight">
            <g
              :style="
                `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
              "
              class="margins"
            >
              <g class="axis-and-grid">
                <g class="axis y-axis" v-axis:y="scale" />
                <line x1="0" :x2="brushWidth" class="horizontal-line" />
                <g :style="`transform:translateY(${height}px)`">
                  <line
                    x1="0"
                    :x2="brushWidth"
                    class="horizontal-line line-bold"
                  />
                </g>
              </g>
              <path :d="brushHistogram" class="grey-light--fill" />
              <!-- <path
                v-for="(category, indexCategory) in violinAreas"
                :class="
                  `violin ${category.category}--fill ${category.category}--stroke`
                "
                :d="category.path"
              /> -->
            </g>
            <!-- Brush area on mounted -->
          </svg>
        </div>
      </v-col>
      <v-col
        id="bubble-chart-content"
        cols="6"
        style="height: calc(100vh - 160px)"
      >
        <!-- <v-btn @click="test">Test</v-btn> -->
        <div :class="`${chartClass} position-relative `">
          <!-- :style="`width: ${width}px; transform: translateX(${margin.left}px);`" -->
          <div blue :style="`height:${yAxisCategoryLabelsHeight}px`">
            <!-- <div class="body-2">{{ yAxisLabel }}</div> -->
            <div
              class="d-flex align-center category-labels"
              :style="`height: 100%; transform: translateX(${margin.left}px)`"
            >
              <div class="position-relative category-labels">
                <div
                  v-for="(category, indexCategory) in categoriesDetails"
                  :key="`category-tick-${indexCategory}`"
                  :style="
                    `position: absolute; top: 50%; transform: translateX(${scale.x(
                      category.code
                    )}px) translateY(-50%);`
                  "
                >
                  <v-tooltip color="white" bottom>
                    <template v-slot:activator="{ on }">
                      <div
                        v-on="on"
                        class="d-flex align-center flex-column"
                        :style="`transform: translateX(${-50}%)`"
                      >
                        <component :is="`Icon${category.code.toUpperCase()}`" />
                        <div class="subtitle-2">
                          {{ category.title }}
                        </div>
                      </div>
                    </template>
                    <div class="subtitle-2" style="color:black">
                      Shareholder proposals theme
                    </div>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="position-relative">
            <svg
              @click="onClickSVGClearSelection"
              id="bubble-chart"
              :width="svgWidth"
              :height="svgHeight"
            >
              <defs>
                <clipPath id="clip">
                  <rect :width="width" :height="height + clipGradientHeight" />
                </clipPath>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0" />
                  <stop
                    offset="100%"
                    style="stop-color:#ffffff;stop-opacity:1"
                  />
                </linearGradient>
                <pattern
                  id="pattern-stripe"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(90)"
                >
                  <rect
                    width="2"
                    height="4"
                    transform="translate(0,0)"
                    fill="black"
                  />
                </pattern>
              </defs>
              <!-- Margin convention -->
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="margins"
              >
                <!-- Labels -->
                <!-- Axis and grid -->
                <g class="axis-and-grid">
                  <g class="axis big-ticks y-axis" v-axis:y.zoom="scale" />
                </g>
              </g>
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="center clipped"
              >
                <!-- Bubble chart -->

                <path
                  v-if="hover"
                  :d="hoverFund.connectionPath"
                  class="connecting-path"
                />
                <!-- <path
                  v-for="(fund, indexFund) in nodesFlat"
                  :key="`fund-label-${indexFund}`"
                  v-show="hover && fund.id == hoverFund.id"
                  :d="
                    getConnectionPath([
                      { x: 0, y: fund.id },
                      { x: 100, y: fund.id }
                    ])
                  "
                  class="connecting-path"
                /> -->

                <transition-group tag="g" name="fade">
                  <path
                    v-for="(selectedFund,
                    indexSelectedFund) in selectedFundsComputed"
                    :key="`selectedFund-connector-${indexSelectedFund}`"
                    :d="getConnectionPath(selectedFund.nodes)"
                    class="connecting-path transition--all"
                  />
                </transition-group>

                <g
                  v-for="(fund, indexFund) in nodesFlat"
                  :key="`bubble-${indexFund}`"
                  :style="
                    `transform: translateX(${fund.x}px) translateY(${fund.y}px)`
                  "
                  class="transition--all"
                >
                  <circle
                    :cx="0"
                    :cy="0"
                    :r="scale.sizes[fund.category](fund[`${sizeProperty}`])"
                    :class="getBubbleClass(fund)"
                    @mouseenter="mouseEnterFundBubble(fund)"
                    @mouseleave="mouseLeaveFundBubble(fund, $event)"
                    @click="
                      onClickFundBubble(fund.id, $event, fund.indexCategory)
                    "
                  />

                  <text
                    v-if="hover && hoverFund.id == fund.id"
                    :class="`bubble-label ${fund.category}--fill`"
                    :style="`text-anchor: middle; transform: translateY(30px)`"
                  >
                    {{ fund.support ? fund.support.toFixed(1) : 0 }}%
                  </text>
                </g>

                <!-- Average connecting path -->
                <path
                  :d="getConnectionPath(averagePerCategory)"
                  :class="`connecting-path average transition--opacity`"
                />

                <g class="averages">
                  <g
                    v-for="(average, indexAverage) in averagePerCategory"
                    :key="`averages-${indexAverage}`"
                    :style="
                      `transform: translateX(${average.x}px) translateY(${average.y}px)`
                    "
                    class="transition--all"
                  >
                    <circle
                      :cx="0"
                      :cy="0"
                      :r="scale.sizes[average.category](average[sizeProperty])"
                      :class="
                        `average ${hoverAverageAll ? 'hover' : 'non-hover'} ${
                          average.category
                        }--fill secondary--fill ${
                          overlap ? '' : 'no-overlap'
                        }  transition--all`
                      "
                      @mouseenter="mouseEnterAverageAllBubble(average, $event)"
                      @mouseleave="mouseLeaveAverageAllBubble(average, $event)"
                    />
                    <transition name="fade">
                      <text
                        v-if="hoverAverageAll"
                        :class="`bubble-label-average`"
                        :style="
                          `transform: translateX(-${scale.sizes[
                            average.category
                          ](average[`${sizeProperty}`]) * 1.6}px)`
                        "
                      >
                        {{ average.support.toFixed(1) }}&thinsp;%
                      </text>
                    </transition>
                    <!--<text v-if="indexAverage == 2" class="average-label stroke">
                      <tspan x="6px" y="-4px">Average</tspan>
                      <tspan x="6px" y="11px">of all funds</tspan>
                    </text>
                     <text
                      v-if="indexAverage == 2"
                      :class="
                        `average-label ${
                          hoverAverageAll ? 'hover' : 'non-hover'
                        } transition--all`
                      "
                    >
                      <tspan x="6px" y="-4px">Average</tspan>
                      <tspan x="6px" y="11px">of all funds</tspan>
                    </text> -->
                  </g>
                </g>
              </g>
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="margins"
              >
                <line x1="0" :x2="width" class="horizontal-line" />
                <g :style="`transform:translateY(${height}px)`">
                  <rect
                    :width="width"
                    :height="clipGradientHeight"
                    fill="url(#grad)"
                  />
                  <line x1="0" :x2="width" class="horizontal-line line-bold" />
                </g>
              </g>
            </svg>
            <!-- tooltips -->

            <div
              class="tooltips position-absolute-tl0"
              :style="
                `width: ${width}px; height: ${height + 100}px; 
                transform: translateX(${margin.left}px) translateY(${
                  margin.top
                }px); 
                pointer-events:none;`
              "
            >
              <ChartBubbleViolinTooltipReusable
                v-for="(node, indexNode) in selectedFundsComputed"
                :key="`tooltip-${indexNode}`"
                :x="node.coordinates.x"
                :y="
                  node.coordinates.y -
                    scale.sizes[categories[node.indexCategory]](
                      node.data[`${categories[node.indexCategory]}_vote`]
                    ) *
                      1.05 -
                    10
                "
                :content="node.data.fund"
                :label="(indexNode + 1).toString() + '. '"
              />
              <!-- <transition name="fade"> -->
              <ChartBubbleViolinTooltipReusable
                v-if="hover && !selectedFundsIDs.includes(hoverFund.id)"
                :x="hoverFund.x"
                :y="hoverFund.y - hoverFund.size * 1.05 - 10"
                :content="hoverFund.fund"
                label=""
              />
              <!-- </transition> -->
            </div>
            <transition name="fade">
              <div
                v-if="expandManagers"
                class="manager-labels position-absolute-tl0"
                :style="
                  `width: ${width}px; height: ${height + 100}px; 
                transform: translateX(${margin.left}px) translateY(${
                    margin.top
                  }px); 
                pointer-events:none; overflow-y: hidden;`
                "
              >
                <div
                  v-for="category in categories"
                  :key="`label-${category}`"
                  class="position-absolute-tl0"
                  :style="
                    `transform: translateX(${scale.x(
                      category
                    )}px) translateY(${height + 10}px)`
                  "
                >
                  <div
                    v-for="(manager, indexManager) in fundManagers"
                    :key="`label-${manager}`"
                    class="position-absolute-tl0 caption text-none"
                    :style="
                      `transform: translateX(${-spread +
                        spread * indexManager}px)`
                    "
                  >
                    <div
                      :style="
                        `transform-origin: top right; transform: translateX(${-115}%) rotate(-90deg); line-height:1.1`
                      "
                      :class="`${category}--text`"
                    >
                      {{ manager }}
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <!-- <div>Mobile carousel interface</div> -->
        </div>
      </v-col>
      <v-col cols="5" id="tabs" class="pa-0">
        <v-tabs
          v-model="tabModel"
          background-color="#fff"
          grow
          class="pa-1 elevation-0"
        >
          <v-tabs-slider
            color="#707070"
            height="1"
            style="height:1px"
          ></v-tabs-slider>

          <v-tab
            v-for="(tab, indexTab) in tabs"
            :key="tab"
            :href="`#tab-${tab}`"
            class="mt-3 mx-1 subtitle-2 text-none"
            active-class="elevation-3"
          >
            <v-icon small>{{ tabIcons[indexTab] }}</v-icon
            >&nbsp;
            {{ tab }}
          </v-tab>

          <v-tab-item
            v-for="(tab, indexTab) in tabs"
            :key="tab"
            :value="'tab-' + tab"
            class="px-1"
          >
            <v-card tile elevation="3">
              <component
                class="pa-7 pt-6"
                :style="`height: ${height + 80}px; overflow: auto;`"
                :is="tabComponents[indexTab]"
              />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import * as d3 from "d3";
const d3 = require("d3");
const manyBodySampled = require("d3-force-sampled");

import bubbleData from "../static/data/bubble_chart.csv";
import proposals from "../static/data/proposals.csv";

import { mapState } from "vuex";

import IconE from "~/components/IconE.vue";
import IconS from "~/components/IconS.vue";
import IconG from "~/components/IconG.vue";
import ChartBubbleViolinControls from "~/components/ChartBubbleViolinControls.vue";
import ChartBubbleViolinTooltipReusable from "~/components/ChartBubbleViolinTooltipReusable.vue";
import ChartBubbleViolinTabLegend from "~/components/ChartBubbleViolinTabLegend.vue";
import ChartBubbleViolinTabHighlights from "~/components/ChartBubbleViolinTabHighlights.vue";
import ChartBubbleViolinTabSearch from "~/components/ChartBubbleViolinTabSearch.vue";
import ChartBubbleViolinTabExplore from "~/components/ChartBubbleViolinTabExplore.vue";

// import ChartHalfHexagonReusable from "~/components/ChartHalfHexagonReusable.vue";

export default {
  components: {
    IconE,
    IconS,
    IconG,
    ChartBubbleViolinControls,
    ChartBubbleViolinTooltipReusable,
    ChartBubbleViolinTabLegend,
    ChartBubbleViolinTabHighlights,
    ChartBubbleViolinTabSearch,
    ChartBubbleViolinTabExplore
    // ChartHalfHexagonReusable,
  },
  props: {
    chartClass: {
      type: String,
      default: "chart-bubble"
    },
    bubbleClass: {
      type: String,
      default: "bubble"
    },
    svgHeightProp: {
      type: Number,
      default: 560
    },
    svgWidthProp: {
      type: Number,
      default: 900
    },
    margin: {
      type: Object,
      default() {
        return { top: 20, left: 52, bottom: 50, right: 20 };
      }
    },
    brushMargin: {
      type: Object,
      default() {
        return { top: 20, left: 45, bottom: 50, right: 2 };
      }
    },
    categories: {
      type: Array,
      default() {
        return ["cat1", "cat2", "cat3"];
      }
    },
    categoriesDetails: {
      type: Array,
      default() {
        return [
          { code: "cat1", title: "Category 1", color: "#000" },
          { code: "cat2", title: "Category 2", color: "#f55" },
          { code: "cat3", title: "Category 3", color: "#f99" }
        ];
      }
    },
    xAxisLabel: {
      type: String,
      default: "Category"
    },
    yProperty: {
      type: String,
      default: "y"
    },
    yAxisLabel: {
      type: String,
      default: "PropY"
    },
    sizeProperty: {
      type: String,
      default: "size"
    },
    sizeDomain: {
      type: Array,
      default() {
        return [0, 100];
      }
    },
    sizeRange: {
      type: Array,
      default() {
        return [1, 10];
      }
    },
    sizeScalePerCategoryProp: {
      type: Boolean,
      default: true
    },

    customYDomain: {
      type: Array,
      default() {
        return [];
      }
    },
    customYDomain: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  directives: {
    axis(el, binding) {
      // console.log(binding); // the scale object

      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];

      if (binding.arg == "y") {
        const zoom = binding.modifiers.zoom;
        let width = binding.value[axis].brushWidth;
        let scale = binding.value[axis].static;
        let numberOfTicks = 4;

        if (zoom) {
          numberOfTicks = 3;
          scale = binding.value[axis].zoom;
          width = binding.value[axis].width;
        }
        const ticks = d3
          .select(el)
          .call(
            d3[axisMethod](scale)
              .tickFormat(d => `${d} %`)
              .ticks(numberOfTicks)
            // .tickValues(tickValues)
          )
          .selectAll(".tick");
        // stlying in css
        // console.log(width);
        ticks.select("line").attr("x1", () => width);
        ticks.select("text").attr("transform", () => "translate(4,0)");
      } else {
        const scale = binding.value[axis];
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    }
  },
  data() {
    return {
      data: bubbleData,
      proposals: proposals,
      isHydrated: false,
      reactivity: { brushed: 0, resized: 0, clickedSameID: 0, simulations: 0 },
      simulations: [],
      nodes: [],
      coords: [],
      sizeScalePerCategoryComponent: null,
      forcesOverlap: {
        manyBody: 0,
        x: 0.3,
        y: 20,
        collision: 0,
        collisionIterations: 0
      },
      forcesNoOverlap: {
        manyBody: -50,
        x: 4,
        y: 25,
        collision: 0.8,
        collisionIterations: 4
      },
      circlePadding: 15,
      fundManagers: ["BlackRock", "Vanguard", "State Street"],
      hover: false,
      hoverFund: null,
      hoverAverageAll: false,
      yAxisCategoryLabelsHeight: 19,
      svgWidth: this.svgWidthProp,
      svgHeight: this.svgHeightProp,
      resizing: false,
      yZoom: {},
      brushSVGWidth: 95,
      clipGradientHeight: 10,
      search: "",
      currentProposals: [
        {
          year: 2009,
          proposal: "Report on climate change impact",
          company: "Amazon",
          fund1Vote: "For",
          fund2Vote: "Against",
          outcome: "passed"
        }
      ],
      tabs: ["Legend", "Highlights", "Search & compare", "Settings"],
      tabComponents: [
        "ChartBubbleViolinTabLegend",
        "ChartBubbleViolinTabHighlights",
        "ChartBubbleViolinTabSearch",
        "ChartBubbleViolinTabExplore"
      ],
      tabIcons: [
        "mdi-map-legend",
        "mdi-star-circle-outline",
        "mdi-magnify",
        "mdi-tune"
      ]
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    brushWidth() {
      const calculatedWidth =
        this.brushSVGWidth - this.brushMargin.right - this.brushMargin.left;
      const width = calculatedWidth > 0 ? calculatedWidth : 0;
      return width;
    },
    dataPerCategory() {
      const dataPerCategory = this.categories.map((c, i) =>
        this.data.map(d => {
          let newObject = {};
          for (const key of Object.keys(d)) {
            if (key.startsWith(c)) {
              newObject[key.slice(2)] = d[key];
            }
            if (key.startsWith("fund") || key.startsWith("id")) {
              newObject[key] = d[key];
              newObject.category = c;
              newObject.indexCategory = i;
            }
          }
          return newObject;
        })
      );
      return dataPerCategory;
    },
    averagePerCategory() {
      let averagePerCategory = {};

      //
      const totalSizePerCategory = this.dataPerCategory.map(x =>
        x.map(y => y[this.sizeProperty]).reduce((a, b) => a + b)
      );
      //
      const averagePerCategorySizeProperty = totalSizePerCategory.map(
        (x, i) => x / this.dataPerCategory[i].length
      );
      //
      const averagePerCategoryYProperty = this.dataPerCategory.map(
        (x, i) =>
          x
            .map(y => y[this.yProperty] * y[this.sizeProperty])
            .reduce((a, b) => a + b) / totalSizePerCategory[i]
      );

      const averages = this.categories.map((x, i) => {
        let newObject = {};
        newObject["category"] = x;
        newObject["x"] = this.scale.x(x);
        newObject[this.yProperty] = averagePerCategoryYProperty[i];
        newObject["y"] = this.yZoom(averagePerCategoryYProperty[i]);
        newObject[this.sizeProperty] = averagePerCategorySizeProperty[i];
        return newObject;
      });

      return averages;
    },
    maxSizePropertyPerCategory() {
      return this.dataPerCategory.map(x =>
        Math.max(...x.map(y => y[this.sizeProperty]))
      );
    },
    maxSizePropertyAllCategories() {
      return Math.max(...this.maxSizePropertyPerCategory);
    },
    sizeScalePerCategory() {
      if (this.sizeScalePerCategoryComponent === null) {
        return this.sizeScalePerCategoryProp;
      } else {
        return this.sizeScalePerCategoryComponent;
      }
    },
    scale() {
      const x = d3
        .scaleBand()
        .domain(this.categories)
        .rangeRound([0, this.width])
        // centers the bubble
        .paddingInner(1)
        .paddingOuter(0.5);

      let y = {};
      y.zoom = this.yZoom;
      y.static = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, 100]);

      y.width = this.width;
      y.brushWidth = this.brushWidth;
      // y.tickValues = this.niceYAxis.tickValues;

      let sizeScales = [];
      for (
        let index = 0;
        index < this.maxSizePropertyPerCategory.length;
        index++
      ) {
        const element = this.sizeScalePerCategory
          ? this.maxSizePropertyPerCategory[index]
          : this.maxSizePropertyAllCategories;

        let scale = d3
          .scaleSqrt()
          .domain([0, element])
          .rangeRound([this.sizeRange[0], this.sizeRange[1]]);
        sizeScales.push(scale);
      }

      // Convert two arrays to an object:
      // https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays/39128130
      let sizes = Object.assign(
        ...this.categories.map((k, i) => ({ [k]: sizeScales[i] }))
      );

      return { x, y, sizes };
    },
    spread() {
      return (
        (this.width / (this.categories.length * this.fundManagers.length)) * 0.8
      );
    },
    brush() {
      const brush = d3
        .brushY()
        .handleSize(20)
        .extent([
          [0, 0],
          [this.brushWidth, this.height]
        ])
        .on("end", this.brushed);
      return brush;
    },
    brushHistogram() {
      const histogram = d3
        .histogram()
        .domain([0, 100])
        .thresholds(this.scale.y.static.ticks(100))
        .value(d => d);
      const support = this.nodesFlat.map(x => x.support);

      const bins = histogram(support);
      const binsLengths = bins.map(x => x.length);
      const maxLength = Math.max(...binsLengths);

      const xScale = d3
        .scalePow()
        .exponent(0.7)
        // .domain([-maxBinLength, maxBinLength]) // for mirrored / both sides
        .domain([0, maxLength]) // one side
        .range([0, this.brushSVGWidth]);

      const yScale = this.scale.y.static;

      const area = d3
        .area()
        // .x0(d => xScale(-d.length)) // for mirrored / both sides
        .x0(d => xScale(0)) // one side
        .x1(d => xScale(d.length))
        .y(d => yScale(d.x0))
        .curve(d3.curveStep);

      const path = area(bins);

      return path;
    },
    violinAreas() {
      const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      // Not weighted

      const supportAverage = this.data.map(x =>
        parseFloat(
          arrAvg(this.categories.map(c => x[`${c}_${this.yProperty}`])).toFixed(
            2
          )
        )
      );

      const histogram = d3
        .histogram()
        .domain([0, 100])
        .thresholds(this.scale.y.static.ticks(100))
        .value(d => d);

      const supportPerCategory = this.categories.map(c =>
        this.data.map(x => x[`${c}_${this.yProperty}`])
      );

      const histogramsPerCategory = supportPerCategory.map((x, i) => ({
        category: this.categories[i],
        histogram: histogram(x)
      }));

      const maxBinLength = Math.max(
        ...histogramsPerCategory.map(h =>
          Math.max(...h.histogram.map(bin => bin.length))
        )
      );
      // console.log(maxBinLength);
      const maxBinLengths = histogramsPerCategory.map(h =>
        Math.max(...h.histogram.map(bin => bin.length))
      );
      const binLengths = histogramsPerCategory.map(h =>
        h.histogram.map(bin => bin.length)
      );

      const xScale = d3
        .scalePow()
        .exponent(0.5)
        // .domain([-maxBinLength, maxBinLength]) // for mirrored / both sides
        .domain([0, maxBinLength]) // one side
        .range([0, this.brushSVGWidth]);

      const yScale = this.scale.y.static;

      const area = d3
        .area()
        // .x0(d => xScale(-d.length)) // for mirrored / both sides
        .x0(d => xScale(0)) // one side
        .x1(d => xScale(d.length))
        .y(d => yScale(d.x0))
        .curve(d3.curveBasis);

      // return area(histogram(supportAverage));
      return histogramsPerCategory.map((h, i) => ({
        category: h.category,
        path: area(histogram(h.histogram)),
        maxBinLength: maxBinLengths[i],
        binLenghts: binLengths[i]
      }));
    },
    forces() {
      if (this.overlap) {
        return this.forcesOverlap;
      } else {
        return this.forcesNoOverlap;
      }
    },
    selectedFundsModel: {
      set(array) {
        this.$store.commit("interfaceFundSearchBar/ChangeSelectedFunds", array);
      },
      get() {
        return this.selectedFunds;
      }
    },
    selectedFundsComputed() {
      const reactivity =
        this.reactivity.brushed +
        this.reactivity.resized +
        this.reactivity.clickedSameID +
        this.overlap;

      const selectedFundsMapped = this.selectedFunds.map(s => {
        // console.log(s);
        const id = s.id;
        const indexCategory = s.indexCategory;
        // console.log(s.id);
        const node = this.nodes[s.indexCategory].find(x => x.id === s.id);
        const coordinates = { x: node.x, y: node.y };
        const nodes = this.nodes.map(x => x.find(y => y.id == s.id));
        const data = this.data.find(x => x.id == s.id);
        return { id, indexCategory, coordinates, nodes, data };
      });
      return selectedFundsMapped;
    },
    selectedFundsIDs() {
      return this.selectedFunds.map(x => x.id);
    },
    headers() {
      const selected = this.selectedFundsIDs.length;
      const reactivity = this.reactivity.clickedSameID + this.overlap;
      let headers = [];
      if (this.selectedFunds.length > 0) {
        headers = headers.concat([
          {
            text: "Year",
            value: "year",
            width: "80px"
          },
          { text: "Proposal", value: "proposal" },
          { text: "Company", value: "company", width: "110px" },
          { text: "1", value: "fund1Vote", width: "60px" }
        ]);
        if (this.selectedFunds.length > 1) {
          headers.push({ text: "2", value: "fund2Vote", width: "60px" });
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
      // console.log(parsedProposals);
      const filteredProposals = selectedFundsIDsLocal.map(s =>
        parsedProposals.filter(
          x => x.funds_for.includes(s) || x.funds_against.includes(s)
        )
      );
      const flatProposals = filteredProposals.flat();
      // console.log(filteredProposals);
      const matchedProposals = flatProposals.map(p => {
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

      return matchedProposals;
    },
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll,
      selectedFunds: state => state.interfaceFundSearchBar.selectedFunds,
      currentTab: state => state.interfaceFundSearchBar.currentTab
    }),
    tabModel: {
      set(string) {
        this.$store.commit("interfaceFundSearchBar/ChangeCurrentTab", string);
      },
      get() {
        return this.currentTab;
      }
    },
    overlap() {
      return this.toggleAll.includes(1);
    },
    expandManagers() {
      return this.toggleAll.includes(2);
    },
    nodesFlat() {
      return this.nodes.flat();
    }
  },
  watch: {
    overlap(change, old) {
      // console.log("overlap changed");
      this.simulationsDefine();
      this.simulationsRun();
    },
    expandManagers(change, old) {
      // console.log("expandManagers changed");
      this.simulationsDefine();
      this.simulationsRun();
    },
    svgWidth() {
      // console.log("svgWidth changed");
      // if (this.reactivity.resized > 1) {
      //   this.simulationsDefine();
      //   this.simulationsRun();
      // }
    },
    yZoom() {
      // console.log("yZoom changed");
      // console.log(this.reactivity);
      if (this.reactivity.resized > 0) {
        this.simulationsDefine();
        this.simulationsRun();
      }
    },
    nodesFlat() {
      // console.log("nodes changed");
    }
  },
  methods: {
    getNiceYDomainEnd(num) {
      const dividedByFour = num / 4;
      const wholeNumber = Math.trunc(dividedByFour);
      const numString = wholeNumber.toString();
      const firstDigit = parseInt(numString[0]);
      const plusOne = firstDigit + 1;
      const numOfDigits = numString.length;
      const newYDomainEnd = plusOne * Math.pow(10, numOfDigits - 1) * 4;
      const yDomainEnd = isNaN(newYDomainEnd) ? 0 : newYDomainEnd;
      return yDomainEnd;
    },
    simulationsDefine() {
      // console.log("simulations are running");
      let arrayOfSimulations = [];

      // Simulation parameters
      const that = this;
      let alpha = 1; // Starting point, alpha is the "ticks" unit or counter // default: 1, range: [0,1]
      let alphaDecay = 0.045; // Acceleration of the animation // default: 0.0288, range [0,1]
      let alphaMin = 0.003; // Target! // default: 0.001, range [0,1]
      let velocityDecay = 0.6; // Friction or "mass" // default: 0.4, range [0,1]

      for (let index = 0; index < this.categories.length; index++) {
        // Define a simulation
        let simulation = d3
          .forceSimulation(this.nodes[index])
          .alpha(alpha)
          .alphaDecay(alphaDecay)
          .alphaMin(alphaMin)
          .alphaTarget(0)
          .velocityDecay(velocityDecay)
          // .force(
          //   "charge",
          //   // d3
          //   //   .forceManyBody()
          //   manyBodySampled
          //     .forceManyBodySampled()
          //     .strength(that.forces.manyBody)
          //   // .theta(0.7) // accuracy, default: 0.9
          //   // .distanceMin(1)
          //   // .distanceMax(600)
          // )
          .force(
            "x",
            d3
              .forceX()
              .strength(that.forces.x)
              .x(function(d) {
                if (that.expandManagers) {
                  let spread =
                    that.width /
                    (that.categories.length * that.fundManagers.length);
                  spread *= 0.8;
                  return (
                    that.scale.x(d.category) -
                    that.spread +
                    that.spread * d.fund_manager
                  );
                } else {
                  return that.scale.x(d.category);
                }
              })
          )
          .force(
            "y",
            d3
              .forceY()
              .strength(that.forces.y)
              .y(function(d) {
                return that.yZoom(d[`${that.yProperty}`]);
              })
          )
          .force(
            "collision",
            d3
              .forceCollide()
              .radius(function(d) {
                return that.scale.sizes[d.category](
                  d[`${that.sizeProperty}`] + that.circlePadding
                );
              })
              .strength(that.forces.collision)
              .iterations(that.forces.collisionIterations)
          )
          // .on("tick", this.ticked)
          // .on("end", this.ended)
          .stop();
        arrayOfSimulations.push(simulation);
      }

      this.simulations = arrayOfSimulations;
    },
    simulationsRun() {
      // console.time("run simulation");
      for (const simulation of this.simulations) {
        for (
          var i = 0,
            n = Math.ceil(
              Math.log(simulation.alphaMin()) /
                Math.log(1 - simulation.alphaDecay())
            );
          i < n;
          ++i
        ) {
          simulation.tick();
        }
      }
      this.reactivity.simulations++;
      // console.timeEnd("run simulation");
    },
    simulationsUpdateCoordinates() {
      this.coords = [];
      let coordsPerCategory = [];
      for (const category of this.dataPerCategory) {
        let coordsInCategory = [];
        for (let index = 0; index < category.length; index++) {
          const node = category[index];
          coordsInCategory.push({
            x: node.x,
            y: node.y
          });
        }
        coordsPerCategory.push(coordsInCategory);
      }
    },
    onClick(event) {
      // console.log(event);
    },
    getBubbleClass(fund) {
      let string = `bubble`;
      if (this.hoverAverageAll) {
        string += " muted";
        return string;
      }
      if (
        this.showManager.includes(fund.fund_manager) &&
        this.showESG.includes(fund.fund_is_esg)
      ) {
        string += ` ${fund.category}--fill`;
      }
      if (this.selectedFundsIDs.length > 0) {
        if (this.selectedFundsIDs.includes(fund.id)) {
          string += " highlighted";
          return string;
        } else {
          if (this.hover) {
            if (fund.id == this.hoverFund.id) {
              string += " highlighted";
              return string;
            } else {
              string += " muted";
              return string;
            }
          } else {
            string += " muted";
            return string;
          }
        }
      } else {
        if (this.hover) {
          if (fund.id == this.hoverFund.id) {
            string += " highlighted";
            return string;
          } else {
            string += " muted";
            return string;
          }
        }
      }
      return string;
    },

    mouseEnterFundBubble(fund) {
      // console.log(fund);
      this.hoverFund = null;

      this.hover = true;
      const localID = fund.id;
      this.hoverFund = fund;
      if (!this.hover) {
        return null;
      }
      if (this.hoverFund.id != localID) {
        return null;
      }
      this.hoverFund.size = this.scale.sizes[fund.category](fund.vote);
      let nodes = [];
      // console.log(this.nodesFlat);
      for (let index = 0; index < this.nodesFlat.length; index++) {
        const node = this.nodesFlat[index];
        if (!this.hover) {
          break;
        }
        if (this.hoverFund.id != localID) {
          break;
        }
        if (node.id == fund.id) {
          nodes.push(node);
        }
      }
      if (!this.hover) {
        return null;
      }
      if (this.hoverFund.id != localID) {
        return null;
      }
      // console.log(nodes);
      this.hoverFund.nodes = nodes;
      this.hoverFund.connectionPath = this.getConnectionPath(nodes);
    },
    mouseLeaveFundBubble(element, event) {
      this.hover = false;
      this.hoverFund = null;
    },
    mouseEnterAverageAllBubble(average, event) {
      this.hoverAverageAll = true;
    },
    mouseLeaveAverageAllBubble(average, event) {
      this.hoverAverageAll = false;
    },
    onClickFundBubble(id, event, indexCategory) {
      // console.log(this.$refs.tab[2]._self.$el);
      this.tabModel = "tab-Search & compare";
      // check if clicked fund is in selectedFundsArray
      // check if selectedFundsArray.length >= 2

      // if an already selected fund at the selected place is clicked – deselect it
      // if an already selected fund is clicked but at a different place
      const idMatch = this.selectedFunds.findIndex(x => x.id === id);
      const bothMatch = this.selectedFunds.findIndex(
        x => x.id === id && x.indexCategory === indexCategory
      );

      // console.log(categoryMatch);

      let selectedFundsLocal = JSON.parse(JSON.stringify(this.selectedFunds));
      // console.log(id);
      if (bothMatch >= 0) {
        // console.log("complete match");
        selectedFundsLocal.splice(bothMatch, 1);
      } else if (idMatch >= 0) {
        // console.log("partial match");
        selectedFundsLocal[idMatch] = { id, indexCategory };
        this.reactivity.clickedSameID++;
      } else {
        // console.log("no match");
        if (selectedFundsLocal.length < 2) {
          // console.log("pushed");
          selectedFundsLocal.push({ id, indexCategory });
        } else {
          // console.log("unshifted");
          selectedFundsLocal.pop();
          selectedFundsLocal.unshift({ id, indexCategory });
        }
      }

      this.selectedFundsModel = selectedFundsLocal;

      // console.log(this.selectedFunds);
      // console.log(this.headers);
      // console.log(this.selectedFundsComputed);
    },
    onClickSVGClearSelection(event) {
      const elementClickedOn = event.target.tagName;
      if (elementClickedOn != "circle") {
        setTimeout(() => {
          this.selectedFundsModel = [];
          this.tab = "tab-Legend";
        }, 150);
      }
    },

    getConnectionPath(array) {
      // console.log(array);
      const start = `M${array[0].x},${array[0].y}`;
      const points = array
        .slice(1)
        .map(p => ` L${p.x},${p.y}`)
        .join("");
      const path = start + points;
      // console.log(path);
      return path;
    },
    onResize() {
      this.resizing = true;
      this.reactivity.resized++;
      // console.log("resizing");
      const setContainerWidth = () => {
        const el = queryString => document.querySelector(queryString);

        const getPxPropOfEl = (queryString, propertyString) => {
          return parseFloat(
            window
              .getComputedStyle(el(queryString), null)
              .getPropertyValue(propertyString)
              .slice(0, -2)
          );
        };

        const getPadding = queryString => {
          let padding = { top: 0, right: 0, bottom: 0, left: 0 };
          for (const property in padding) {
            if (padding.hasOwnProperty(property)) {
              padding[property] = getPxPropOfEl(
                queryString,
                `padding-${property}`
              );
            }
          }
          padding.x = padding.left + padding.right;
          padding.y = padding.top + padding.bottom;
          return padding;
        };

        const updateSizeVariable = (containerQuery, variableName) => {
          const dimension = /width/i.test(variableName)
            ? { name: "Width", padding: "x" }
            : { name: "Height", padding: "y" };
          const padding = getPadding(containerQuery)[dimension.padding];
          // console.log(padding);
          let newSize = el(containerQuery)[`client${dimension.name}`];
          // console.log(el(containerQuery).clientWidth);
          newSize = padding ? newSize - padding : newSize;
          if (newSize && newSize != this[variableName]) {
            this[variableName] = newSize;
            // if (variableName == "svgHeight") {
            //   this.yZoom = d3
            //     .scaleLinear()
            //     .range([this.height, 0])
            //     .domain(this.yZoom.domain());
            // }
          }
        };

        updateSizeVariable("#bubble-chart-content", "svgWidth");
        updateSizeVariable("#bubble-chart-content", "svgHeight");
        // updateSizeVariable("#brush-column", "brushSVGWidth");

        this.yZoom = d3
          .scaleLinear()
          .range([this.height, 0])
          .domain(this.yZoom.domain());

        // console.log(el(".brush"));
        d3.select(".brush").remove();

        if (this.isHydrated) {
          // console.log(this.yZoom.domain());
          // console.log(brushRange);
          const brushRange = [1, 0].map(x =>
            this.scale.y.static(this.yZoom.domain()[x])
          );
          d3.select("#brush .margins")
            .append("g")
            .attr("class", "brush")
            .call(this.brush)
            .call(this.brush.move, brushRange);
        }
      };

      // Execute
      // console.time("resize");
      setContainerWidth();
      this.resizing = false;
      // console.timeEnd("resize");
    },
    test(event) {
      // console.log(event);
      // console.log(event.target.tagName);
      // console.log(this.sizeScalePerCategoryComponent);
      // console.log(this.forces.manyBody);
      // console.log(this.overlap);
      // this.sizeScalePerCategoryComponent = true;
      // if (this.sizeScalePerCategoryComponent == null) {
      //   this.sizeScalePerCategoryComponent = false;
      // } else {
      //   this.sizeScalePerCategoryComponent = !this
      //     .sizeScalePerCategoryComponent;
      // }
      // this.simulationsDefine();
      // this.simulationsRun();
      // console.log(this.nodes[0][0].x);
      //
    },
    brushed(event) {
      if (d3.event.sourceEvent && d3.event.type === "end") {
        this.eventType = d3.event.type;
        var s = d3.event.selection;
        // console.log(s);
        setTimeout(() => {
          this.yZoom = d3
            .scaleLinear()
            .range([this.height, 0])
            .domain([
              this.scale.y.static.invert(s[1]),
              this.scale.y.static.invert(s[0])
            ]);
          // .nice();
          this.reactivity.brushed++;
        }, 50);

        // console.log(this.yZoom.domain());
      }
    },
    brushedManual(range) {
      // console.log(this.yZoom.domain());
      // console.log(brushRange);
      d3.select(".brush").remove();

      this.yZoom = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain(range);

      const brushRange = [1, 0].map(x =>
        this.scale.y.static(this.yZoom.domain()[x])
      );

      d3.select("#brush .margins")
        .append("g")
        .attr("class", "brush")
        .call(this.brush)
        .call(this.brush.move, brushRange);
    }
  },
  created() {
    this.yZoom = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
  },
  mounted() {
    // console.log(this.brushWidth);
    // let d3 = (document.d3 = require("d3"));
    // document.test = require("d3-force-sampled");
    // console.log(window.d3);
    // console.log(document.test);

    this.isHydrated = true;
    // console.log("HYDRATED");
    this.nodes = this.dataPerCategory;
    // console.log(this.nodesFlat);
    // console.log(this.brushHistogram);

    // const d3 = require("d3");
    // const manyBodySampled = require("d3-force-sampled");

    d3.select("#brush .margins")
      .append("g")
      .attr("class", "brush")
      .call(this.brush)
      .call(this.brush.move, this.yZoom.range().reverse());

    // this.brushedManual([0, 100]);
  }
};
</script>

<style lang="scss">
.clipped {
  clip-path: url(#clip);
}
</style>
