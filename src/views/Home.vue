<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");
      const canvas = document.querySelector("#three");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      // 加影子 begin
      renderer.shadowMap.enabled = true;
      // end
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;

      const gltfLoader = new GLTFLoader();
      gltfLoader.load("/gltf/scene.gltf", (gltf) => {
        var model = gltf.scene;

        //添加这段代码
        //遍历模型每部分
        model.traverse((o) => {
          //将图片作为纹理加载
          let explosionTexture = new THREE.TextureLoader().load(
            "/gltf/scene.png"
          );
          //调整纹理图的方向
          explosionTexture.flipY = false;
          //将纹理图生成基础网格材质(MeshBasicMaterial)
          const material = new THREE.MeshBasicMaterial({
            map: explosionTexture,
          });
          //给模型每部分上材质
          o.material = material;

          //加这句，让模型等每个部分都能产生阴影
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        model.rotateY(0.005);
        scene.add(model);
      });

      // 添加光影
      // let floorGeometry = new THREE.PlaneGeometry(3000, 3000);
      // let floorMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      // let floor = new THREE.Mesh(floorGeometry, floorMaterial);
      // floor.rotation.x = -0.5 * Math.PI;
      // floor.receiveShadow = true;
      // floor.position.y = -0.001;
      // scene.add(floor);

      // const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      // //光源等位置
      // dirLight.position.set(-10, 8, -5);
      // //可以产生阴影
      // dirLight.castShadow = true;
      // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      // scene.add(dirLight);

      // const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      // hemLight.position.set(0, 48, 0);
      // scene.add(hemLight);

      function resizeRendererToDisplaySize(renderer) {
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
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        //添加下面代码
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
      }
      animate();
    },
  },
  mounted() {
    this.initThree();
  },
};
</script>

<style lang="scss" scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
