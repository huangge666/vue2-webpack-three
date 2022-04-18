<template>
  <div>
    <div id="container"
         class="three-container">
      <div class="title">
        <div class="_title">唐彩绘陶武士俑</div>
        <div class="_sub-title">头戴冠，怒目圆睁，身披盔甲，腰束宽带，足穿靴，踏于兽形座上，右臂叉腰，左臂握拳上举，俑身绘红褐彩。该俑表情威严，给人一种不怒自威、孔武有力的感觉。</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default {
  name: "demoVue",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
      controls: null,
    };
  },
  methods: {
    init() {
      this.createScene();
      this.createCamera();
      this.createRender();
      this.createControls();
      this.createLight();
      this.setHDR();
      this.loadModel();
      this.render();
    },
    // 创建场景
    createScene() {
      const scene = new THREE.Scene();
      // const loader = new THREE.TextureLoader();
      // const bgTexture = loader.load("static/bg.jpg");
      // scene.background = bgTexture;
      // scene.background = new THREE.TextureLoader().load("static/bg.jpg");
      this.scene = scene;
    },
    // 创建摄像机
    createCamera() {
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.set(0, 400, 300);
      this.camera = camera;
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      element.appendChild(renderer.domElement);

      // 设置渲染器的像素比例，按照设备
      renderer.setPixelRatio(window.devicePixelRatio);
      // 色调映射属性.toneMapping用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围(HDR)效果
      renderer.toneMapping = THREE.ReinhardToneMapping;
      // 色调映射的曝光级别。默认是1,曝光度值越大，图像亮度越高
      // 可以尝试不同值去测试显示效果 比如0:看不到  0.1:很暗  200:过于亮，轮廓感不清楚
      renderer.toneMappingExposure = 1;
      //是否乘以gamma输出，默认值false
      renderer.gammaOutput = true;

      renderer.physicallyCorrectLights = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      this.renderer = renderer;
    },
    setHDR() {
      const scene = this.scene;
      new RGBELoader()
        // .setDataType(THREE.UnsignedByteType)
        .load("static/fbx/cs/startup.hdr", (texture) => {
          console.log(texture, "texture");
          const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
          pmremGenerator.compileEquirectangularShader();
          // const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          const envMap = pmremGenerator.fromCubemap(texture).texture;

          scene.environment = envMap;
          // scene.background = envMap;
          texture.dispose();
          pmremGenerator.dispose();
        });
    },
    // 创建光源
    createLight() {
      this.scene.add(new THREE.AmbientLight(0xffffff, 1.5));

      // 平行光
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(80, 100, 50);
      this.scene.add(directionalLight);

      // //给场景添加太阳光
      // let Sun = new THREE.DirectionalLight(0xffffff, 1);
      // Sun.position.set(20, 20, 20);
      // Sun.castShadow = true;

      // //设置相机渲染面积
      // Sun.shadow.camera.near = 0.01;
      // Sun.shadow.camera.far = 60;
      // Sun.shadow.camera.top = 22;
      // Sun.shadow.camera.bottom = -22;
      // Sun.shadow.camera.left = -35;
      // Sun.shadow.camera.right = 35;
      // //设置阴影分辨率
      // Sun.shadow.mapSize.width = 2048; // default
      // Sun.shadow.mapSize.height = 2048; // default
      // //阴影限制
      // Sun.shadow.radius = 1;
      // this.scene.add(Sun);
    },
    // 创建控件
    createControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 200, 0);
      //是否可以缩放
      controls.enableZoom = false;
      //是否开启右键拖拽
      controls.enablePan = false;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      controls.dampingFactor = 0.5;
      controls.autoRotate = true;
      this.controls = controls;
    },
    // 渲染
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();

      // 通过requestAnimationFrame实现周期性调用render
      requestAnimationFrame(this.render);
    },
    loadModel() {
      let _self = this;
      let loader = new FBXLoader();

      return new Promise((resolve, reject) => {
        // const texturePlante = THREE.ImageUtils.loadTexture(
        //   "static/fbx/cs/_image_Color.png",
        //   null,
        //   function (t) {}
        // ); //模型贴图
        // loader.load("static/fbx/cs/机械测试.fbx", function (mesh) {
        loader.load("static/fbx/cs/02.fbx", function (mesh) {
          _self.setScaleToFitSize(mesh);
          mesh.position.set(0, 100, 0);
          console.log(mesh, "fbx模型");

          mesh.traverse(function (child) {
            // const material = new THREE.MeshPhongMaterial({
            //   map: texturePlante,
            // });
            // child.material = material;

            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.emissiveMap = child.material.map;
            }
          });
          _self.scene.add(mesh);
          // console.log(new THREE.AnimationMixer(mesh), "AnimationMixer");
        }),
          (error) => {
            // 模型加载出错的回调函数
            console.log("error while loading", error);
            reject("load model error", error);
          };
      });
    },
    //获取模型适合观察的缩放的比例
    getFitScaleValue(obj) {
      var boxHelper = new THREE.BoxHelper(obj);
      boxHelper.geometry.computeBoundingBox();
      var box = boxHelper.geometry.boundingBox;
      var maxDiameter = Math.max(
        box.max.x - box.min.x,
        box.max.y - box.min.y,
        box.max.z - box.min.z
      );
      return this.camera.position.z / maxDiameter;
    },
    //设置模型到适合观察的大小
    setScaleToFitSize(obj) {
      var scaleValue = this.getFitScaleValue(obj);
      obj.scale.set(scaleValue, scaleValue, scaleValue);
      console.log(scaleValue, "setScaleToFitSize");
      return scaleValue;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  .title {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    letter-spacing: 2px;

    ._title {
      font-size: 22px;
    }

    ._sub-title {
      margin-top: 20px;
      font-size: 16px;
      line-height: 26px;
    }
  }
}
</style>
