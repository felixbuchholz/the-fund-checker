<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
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
        return ["e--fill", "s--fill", "g--fill"];
      }
    }
  }
};
</script>
