<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <g :style="`transform: translateY(${height / 4}px)`">
      <circle :class="classes[0]" cx="12.5" :cy="0" r="12.5" />
      <text
        :class="textClasses[0]"
        style="transform: translateX(32.5px); alignment-baseline: middle;"
      >
        many votes
      </text>
    </g>
    <g :style="`transform: translateY(${(height / 4) * 3}px)`">
      <circle :class="classes[1]" cx="5" :cy="0" r="5" />
      <text
        :class="textClasses[0]"
        style="transform: translateX(15px); alignment-baseline: middle;"
      >
        few votes
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 105
    },
    height: {
      type: Number,
      default: 60
    },
    classes: {
      type: Array,
      default() {
        return ["n--fill", "n--fill"];
      }
    },
    textClasses: {
      type: Array,
      default() {
        return ["caption", "caption"];
      }
    }
  }
};
</script>
