<template>
  <div>
    <canvas id="c2d"
            class="c2d"></canvas>
    <input id="but"
           type="button"
           value="1" />
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "car",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      colorAry: Object.freeze([
        "rgb(216, 27, 67)",
        "rgb(142, 36, 170)",
        "rgb(81, 45, 168)",
        "rgb(48, 63, 159)",
        "rgb(30, 136, 229)",
        "rgb(0, 137, 123)",
        "rgb(67, 160, 71)",
        "rgb(251, 192, 45)",
        "rgb(245, 124, 0)",
        "rgb(230, 74, 25)",
        "rgb(233, 30, 78)",
        "rgb(156, 39, 176)",
        "rgb(0, 0, 0)",
      ]),
    };
  },
  methods: {
    setScene() {
      this.scene = new THREE.Scene();
    },
    setCamera() {
      const fov = 40; // 视野范围
      const aspect = 2; // 相机默认值 画布的宽高比
      const near = 0.1; // 近平面
      const far = 10000; // 远平面
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      // 相机位置  正上方向下看
      camera.position.set(200, 400, 300);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    },
    setRenderer() {
      const canvas = document.querySelector("#c2d");
      this.renderer = new THREE.WebGLRenderer({ canvas });
    },
    setControls() {
      const canvas = document.querySelector("#c2d");
      const controls = new OrbitControls(this.camera, canvas);
      controls.update();
      this.controls = controls;
    },
    setLight() {
      const { scene } = this;
      // 半球灯
      {
        const skyColor = 0xb1e1ff; // light blue
        const groundColor = 0xb97a20; // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(
          skyColor,
          groundColor,
          intensity
        );
        scene.add(light);
      }

      // 平行灯
      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);
        scene.add(light);
        scene.add(light.target);
      }
    },
    loadModel() {
      const { scene } = this;
      const loader = new GLTFLoader(); //引入模型的loader实例
      loader.load(
        "static/car.gltf",
        (gltf) => {
          // console.log('🚀 ~ file: index.html ~ line 65 ~ gltf', gltf)

          gltf.scene.traverse((child) => {
            // if (child.isMesh) {
              // 是否材质
              console.log(child.name);
            // }
          });
          scene.add(gltf.scene);
        },
        ({ loaded, total }) => {
          let load = Math.abs((loaded / total) * 100);
          console.log((loaded / total) * 100 + "% loaded");
        },
        (err) => {
          console.log("🚀 ~ file: index.html ~ line 78 ~ err", err);
        }
      );
    },
    modify(index) {
      const currentColor = new THREE.Color(this.colorAry[index]);
      // traverse 遍历 所有对象
      this.scene.traverse((child) => {
        // console.log('🚀 ~ file: index.html ~ line 81 ~ scene.traverse ~ child', child, child.isMesh)
        if (child.isMesh) {
          // 是否材质
          console.log(child.name);
          child.material.color.set(currentColor);
        }
      });
    },
    render(time) {
      const index = (time * 10) % 13;
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        // 画布大小修改后 调整 比例
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }

      // 加载渲染器
      this.renderer.render(this.scene, this.camera);

      // 开始动画
      requestAnimationFrame(this.render);
    },
    // 渲染器 重新调整
    resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      var width = window.innerWidth;
      var height = window.innerHeight;
      var canvasPixelWidth = canvas.width / window.devicePixelRatio;
      var canvasPixelHeight = canvas.height / window.devicePixelRatio;

      const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    },
  },
  mounted() {
    document.getElementById("but").onclick = (e) => {
      // console.log('🚀 ~ file: index.html ~ line 104 ~ document.getElementById ~ e', e.target.value)
      this.modify(e.target.value);
    };

    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setControls();
    this.setLight();
    this.loadModel();
    requestAnimationFrame(this.render);
  },
};
</script>

<style lang="scss" scoped>
</style>
