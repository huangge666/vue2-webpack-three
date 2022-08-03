<template>
  <div class="car-model">
    <div class="light"
         @click="lightEvent()">
      {{ light ? `关灯` : `开灯` }}
    </div>
  </div>
</template>

<script>
import { renderer } from "./RendererCamera";
// 车灯
import { openCarLight, closeCarLight } from "./carLight.js";
export default {
  name: "Car",
  data() {
    return {
      light: false, // 灯
    };
  },
  methods: {
    lightEvent() {
      this.light = !this.light;
      this.light ? openCarLight() : closeCarLight();
    },
  },
  mounted() {
    // Three.js渲染结果Canvas画布插入到body元素中
    this.$el.appendChild(renderer.domElement);
  },
};
</script>

<style lang="scss" scoped>
.car-model {
  position: relative;

  .light {
    border-radius: 50%;
    border: 1px solid #ffffff;
    overflow: hidden;
    position: absolute;
    top: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
