<template>
  <div class="car-model">
    <div v-if="percentage < 100"
         class="mask">
      <el-progress :text-inside="true"
                   :stroke-width="24"
                   :percentage="percentage"
                   status="success" />
    </div>
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
import eventBus from "@/tools/eventBus.js";
export default {
  name: "Car",
  data() {
    return {
      light: false, // 灯
      percentage: 0,
    };
  },
  methods: {
    lightEvent() {
      this.light = !this.light;
      this.light ? openCarLight() : closeCarLight();
    },
  },
  mounted() {
    eventBus.$on("on-percentage", (val) => {
      this.percentage = val;
    });

    // Three.js渲染结果Canvas画布插入到body元素中
    this.$el.appendChild(renderer.domElement);
  },
  beforeDestroy() {
    eventBus.$off("on-percentage");
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

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 2;
  }
  .el-progress {
    width: 50%;
    margin: 300px auto;
  }
}
</style>
