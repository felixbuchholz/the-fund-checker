<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <polyline
      fill="none"
      class="n--stroke"
      stroke-dasharray="3 3"
      :points="
        `11 ${height - 11} ${width / 2 - 11} 11 ${width - 11} ${height / 2}`
      "
    />
    <circle
      :class="`${classes[0]} n--stroke`"
      cx="11"
      :cy="height - 11"
      r="10"
    />
    <circle
      :class="`${classes[1]} n--stroke`"
      :cx="width / 2 - 11"
      cy="11"
      r="10"
    />
    <circle
      :class="`${classes[2]} n--stroke`"
      :cx="width - 11"
      :cy="height / 2"
      r="10"
    />
    <g
      :style="`transform: translateX(${width / 2 - 15}px) translateY(${15}px)`"
    >
      <path
        d="M24.27,10.88a2.11,2.11,0,0,0-1.48-.6h-2a2.21,2.21,0,0,0-1.87-1.53H16.6a2.68,2.68,0,0,0-2.1-1.82H12.1V2.53A2.3,2.3,0,0,0,11.52.89,3.18,3.18,0,0,0,9,0a3.32,3.32,0,0,0-2.5.9,2.49,2.49,0,0,0-.7,1.7V13.15a4.68,4.68,0,0,0-3.14-1.72c-2.46,0-2.83,1.43-2.83,2.28a7.75,7.75,0,0,0,.35,1.85l0,.11L7.3,26.94v3.61H21.7l3.38-8.82V13.16A3,3,0,0,0,24.27,10.88Z"
      />
      <path
        class="background--fill"
        d="M23.32,21.41l-2.83,7.38H9.06V26.43l-7.2-11.5a5.71,5.71,0,0,1-.23-1.22c0-.25.05-.3.06-.31a1.63,1.63,0,0,1,1-.21c.88,0,2.38,1.59,3.11,2.66l0,0v2.94H7.6V2.53a.81.81,0,0,1,.2-.44A1.71,1.71,0,0,1,9,1.74a1.64,1.64,0,0,1,1.17.31.54.54,0,0,1,.14.36h0v10.5h1.76V8.68h2.22c.14,0,.71.25.71,1.38v2.86H16.8V10.51h2c.19.05.46.37.46,1.25v2.86H21V12h1.84a.45.45,0,0,1,.21.12,1.45,1.45,0,0,1,.27,1Z"
      />
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
        return ["e--fill", "s--fill", "g--fill"];
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
