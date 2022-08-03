// 引入Three.js
import * as THREE from "three";
// 引入Three.js扩展库
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { model } from "./model";

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
let width = window.innerWidth; //窗口文档显示区的宽度
let height = window.innerHeight; //窗口文档显示区的高度

/**
 * 场景
 */
const scene = new THREE.Scene();

/**
 * 光源设置
 */
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// 雾化效果
scene.fog = new THREE.Fog(0xcccccc, 1200, 3500);

/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 30000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
camera.position.set(-621, 357, 357); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xffffff, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// gltf模型纹理贴图自动加载默认是THREE.sRGBEncoding，注意设置WebGL渲染器和gltf纹理保持一致
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0xcccccc, 1);

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键 enableRotate
// 缩放：滚动鼠标中键 enableZoom
// 平移：拖动鼠标右键 enablePan
const controls = new OrbitControls(camera, renderer.domElement);

// 距离的具体指，3D操作三维场景，同时通过渲染循环计算相机与目标的距离
// //相机距离观察目标点极小距离——模型最大状态
controls.minDistance = 500;
// //相机距离观察目标点极大距离——模型最小状态
controls.maxDistance = 1200;

// 上下旋转最大值设置
controls.maxPolarAngle = (Math.PI / 2) * 0.9;

scene.add(model); //产品三维模型添加到场景中

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

// 渲染循环
function render () {
  //tween更新(渲染时间相关,便于动画计算)
  // eslint-disable-next-line no-undef
  TWEEN && TWEEN.update();

  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export { renderer, camera, scene, directionalLight, directionalLight2, ambient };
