// Scene对象的使用
<template>
  <div>
    <div id="container"></div>
    <div class="controls-box">
      <span class="demonstration">rotationSpeed</span>
      <el-slider v-model="rotationSpeed"
                 :max="50"
                 :format-tooltip="formatTooltip">
      </el-slider>
      <span class="demonstration">fogValue</span>
      <el-slider v-model="fogValue"
                 :max="50"
                 :format-tooltip="formatFogTooltip">
      </el-slider>
      <br>
      <el-button type="primary"
                 class="controls-button"
                 size="mini"
                 @click="addCube">addCube</el-button>
      <el-button type="primary"
                 class="controls-button"
                 size="mini"
                 @click="removeCube">removeCube</el-button>
      <el-button type="primary"
                 class="controls-button"
                 size="mini"
                 @click="outputObjects">printScene</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  data() {
    return {
      rotationSpeed: 2,
      fogValue: 2,
      camera: null,
      scene: null,
      renderer: null,
      planeGeometry: null,
      plane: null,
      controls: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    formatFogTooltip(val) {
      return val / 1000;
    },
    // 初始化
    init() {
      this.createScene(); // 创建场景
      this.createMesh(); // 创建网格模型
      this.createLight(); // 创建光源
      this.createCamera(); // 创建相机
      this.createRender(); // 创建渲染器
      this.createControls(); // 创建控件对象
      this.addFog(); // 添加雾化效果
      this.render(); // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene();
    },
    // 创建网格模型
    createMesh() {
      this.planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); // 创建一个平面对象PlaneGeometry
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      }); // 材质对象Material
      this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
      this.plane.receiveShadow = true;

      // 设置平面位置
      this.plane.rotation.x = -0.5 * Math.PI;
      this.plane.position.set(0, 0, 0);

      // 平面对象添加到场景中
      this.scene.add(this.plane);
    },
    // 创建光源
    createLight() {
      // 添加聚光灯
      const spotLight = new THREE.SpotLight(0xfeefff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;
      this.scene.add(spotLight); // 聚光灯添加到场景中
      // 环境光
      const ambientLight = new THREE.AmbientLight(0x0c0c0c);
      this.scene.add(ambientLight);
    },
    // 创建相机
    createCamera() {
      const element = document.getElementById("container");
      const width = element.clientWidth; // 窗口宽度
      const height = element.clientHeight; // 窗口高度
      const k = width / height; // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(45, k, 0.1, 1000);

      this.camera.position.set(-30, 40, 30); // 设置相机位置
      this.camera.lookAt(this.scene.position); // 设置相机方向
      this.scene.add(this.camera);
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      this.renderer.setClearColor(0x3f3f3f, 1); // 设置背景颜色
      this.renderer.shadowMapEnabled = true;
      element.appendChild(this.renderer.domElement);
    },
    render() {
      const THIS = this;
      THIS.scene.traverse(function (e) {
        if (e instanceof THREE.Mesh && e !== THIS.plane) {
          e.rotation.x += THIS.rotationSpeed / 100;
          e.rotation.y += THIS.rotationSpeed / 100;
          e.rotation.z += THIS.rotationSpeed / 100;
        }
      });

      // THIS.scene.traverse(fun) 与 THIS.scene.children.forEach(fun) 是一样的功能都是去遍历scene对象的成员
      /* THIS.scene.children.forEach(function (e) {
        if (e instanceof THREE.Mesh && e !== THIS.plane) {
          e.rotation.x += THIS.rotationSpeed / 100
          e.rotation.y += THIS.rotationSpeed / 100
          e.rotation.z += THIS.rotationSpeed / 100
        }
      }) */
      this.addFog();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    // 给平面中添加方块
    addCube() {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = "cube-" + this.scene.children.length;

      // 给方块设置随机坐标
      cube.position.x =
        -30 + Math.round(Math.random() * this.planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z =
        -20 + Math.round(Math.random() * this.planeGeometry.parameters.height);
      // 将生成的方块添加到场景
      this.scene.add(cube);
      // this.scene.children.push(cube)  //与 this.scene.add(cube) 一样的效果 也是scene.add()操作的本质
    },
    // 删除一个方块
    removeCube() {
      const allChildren = this.scene.children;
      const lastChildren = allChildren[allChildren.length - 1];
      if (lastChildren instanceof THREE.Mesh) {
        this.scene.remove(lastChildren);
      }
      // this.scene.children.pop() //整个removeCube函数其实就是做这个操作
    },
    // 打印scene对象子元素
    outputObjects() {
      console.log(this.scene);
    },

    // 添加雾化效果
    addFog() {
      // this.scene.fog = new THREE.Fog(0xefefef, 0.15, 100)
      this.scene.fog = new THREE.FogExp2(0xffffff, this.fogValue / 1000);
    },
  },
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.controls-box {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 300px;
  height: 180px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #c3c3c3;
}
.controls-button {
  margin: 3px 0px;
}
</style>