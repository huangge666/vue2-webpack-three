<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "Demo",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 场景
    const scene = new THREE.Scene();

    // 摄像机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 渲染器
    const canvas = document.querySelector("#three");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 渲染增加阴影
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.shadowMap.enabled = true;
    // 渲染器 end

    // 平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // 设置投影
    plane.receiveShadow = true;
    // 平面 end

    // 物体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 同时将cube的材质从MeshBasicMaterial换为MeshLamberMaterial，因为最基本的MeshBasicMaterial材质对光源不会有任何反应。
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // 调整物体当前位置
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;

    // 物品投射阴影
    cube.castShadow = true;
    scene.add(cube);
    // 物体 end

    // 光源
    const spotLight = new THREE.SpotLight(0xffffff);
    const spotLightColor = new THREE.Color(0x26e250); //创建颜色对象color
    spotLight.color = spotLightColor; // 给聚光灯修改颜色
    spotLight.position.set(-40, 60, 40);
    spotLight.angle = 1.1/3;
    scene.add(spotLight);

    // 设置投影
    spotLight.castShadow = true;
    // 光源 end

    // 轨道控制器 开启交互效果（旋转、平移、缩放）
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 单纯渲染无动画
    // renderer.render(scene, camera);

    // 渲染带动画 通过跳转 x,y轴实现动画效果
    function animate() {
      controls.update();
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    animate();
  },
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
