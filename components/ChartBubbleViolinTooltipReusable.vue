<template>
  <div
    :style="
      `position:absolute; left:${x}px; top:${y}px; width:220px; max-width: 220px; transform:translateY(-100%) translateX(-50%)`
    "
    class="py-3 px-5 white caption text-none tooltip-pin transition--all"
  >
    <span class="font-weight-bold">{{ label }}</span> {{ content }}
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
