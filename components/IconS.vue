<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <g>
      <circle class="s--fill" cx="12.5" cy="12.91" r="2.88" />
      <path
        class="s--fill"
        d="M15.45,15.12a3.67,3.67,0,0,1-5.13.77,3.47,3.47,0,0,1-.76-.77,4.94,4.94,0,0,0-2,4v.82a1.65,1.65,0,0,0,1.65,1.65h6.57a1.64,1.64,0,0,0,1.64-1.65v-.82A5,5,0,0,0,15.45,15.12Z"
        transform="translate(0 0)"
      />
      <circle class="s--fill" cx="12.5" cy="6.34" r="2.88" />
      <circle class="s--fill" cx="19.07" cy="8.8" r="2.88" />
      <path
        class="s--fill"
        d="M22,11a3.67,3.67,0,0,1-5.89,0,2.69,2.69,0,0,0-.32.27,3.62,3.62,0,0,1,.06,3.13l.07.05a5.69,5.69,0,0,1,2.06,3h4.36A1.65,1.65,0,0,0,24,15.79V15A4.94,4.94,0,0,0,22,11Z"
        transform="translate(0 0)"
      />
      <circle class="s--fill" cx="5.93" cy="8.8" r="2.88" />
      <path
        class="s--fill"
        d="M9.07,14.47l.06-.05a3.58,3.58,0,0,1,.07-3.13A2.78,2.78,0,0,0,8.87,11,3.66,3.66,0,0,1,3,11,4.92,4.92,0,0,0,1,15v.83a1.65,1.65,0,0,0,1.64,1.64H7A5.65,5.65,0,0,1,9.07,14.47Z"
        transform="translate(0 0)"
      />
    </g>
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
