import * as THREE from "three";
// 引入threejs镜头光晕扩展库
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";

// 引入场景中灯光
import { directionalLight, directionalLight2, ambient } from "./RendererCamera";

/**
 * 灯光贴图
 */
// 加载灯光纹理贴图
const texLoader = new THREE.TextureLoader();
// 用于镜头光晕的纹理对象
const texture = texLoader.load("./static/model/lensflare.jpg");
// 创建两个镜头光晕Lensflare对象，分别用来模拟车前面左右两个车灯的发光效果，具体位置查看model.js文件
const lensflareElement = new LensflareElement(
  texture,
  600, //600:设置光晕像素大小
  0,
  new THREE.Color(0xffffff)
);

/**
 * 灯光对象
 */
// 创建灯光对象
// 灯光一
var lensflare1 = new Lensflare();
lensflare1.addElement(lensflareElement); // Lensflare可以根据需要包含多个LensflareElement
// 灯光二
var lensflare2 = new Lensflare();
lensflare2.addElement(lensflareElement);

/**
 * 灯光控制
 */
// 开启车灯
function openCarLight () {
  // 镜头光晕对象可见
  lensflare1.visible = true;
  lensflare2.visible = true;
  // 弱光：弱光下，车灯发光对比更明显 调整灯光的强度
  // directionalLight.intensity = 0.0;
  // directionalLight2.intensity = 0.0;
  ambient.intensity = 0.3;
}

// 车灯关闭
function closeCarLight () {
  // 镜头光晕对象隐藏
  lensflare1.visible = false;
  lensflare2.visible = false;
  // 亮光
  // directionalLight.intensity = 0.8;
  // directionalLight2.intensity = 0.8;
  ambient.intensity = 0.9;
}

// 初始化：镜头光晕对象隐藏
lensflare1.visible = false;
lensflare2.visible = false;

export {
  lensflare1, //导出,在modejs中加载并设置到车灯附近
  lensflare2,
  openCarLight, //在html文件中调用，UI按钮发生鼠标事件触发，进行开关灯
  closeCarLight,
};
