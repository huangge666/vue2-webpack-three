<template>
  <div>
    <div id="container"
         class="three-container"
         @click="getSelectCube"></div>
  </div>
</template>

<script>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TubeGeometry } from "three";

export default {
  name: "demoVue",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
      controls: null,
      planeGeometry: null,

      // 物体边缘高光
      composer: null,
      outlinePass: null,
      renderPass: null,

      // 物体动画
      rootMesh: null,
      tempMesh: null,
    };
  },
  methods: {
    init() {
      this.createScene();
      this.createCamera();
      this.createRender();
      this.createMesh();
      this.createLight();
      this.createControls();
      this.render();
    },
    // 创建场景
    createScene() {
      const scene = new THREE.Scene();

      scene.background = new THREE.Color(0xa0a0a0);
      // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

      this.scene = scene;
    },
    // 创建摄像机
    createCamera() {
      // const element = document.getElementById("container");
      // const width = element.clientWidth; // 窗口宽度
      // const height = element.clientHeight; // 窗口高度
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.set(-500, 300, 300);
      this.camera = camera;
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1);
      element.appendChild(renderer.domElement);
      this.renderer = renderer;
    },
    // 创建模型
    createMesh() {
      // 平面对象添加到场景中
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true;
      this.scene.add(plane);
      this.plane = plane;

      const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);
    },
    // 创建光源
    createLight() {
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemisphereLight.position.set(0, 200, 0);
      this.scene.add(hemisphereLight);

      const DirectionalLight = new THREE.DirectionalLight(0xffffff);
      DirectionalLight.position.set(0, 200, 100);
      DirectionalLight.castShadow = true;
      DirectionalLight.shadow.camera.top = 180;
      DirectionalLight.shadow.camera.bottom = -100;
      DirectionalLight.shadow.camera.left = -120;
      DirectionalLight.shadow.camera.right = 120;
      this.scene.add(DirectionalLight);
    },
    // 创建控件
    createControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 100, 0);
      this.controls = controls;
    },
    // 渲染
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();

      // if (this.tempMesh) {
      //   this.tempMesh.rotation.x += 0.01;
      //   this.tempMesh.rotation.y += 0.01;
      // }

      // 通过requestAnimationFrame实现周期性调用render
      requestAnimationFrame(this.render);

      if (this.composer) {
        this.composer.render();
      }
    },
    //高亮显示模型（呼吸灯）
    outlineObj(selectedObjects) {
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new EffectComposer(this.renderer);
      // 新建一个场景通道  为了覆盖到原理来的场景上
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);
      // 物体边缘发光通道
      const outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.scene,
        this.camera,
        selectedObjects
      );
      outlinePass.selectedObjects = selectedObjects;
      outlinePass.edgeStrength = 10.0; // 边框的亮度
      outlinePass.edgeGlow = 1; // 光晕[0,1]
      outlinePass.usePatternTexture = false; // 是否使用父级的材质
      outlinePass.edgeThickness = 1.0; // 边框宽度
      outlinePass.downSampleRatio = 1; // 边框弯曲度
      outlinePass.pulsePeriod = 5; // 呼吸闪烁的速度
      outlinePass.visibleEdgeColor.set(parseInt(0x00ff00)); // 呼吸显示的颜色
      outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
      outlinePass.clear = true;
      this.outlinePass = outlinePass;
      this.composer.addPass(this.outlinePass);
      // 自定义的着色器通道 作为参数
      var effectFXAA = new ShaderPass(FXAAShader);
      effectFXAA.uniforms.resolution.value.set(
        1 / window.innerWidth,
        1 / window.innerHeight
      );
      effectFXAA.renderToScreen = true;
      this.composer.addPass(effectFXAA);
    },
    // 获取选中的模型
    getSelectCube(event) {
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      //找到场景中所有外部模型
      let scensObjs = [];
      this.scene.children.forEach((child) => {
        for (let i = 0; i < child.children.length; i++) {
          const obj = child.children[i];
          scensObjs.push(obj);
        }
      });

      let intersects = raycaster.intersectObjects(scensObjs);

      // console.log(intersects, "intersects");
      if (intersects.length > 0) {
        // 判断是否存在，存在则恢复
        if (this.rootMesh) {
          this.tempMesh = JSON.parse(JSON.stringify(this.rootMesh));
        }
        const temp = intersects[0];
        // const obj = intersects.map((v) => v.object)[0];
        const obj = { ...temp.object };
        this.rootMesh = JSON.parse(JSON.stringify(obj));
        this.tempMesh = { ...obj };

        console.log(obj, obj.name);
        switch (obj.name) {
          case "wheel_rf":
          case "wheel_rr": // 右车轮
            // this.tempMesh.position.x += 15;
            this.tempMesh.position.x += 15;
            break;
          case "wheel_lf":
          case "wheel_lr": // 左车轮
            this.tempMesh.position.x -= 15;
            // this.tempMesh.scale.x -= 15;
            break;
          default:
            this.tempMesh.rotation.x += 30;
            break;
        }
        this.outlineObj([obj]);
      }
    },
    loadModel() {
      let _self = this;
      let loader = new FBXLoader();
      return new Promise((resolve, reject) => {
        loader.load("static/fbx/che/che.FBX", function (mesh) {
          mesh.scale.set(2, 2, 2);
          mesh.position.set(0, 0, 0);
          console.log(mesh, "fbx模型");

          mesh.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          _self.scene.add(mesh);
          console.log(new THREE.AnimationMixer(mesh), "AnimationMixer");
        }),
          (error) => {
            // 模型加载出错的回调函数
            console.log("error while loading", error);
            reject("load model error", error);
          };
      });
    },
  },
  mounted() {
    this.init();
    this.loadModel();
    // window.addEventListener("click", this.getSelectCube, false);
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
