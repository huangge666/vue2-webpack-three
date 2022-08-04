// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 设置贴图
import { SetCarMaterial } from "./SetCarMaterial.js";
// 标注热点
import { CreateCarTag } from "./PointsTag.js";
// 开门动画
import { open } from "./open";
// 加载轿车前灯发光模拟
import { lensflare1, lensflare2 } from "./carLight";
// 事件总线
import eventBus from "../../tools/eventBus";

//声明一个组对象，用来添加加载成功的三维场景
const model = new THREE.Group();
//创建一个GLTF加载器
const loader = new GLTFLoader();

let percentage = 100;

loader.load("./static/model/轿车.glb", (gltf) => {
  // gltf加载成功后返回一个对象
  // console.log('控制台查看gltf对象结构', gltf);

  //设置车模型不同零部件的材质效果
  SetCarMaterial(gltf.scene);

  // 标注热点
  CreateCarTag(gltf.scene);

  // 车门打开
  open(gltf.scene);

  // 访问需要标注特点的位置
  // console.log(gltf.scene.getObjectByName('右前光标'));

  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);

  /**
   *  灯光载入模型
   */
  // glrt模型中用来给车灯定位的空物体,获取坐标，用来在openCarLight.js文件中生成发光效果
  var light1 = gltf.scene.getObjectByName("镜头光晕1");
  var light2 = gltf.scene.getObjectByName("镜头光晕2");
  light1.add(lensflare1);
  light2.add(lensflare2);
}, (xhr) => {
  // console.log(xhr.loaded, xhr.total);
  percentage = +((xhr.loaded / xhr.total) * 100).toFixed(0);
  eventBus.$emit("on-percentage", percentage);
}, (err) => {
  console.log({ err });
})

export { model, percentage };
