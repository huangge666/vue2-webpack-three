<template>
  <div>
    <div class="boxs">
      <div class="maskLoading"
           v-if="isLoading">
        <!-- <div class="loading">
          <div :style="{width : loadingWidth +'%' }"></div>
        </div>
        <div style="padding-left: 10px;">{{parseInt(loadingWidth)}}%</div> -->
        <div class="loading">
          <div id="progressbar"></div>
        </div>
      </div>
      <div class="mask">
        <p>x : {{map.x}} y:{{map.y}} z :{{map.z}}</p>
        <button @click="isAutoFun(true)">转动车</button>
        <button @click="isAutoFun(false)">停止</button>
        <div class="flex">
          <div @click="setCarColor(index)"
               v-for="(item,index) in colorAry"
               :key="index"
               :style="{backgroundColor : item}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Color,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  GridHelper,
  MeshPhongMaterial,
  PlaneGeometry,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default {
  name: "",
  data() {
    return {
      isLoading: true,
      loadingWidth: 0,
      // 车身颜色
      colorAry: [
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
      ],
      // 相机的默认坐标
      defaultMap: {
        x: 510,
        y: 128,
        z: 0,
      },
      //输出坐标给模板使用
      map: {
        x: 510,
        y: 128,
        z: 0,
      },
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      dHelper: null,
      hHelper: null,
      directionalLight: null,
      hemisphereLight: null,
      loader: new FBXLoader(),
    };
  },
  methods: {
    async init() {
      this.setScene();
      this.setCamera();
      this.setLight();
      this.setControls();
      const fbx = await this.loadModel("static/fbx/che/che.FBX");
      this.scene.add(fbx);
      this.render();
    },
    // 创建灯光
    setLight() {
      const ambientLight = new AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(-4, 8, 4);
      this.dHelper = new DirectionalLightHelper(directionalLight, 5, 0xff0000);

      const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 1);
      hemisphereLight.position.set(0, 8, 0);
      this.hHelper = new HemisphereLightHelper(hemisphereLight, 5);

      this.directionalLight = directionalLight;
      this.hemisphereLight = hemisphereLight;
      this.scene.add(directionalLight);
      this.scene.add(hemisphereLight);
    },
    // 创建场景 / 渲染器
    setScene() {
      this.scene = new Scene();
      const renderer = new WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffccff, 1);
      renderer.outputEncoding = sRGBEncoding;
      this.renderer = renderer;
      document.querySelector(".boxs").appendChild(renderer.domElement);
    },
    // 创建相机
    setCamera() {
      const { x, y, z } = this.defaultMap;
      const camera = new PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.set(x, y, z);
      this.camera = camera;
    },
    // 创建模型
    createMesh() {
      // 平面对象添加到场景中
      const plane = new Mesh(
        new PlaneGeometry(4000, 4000),
        new MeshPhongMaterial({ color: 0x999999, depthWrite: false })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true;
      this.scene.add(plane);
      this.plane = plane;

      const grid = new GridHelper(4000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);
    },
    // 创建控制器
    setControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.maxPolarAngle = (0.9 * Math.PI) / 2; // 最大滑动角度
      console.log(controls.maxPolarAngle, "controls.maxPolarAngle");
      controls.enableZoom = true;
      controls.addEventListener("change", this.changeRender);
      this.controls = controls;
    },
    changeRender() {
      this.map.x = Number.parseInt(this.camera.position.x);
      this.map.y = Number.parseInt(this.camera.position.y);
      this.map.z = Number.parseInt(this.camera.position.z);
    },
    // 渲染
    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
    },
    isAutoFun(bool) {
      this.controls.autoRotate = bool;
    },
    // 设置车身颜色
    setCarColor(index) {
      const currentColor = new Color(this.colorAry[index]);
      this.scene.traverse((child) => {
        if (child.isMesh) {
          console.log(child, child.name);
          if (
            child.name.includes("door_") ||
            child.name.includes("wheel_") ||
            child.name.includes("bumper_")
          ) {
            child.material.color.set(currentColor);
          }
        }
      });
    },
    loadModel(url) {
      const progressbarElem = document.querySelector("#progressbar");
      return new Promise((resolve, reject) => {
        this.loader.load(
          url,
          (fbx) => {
            // ... 可以在此进行一些操作
            // fbx.scale.set(1, 1, 1);
            // fbx.position.set(0, 0, 0);
            console.log(fbx);
            // fbx.traverse(function (child) {
            //   if (child.isMesh) {
            //     child.frustumCulled = false;
            //     //模型阴影
            //     child.castShadow = true;
            //     //模型自发光
            //     child.material.emissive = child.material.color;
            //     child.material.emissiveMap = child.material.map;
            //   }
            // });
            resolve(fbx);
          },
          ({ loaded, total }) => {
            let load = Math.abs((loaded / total) * 100);
            this.loadingWidth = load;
            progressbarElem.style.width = `${load | 0}%`;
            if (load >= 100) {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            }
            // console.log((loaded / total) * 100 + "% loaded");
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.maskLoading {
  background: #000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1111111;
  color: #fff;
}

.maskLoading .loading {
  width: 400px;
  height: 20px;
  border: 1px solid #fff;
  background: #000;
  overflow: hidden;
  border-radius: 10px;
}

.maskLoading .loading div {
  background: #fff;
  height: 20px;
  width: 0;
  transition-duration: 500ms;
  transition-timing-function: ease-in;
}

canvas {
  width: 100%;
  height: 100%;
  margin: auto;
}

.mask {
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.flex div {
  width: 10px;
  height: 10px;
  margin: 5px;
  cursor: pointer;
}
#progressbar {
  width: 0%;
  height: 100%;
  transition: width ease-out 0.5s;
  background-color: #888;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.5) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  animation: progressanim 2s linear infinite;
}

@keyframes progressanim {
  0% {
    background-position: 50px 50px;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
