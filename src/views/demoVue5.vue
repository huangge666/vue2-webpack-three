<template>
  <div id="three"
       class="three"
       ref="three">
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import BG from "@/assets/images/bg.jpg";

export default {
  name: "demoVue4",
  data() {
    return {
      Scene: null,
      Renderer: null,
      Camera: null,
      Model: null,
      Lights: null,
      AnimationMixer: null,
      Tclock: new THREE.Clock(),
      Controls: null,
      GridHelper: new THREE.GridHelper(300, 50, 0x00ff12, 0xffffff),
      models: [
        {
          name: "机械测试",
          path: "static/fbx/cs/机械测试.fbx",
          position: [0, 0, 50],
          type: "fbx",
        },
        {
          name: "大缸",
          path: "static/fbx/cs/02.fbx",
          position: [0, 0, 5],
          type: "fbx",
        },
        {
          name: "青铁牛",
          path: "static/fbx/cs/青铁牛.fbx",
          position: [0, 0, 5],
          type: "fbx",
        },
      ],
      STATE: {
        showGrid: false,
        showLightOrigin: false,
        wireframe: false,
      },
    };
  },
  methods: {
    async init() {
      this.setScene();
      this.setRenderer();
      this.setCamera();
      this.addControls();
      this.addLight();
      this.modelLoader(this.models[0]);
      //添加辅助面板
      this.animation();
      this.switchModel();
    },
    setScene() {
      const scene = new THREE.Scene();
      // scene.background = new THREE.Color(0x282923);
      scene.background = new THREE.TextureLoader().load(BG);
      this.Scene = scene;
    },
    setRenderer() {
      const element = document.getElementById("three");

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // 透明背景
      });
      // 设置渲染器的像素比例，按照设备
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      // renderer.setClearColor(0xeeeeee);
      renderer.shadowMap.enabled = true;
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;

      this.Renderer = renderer;

      element.appendChild(renderer.domElement);
    },
    setCamera() {
      this.Camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.Camera.position.set(0, 0, 50);
      this.Camera.lookAt(this.Scene.position);
    },
    //加载模型GLTF FBX
    modelLoader(MODEL) {
      const loadTip = this.addLoadTip();

      this.Controls.autoRotate = false;
      //添加环境hdr
      MODEL.hdr && this.HdrLoader(MODEL.hdr);

      let Loader = "",
        MTYPE = MODEL.type || "glb";

      if ("glb,gltf".indexOf(MTYPE) != -1) {
        Loader = new GLTFLoader();
      } else if ("fbx".indexOf(MTYPE) != -1) {
        Loader = new FBXLoader();
      } else {
        loadTip.textContent = "请使用glb,gltf,fbx格式模型";
        return;
      }

      Loader.load(
        MODEL.path,
        (geometry) => {
          loadTip.textContent = "加载完成！";
          //移除模型
          this.Model && this.Scene.remove(this.Model);

          //设置相机位置
          this.Camera.position.set(...MODEL.position);

          this.Model = "fbx".indexOf(MTYPE) != -1 ? geometry : geometry.scene;

          // console.log(this.Model, "this.Model");
          //遍历模型字节点，获取相关参数设置
          this.Model.traverse(function (child) {
            if (MODEL.texture) {
              MODEL.texture.map((item) => {
                if (item.name.indexOf(child.name) != -1) {
                  child.material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture(item.path), //颜色贴图
                  });
                }
              });
            }

            if (child.isMesh) {
              // child.material.emissiveMap = child.material.map;

              //child.material.side = THREE.DoubleSide;
              child.material.shininess = 1;

              child.castShadow = true;
              child.receiveShadow = true;

              child.material.transparent = true; //材质允许透明 如果有玻璃材质时开启
              child.material.opacity = 1; //材质默认透明度
            }
          });

          this.setScaleToFitSize(geometry);

          //模型自动居中
          this.ModelAutoCenter(this.Model);

          //查找模型动画，
          if (this.Model.animations.length > 0) {
            this.AnimationMixer = new THREE.AnimationMixer(this.Model);
            this.AnimationMixer.clipAction(this.Model.animations[0]).play();
          }

          //把模型放入场景中
          this.Scene.add(this.Model);

          //加载完成后开始自动播放
          setTimeout(() => {
            loadTip.style.display = "none";
            this.Controls.autoRotate = true;
          }, 1000);
        },
        (xhr) => {
          //加载进度
          loadTip.textContent =
            parseInt((xhr.loaded / xhr.total) * 100) + "%加载中...";
        },
        (err) => {
          loadTip.textContent = "模型加载失败！";
          console.log("模型加载失败！");
        }
      );
    },
    //加载光源
    addLight: function () {
      // this.Lights = [
      //   { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 1) },
      //   {
      //     name: "DirectionalLight_top",
      //     obj: new THREE.DirectionalLight(0xffffff, 3),
      //     position: [0, 15, 0],
      //   },
      //   {
      //     name: "DirectionalLight_bottom",
      //     obj: new THREE.DirectionalLight(0x1b1b1b, 3),
      //     position: [0, -200, 0],
      //   },
      //   {
      //     name: "DirectionalLight_right1",
      //     obj: new THREE.DirectionalLight(0xffffff, 1.5),
      //     position: [0, -5, 20],
      //   },
      //   {
      //     name: "DirectionalLight_right2",
      //     obj: new THREE.DirectionalLight(0xffffff, 1.5),
      //     position: [0, -5, -20],
      //   },
      // ];
      this.Lights = [
        { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 1.5) },
        {
          name: "DirectionalLight",
          obj: new THREE.DirectionalLight(0xffffff, 1),
          position: [80, 100, 50],
        },
      ];

      this.Lights.map((item) => {
        item.obj.name = item.name;
        item.position && item.obj.position.set(...item.position);
        item.Helper = new THREE.PointLightHelper(item.obj);
        this.Scene.add(item.obj);
      });
    },

    //加载HDR贴图环境光
    HdrLoader: function (HDR) {
      const pmremGenerator = new THREE.PMREMGenerator(this.Renderer); // 使用hdr作为背景色
      pmremGenerator.compileEquirectangularShader();
      const textureLoader = new RGBELoader();
      textureLoader.load(HDR, (texture, textureData) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        envMap.isPmremTexture = true;
        pmremGenerator.dispose();

        this.Scene.environment = envMap; // 给场景添加环境光效果
        this.Scene.background = envMap; // 给场景添加背景图
      });
    },
    //添加事件
    addControls() {
      this.Controls = new OrbitControls(this.Camera, this.Renderer.domElement);
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.Controls.enableDamping = true;
      //是否可以缩放
      this.Controls.enableZoom = true;
      //设置相机距离原点的最远距离-可以控制缩放程度
      this.Controls.minDistance = 0;
      //设置相机距离原点的最远距离
      this.Controls.maxDistance = 200; //800
      //是否开启右键拖拽
      this.Controls.enablePan = false;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.Controls.dampingFactor = 0.5;
      //是否自动旋转
      this.Controls.autoRotate = false;
      this.Controls.autoRotateSpeed = 1;
    },
    //模型切换
    switchModel() {
      const element = document.getElementById("three");

      const _scope = this;

      var switchModelStyle = document.createElement("style");
      switchModelStyle.type = "text/css";
      switchModelStyle.innerText +=
        ".modelList{position:fixed;width:100%; display:flex;justify-content:space-around; bottom:0;left:0;color:#0EF4F4;background:rgba(14,14,44,0.9);cursor:pointer;}\
                .modelList li{width:50%;line-height:30px;padding:5px;text-align:center;font-size:14px;}.modelList li:last-child{border:0;}.modelList li:hover,.modelList li.on{background:#0E2440;}";

      const modelUL = document.createElement("ul");
      modelUL.className = "modelList";

      this.models.map((item, index) => {
        modelUL.innerHTML +=
          '<li class="' + (index == 0 ? "on" : "") + '">' + item.name + "</li>";
      });

      document.head.insertBefore(switchModelStyle, document.head.lastChild);
      element.insertBefore(modelUL, element.firstChild);

      let LIS = modelUL.children;

      for (let i = 0; i < LIS.length; i++) {
        LIS[i].onclick = function () {
          for (let j = 0; j < LIS.length; j++) {
            LIS[j].className = "";
          }
          this.className = "on";
          console.log(this, i, "this");
          _scope.modelLoader(_scope.models[i]);
        };
      }
    },

    //添加加载进度
    addLoadTip() {
      const element = document.getElementById("three");
      document.querySelector(".loadTip") &&
        element.removeChild(document.querySelector(".loadTip"));
      let loadTip = document.createElement("div");
      loadTip.className = "loadTip";
      loadTip.style.cssText +=
        "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:5px;background-color:rgba(0,0,0,0.5);padding:5px 10px;color:#fff;";
      element.appendChild(loadTip);
      return loadTip;
    },
    ModelAutoCenter(group) {
      /**
       * 包围盒全自动计算：模型整体居中
       */
      var box3 = new THREE.Box3();
      // 计算层级模型group的包围盒
      // 模型group是加载一个三维模型返回的对象，包含多个网格模型
      box3.expandByObject(group);
      // 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
      var center = new THREE.Vector3();
      box3.getCenter(center);
      // console.log('查看几何体中心坐标', center);

      // 重新设置模型的位置，使之居中。
      group.position.x = group.position.x - center.x;
      group.position.y = group.position.y - center.y;
      group.position.z = group.position.z - center.z;
    },
    //添加辅助面板
    animation: function () {
      //更新控制器
      this.Renderer.render(this.Scene, this.Camera);
      this.Controls.update();
      this.AnimationMixer && this.AnimationMixer.update(this.Tclock.getDelta());
      requestAnimationFrame(() => this.animation());
    },
    onWindowResize: function () {
      this.Camera.aspect = window.innerWidth / window.innerHeight;
      this.Camera.updateProjectionMatrix();
      this.Renderer.setSize(window.innerWidth, window.innerHeight);
      this.Renderer.render(this.Scene, this.Camera);
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
      console.log(maxDiameter, this.Camera.position.z);
      return this.Camera.position.z / maxDiameter;
    },
    //设置模型到适合观察的大小
    setScaleToFitSize(obj) {
      var scaleValue = this.getFitScaleValue(obj) * 0.5;
      obj.scale.set(scaleValue, scaleValue, scaleValue);
      return scaleValue;
    },
  },
  mounted() {
    this.init();
    window.onresize = () => this.onWindowResize();
  },
};
</script>

<style lang="scss" scoped>
.three {
  width: 100vw;
  height: 100vh;
  // background-image: url("../assets/images/bg.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
}
</style>
