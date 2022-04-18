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

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
      // this.outlineObj(this.scene.children);
      this.render();
    },
    // 创建场景
    createScene() {
      const scene = new THREE.Scene();
      this.scene = scene;
    },
    // 创建摄像机
    createCamera() {
      const element = document.getElementById("container");
      const width = element.clientWidth; // 窗口宽度
      const height = element.clientHeight; // 窗口高度
      const k = width / height; // 窗口宽高比
      const s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // OrthographicCamera(left, right, top, bottom, near, far)
      // OrthographicCamera 正交摄像机; 正交摄像机和透视投影摄像机最大的区别是投影到的物体大小不受距离的影响 改变距离物体不变化
      const camera = new THREE.OrthographicCamera(
        -s * k,
        s * k,
        s,
        -s,
        1,
        1000
      );
      camera.position.set(200, 300, 200); // 设置相机位置
      camera.lookAt(this.scene.position); // 设置相机方向
      this.camera = camera;
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      /**
       * WebGLRenderer渲染器相比较于CanvasRenderer渲染器有更好的性能;
       * 能够利用GPU硬件加速实现提高渲染性能
       */
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      // renderer.setClearColor(0x3f3f3f, 1);
      renderer.setClearColor(0xb9d3ff, 1);
      element.appendChild(renderer.domElement);
      this.renderer = renderer;
    },
    // 创建模型
    createMesh() {
      const planeGeometry = new THREE.PlaneGeometry(300, 200, 1, 1); // 创建一个平面对象PlaneGeometry
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      }); // 材质对象Material
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      this.planeGeometry = planeGeometry;
      plane.receiveShadow = true;

      // 设置平面位置
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.set(15, 0, 0);

      // 平面对象添加到场景中
      this.scene.add(plane);

      // 创建一个立方体几何对象
      // BoxGeometry是四边形的几何模型类。它通常用于创建具有“宽度”、“高度”和“深度”参数的立方体或不规则四边形模型。
      const geometry = new THREE.BoxGeometry(40, 40, 40);

      // 材质对象Material
      const material = new THREE.MeshLambertMaterial({
        color: 0xe1e1e1,
      });

      // 网格模型对象Mesh
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.y = 25;

      // 添加到场景中
      this.scene.add(this.mesh);

      // 增加圆环
      const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.castShadow = true;
      torus.name = "torus-" + this.scene.children.length;
      // 给方块设置随机坐标
      torus.position.x =
        -30 + Math.round(Math.random() * this.planeGeometry.parameters.width);
      torus.position.y = Math.round(Math.random() * 5);
      torus.position.z =
        -20 + Math.round(Math.random() * this.planeGeometry.parameters.height);
      this.scene.add(torus);
    },
    // 创建光源
    createLight() {
      // 点光源
      const point = new THREE.PointLight(0xff8888);
      point.position.set(400, 200, 300); // 点光源位置
      this.scene.add(point); // 点光源添加到场景中

      // 环境光
      const ambient = new THREE.AmbientLight(0x111122);
      this.scene.add(ambient);
    },
    // 创建控件
    createControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);

      // 是否自动旋转
      controls.autoRotate = true;

      // 惯性
      controls.enableDamping = true;

      // 动态阻尼系数
      controls.dampingFactor = 0.25;

      // 缩放
      controls.enableZoom = true;

      // 右键拖拽
      controls.enablePan = true;

      this.controls = controls;
    },
    // 渲染
    render() {
      this.renderer.render(this.scene, this.camera);

      if (this.tempMesh) {
        this.tempMesh.rotation.x += 0.01;
        this.tempMesh.rotation.y += 0.01;
      }

      // this.controls.update();
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

      // const bloomPass = new UnrealBloomPass(
      //   new THREE.Vector2(window.innerWidth, window.innerHeight),
      //   1.5,
      //   0.4,
      //   0.85
      // );
      // bloomPass.threshold = 0;
      // bloomPass.strength = 1.5;
      // bloomPass.radius = 0;
      // this.composer.addPass(bloomPass);
    },
    // 获取选中的模型
    getSelectCube(event) {
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      let intersects = raycaster.intersectObjects(this.scene.children);

      console.log(intersects, "intersects");
      if (intersects.length > 0) {
        // 判断是否存在，存在则恢复
        if (this.rootMesh) {
          this.tempMesh.rotation.x = this.rootMesh._x;
          this.tempMesh.rotation.y = this.rootMesh._y;
          this.tempMesh.rotation.z = this.rootMesh._z;
        }
        const obj = intersects.map((v) => v.object)[0];
        this.rootMesh = JSON.parse(JSON.stringify(obj.rotation));
        this.tempMesh = { ...obj };
        this.outlineObj([obj]);
      }
      // for (let i = 0; i < intersects.length; i++) {
      //   intersects[i].object.material.color.set(0xff0000);
      // }
    },
    /**
     * 将屏幕坐标转换为3d 坐标
     */
    getIntersects(event) {
      event.preventDefault();
      console.log("event.clientX:" + event.clientX);
      console.log("event.clientY:" + event.clientY);

      // 声明 raycaster 和 mouse 变量
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.camera);

      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      //返回选中的对象
      return intersects;
    },
    loadModel() {
      let that = this;

      // gltf模型加载器
      let loader = new GLTFLoader();
      return new Promise((resolve, reject) => {
        loader.load(
          `static/gltf/material.gltf`,
          (gltf) => {
            console.log(gltf);
            gltf.scene.traverse((object) => {
              // 修改模型材质
              let material = new THREE.MeshLambertMaterial();
              object.material = material;

              if (object.isMesh) {
                object.geometry.center(); // center here
              }
            });
            let group = new THREE.Group();
            group.add(gltf.scene);

            let box = new THREE.Box3();
            box.setFromObject(group);

            let wrapper = new THREE.Object3D();
            wrapper.add(group);

            // 根据自己模型的大小设置位置
            wrapper.position.set(80, 80, 80);

            // 将模型加入到场景中  ! important
            that.scene.add(wrapper);
          },
          (xhr) => {
            console.log(xhr);
            // 模型加载期间的回调函数
            console.log(
              `${(xhr.loaded / xhr.total) * 100}% building model loaded`
            );
          }
        ),
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
