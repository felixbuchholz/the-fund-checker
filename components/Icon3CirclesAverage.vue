<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    class="chart-bubble"
  >
    <line
      class="connecting-path average"
      x1="10"
      :y1="height / 2"
      :x2="width - 10"
      :y2="height / 2"
    ></line>
    <circle :class="classes[0]" cx="10" :cy="height / 2" r="10" />
    <circle :class="classes[1]" :cx="width / 2" :cy="height / 2" r="10" />
    <circle :class="classes[2]" :cx="width - 10" :cy="height / 2" r="10" />
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
        return ["average", "average", "average"];
      }
    }
  }
};
</script>
