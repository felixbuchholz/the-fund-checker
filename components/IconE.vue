<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <path
      class="e--fill"
      d="M3.64,18.71S1.21,10,9.12,6.15A19.67,19.67,0,0,1,21.71,5s-.2,11.67-8.3,14.43c0,0-4.38,2-8.53.5,0,0,1.86-5.88,11.12-10.24A18,18,0,0,0,3.64,18.71Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 25
    }
  }
};
</script>
