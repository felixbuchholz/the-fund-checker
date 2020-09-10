<template>
  <div
    :style="`position:absolute; left:${x}px; top:${y}px;`"
    class="transition--all"
  >
    <div class="position-relative">
      <div
        class="white elevation-3"
        style="transform-origin: bottom right ; transform: translateX(-100%) translateY(-100%) rotate(45deg); width:40px; height:40px; border-radius: 50% 50% 0% 50%; z-index: 2; "
      ></div>
      <div
        class="position-absolute-tl0 body-1 font-weight-bold"
        style="transform: translateX(-42%) translateY(-40px); z-index: 4;"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: "Tooltip content"
    },
    label: {
      type: String,
      default: "A"
    },
    orientation: {
      type: String,
      default: "bottom-left"
    }
  },
  computed: {
    hasLabel() {
      return this.label.length > 0;
    }
  },
  mounted() {
    // console.log("mounted tooltip");
    // console.log(this.$el);
    // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/
    // let last_known_scroll_position = 0;
    // let ticking = false;
    // function doSomething(scroll_pos) {
    //   console.log(scroll_pos);
    // }
    // window.addEventListener("scroll", function(e) {
    //   last_known_scroll_position = window.scrollY;
    //   if (!ticking) {
    //     window.requestAnimationFrame(function() {
    //       doSomething(last_known_scroll_position);
    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // });
  },
  beforeDestroy() {
    // console.log("destroying tooltip");
  }
};
</script>
