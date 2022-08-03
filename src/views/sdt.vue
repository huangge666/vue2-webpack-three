<template>
  <div>
    <ThreeView class="three-box"
               :sceneUrl="sceneUrl"
               :modelUrl="modelUrl"></ThreeView>
  </div>
</template>

<script>
import ThreeView from "@/components/three/three-view.vue";
export default {
  name: "",
  components: {
    ThreeView,
  },
  data() {
    return {
      sceneUrl: "static/bg.jpg",
      modelUrl: "static/fbx/02.fbx",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
