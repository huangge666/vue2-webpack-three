<template>
  <div>
    <div id="container"></div>
    <div class="controls-box">
      <el-collapse accordion>
        <div>
          <el-collapse-item :title="item.name"
                            v-for="(item) in properties"
                            :key="item.name">
            <el-col>
              <el-col :span="5">
                <span class="vertice-span">{{item.properties.nameX}}</span>
              </el-col>
              <el-col :span="16">
                <el-slider v-model="item.value.x"
                           :min="item.name=='比例-scale'?0:-10"
                           :max="10"
                           :format-tooltip="formatTooltip"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="vertice-span">{{item.value.x}}</span>
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="5">
                <span class="vertice-span">{{item.properties.nameY}}</span>
              </el-col>
              <el-col :span="16">
                <el-slider v-model="item.value.y"
                           :min="item.name=='比例-scale'?0:-10"
                           :max="10"
                           :format-tooltip="formatTooltip"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="vertice-span">{{item.value.y}}</span>
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="5">
                <span class="vertice-span">{{item.properties.nameZ}}</span>
              </el-col>
              <el-col :span="16">
                <el-slider v-model="item.value.z"
                           :min="item.name=='比例-scale'?0:-10"
                           :max="10"
                           :format-tooltip="formatTooltip"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="vertice-span">{{item.value.z}}</span>
              </el-col>
            </el-col>

          </el-collapse-item>
        </div>
      </el-collapse>
      <el-checkbox v-model="cubeVisible">是否可见</el-checkbox>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  data() {
    return {
      properties: {
        scale: {
          name: "比例-scale",
          properties: {
            nameX: "scaleX",
            nameY: "scaleY",
            nameZ: "scaleZ",
          },
          value: {
            x: 1,
            y: 1,
            z: 1,
          },
        },
        position: {
          name: "位置-position",
          properties: {
            nameX: "positionX",
            nameY: "positionY",
            nameZ: "positionZ",
          },
          value: {
            x: 0,
            y: 4,
            z: 0,
          },
        },
        rotation: {
          name: "旋转-rotation",
          properties: {
            nameX: "rotationX",
            nameY: "rotationY",
            nameZ: "rotationZ",
          },
          value: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        translate: {
          name: "平移-translate",
          properties: {
            nameX: "translateX",
            nameY: "translateY",
            nameZ: "translateZ",
          },
          value: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
      cubeVisible: true,
      cube: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    formatTooltip(val) {
      return val;
    },
    // 初始化
    init() {
      this.createScene(); // 创建场景
      this.createMesh(); // 创建网格模型
      this.createCube(); // 创建方块
      this.createLight(); // 创建光源
      this.createCamera(); // 创建相机
      this.createRender(); // 创建渲染器
      this.createControls(); // 创建控件对象
      this.render(); // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene();
    },
    // 创建网格模型
    createMesh() {
      const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); // 创建一个平面对象PlaneGeometry
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      }); // 材质对象Material
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;

      // 设置平面位置
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.set(0, 0, 0);

      // 平面对象添加到场景中
      this.scene.add(plane);
    },
    // 创建光源
    createLight() {
      // 添加聚光灯
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, 20);
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
      this.camera.lookAt(new THREE.Vector3(5, 0, 0)); // 设置相机方向
      this.scene.add(this.camera);
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      this.renderer.setClearColor(0x3f3f3f, 1); // 设置背景颜色
      element.appendChild(this.renderer.domElement);
    },
    // 更新方块的属性
    updateCubeProperties() {
      // 更新缩放属性方式1
      /* this.cube.scale.x = this.properties.scale.value.x
      this.cube.scale.y = this.properties.scale.value.y
      this.cube.scale.z = this.properties.scale.value.z */

      // 更新缩放属性方式2
      /* this.cube.scale.set(
        this.properties.scale.value.x,
        this.properties.scale.value.y,
        this.properties.scale.value.z
      ) */

      // 更新缩放属性方式3
      this.cube.scale = new THREE.Vector3(
        this.properties.scale.value.x,
        this.properties.scale.value.y,
        this.properties.scale.value.z
      );

      // 更新位置属性
      this.cube.position.x = this.properties.position.value.x;
      this.cube.position.y = this.properties.position.value.y;
      this.cube.position.z = this.properties.position.value.z;

      // 更新旋转属性
      /* this.cube.rotation.x = this.properties.rotation.value.x
      this.cube.rotation.y = this.properties.rotation.value.y
      this.cube.rotation.z = this.properties.rotation.value.z */
      this.cube.rotation.set(
        this.properties.rotation.value.x,
        this.properties.rotation.value.y,
        this.properties.rotation.value.z
      );

      // 更新平移属性
      this.cube.translateX(this.properties.translate.value.x);
      this.cube.translateY(this.properties.translate.value.y);
      this.cube.translateZ(this.properties.translate.value.z);

      this.cube.visible = this.cubeVisible;
    },
    createCube() {
      const material = new THREE.MeshLambertMaterial({ color: 0x44ff44 }); // 创建材质对象material
      const geom = new THREE.BoxGeometry(5, 4, 3); // 创建几何对象geom
      this.cube = new THREE.Mesh(geom, material); // 创建网格对象cube
      this.cube.castShadow = true;
      this.scene.add(this.cube); // 将网格对象添加到场景
      console.log(this.cube);
    },
    render() {
      this.updateCubeProperties();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
  padding: 10px;
  background-color: #fff;
  border: 1px solid #c3c3c3;
}
.vertice-span {
  line-height: 38px;
  padding: 0 2px;
}
</style>