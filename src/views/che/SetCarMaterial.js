// 引入Three.js
import * as THREE from "three";

// // 加载环境贴图
var textureCube = new THREE.CubeTextureLoader()
  .setPath("./static/model/envMap/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.encoding = THREE.sRGBEncoding; //设置纹理贴图编码方式和WebGL渲染器一致

function SetCarMaterial (carModel) {
  // console.log("汽车模型", carModel);

  // 递归遍历批量更改所有Mesh的材质
  carModel.traverse((object) => {
    //判断是否是网格模型，mesh的父对象组group是没有材质的
    if (object.type === "Mesh") {
      // 两字
      switch (object.name.slice(0, 2)) {
        case "外壳": //整个外壳、相同材质的车门外壳等
          object.material = new THREE.MeshPhysicalMaterial({
            color: object.material.color, //默认颜色
            // color: 0x6a030a,//红色
            // color: 0x222222,//灰色
            // color: 0x000000,//黑色
            // color: 0xffffff,//银白色
            clearcoat: 1,
            clearcoatRoughness: 0.01,
            metalness: 0.9,
            roughness: 0.5,
            envMapIntensity: 2.5,
          });
          break;
        case "玻璃":
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 0,
            roughness: 0,
            transparent: true,
            transmission: 0.5, //transmission替代opacity  envMapIntensity: 2.5,
            opacity: 0.5,
          });
          break;
        case "轮胎":
          object.material.color.set(0x000000);
          object.material.normalScale.set(2, 2); //加强法线贴图凹凸效果
          object.material.metalness = 0.0;
          object.material.roughness = 0.6;
          break;
        case "塑料":
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0x010101,
            metalness: 0.0,
            roughness: 0.8,
            envMapIntensity: 1.0,
          });
          break;
        default:
          break;
      }
      // 三字
      switch (object.name.slice(0, 3)) {
        case "后视镜":
          object.material = new THREE.MeshStandardMaterial({
            color: 0xffffff, //白色
            metalness: 1.0,
            roughness: 0.0,
            //   envMapIntensity控制环境贴图的影响
            envMapIntensity: 1.0,
          });
          break;
        case "前灯罩":
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            // envMapIntensity: 1.0,
            transmission: 0.9,
            transparent: true,
            envMapIntensity: 2.5,
            opacity: 0.9,
          });
          break;

        default:
          break;
      }
      // 四字
      switch (object.name.slice(0, 4)) {
        case "高光金属":
          object.material = new THREE.MeshStandardMaterial({
            color: object.material.color, //读取材质原来的颜色
            metalness: 1.0,
            roughness: 0.2,
            //   envMapIntensity控制环境贴图的影响
            envMapIntensity: 1.0,
          });
          break;
        case "尾灯灯罩":
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            metalness: 0,
            roughness: 0,
            transmission: 0.5,
            transparent: true,
            envMapIntensity: 2.5,
            opacity: 0.5,
          });
          break;
        case "尾灯发光":
          object.material = new THREE.MeshLambertMaterial({
            color: 0x660000,
          });
          break;
        default:
          break;
      }
      // 五字
      switch (object.name.slice(0, 5)) {
        case "尾灯第二层":
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0x440000,
            metalness: 0,
            roughness: 0,
            transmission: 0.5,
            transparent: true,
            opacity: 0.5,
          });
          break;
        case "尾灯第三层":
          object.material = new THREE.MeshLambertMaterial({
            color: 0x19190000,
          });
          break;
        default:
          break;
      }
      // 天窗黑玻璃
      carModel.getObjectByName("天窗黑玻璃").material =
        new THREE.MeshPhysicalMaterial({
          color: 0x00000,
          metalness: 0,
          roughness: 0,
          envMapIntensity: 1.0,
          transmission: 0.2, // .transmission属性用于设置玻璃材质
          transparent: true,
          opacity: 0.8,
        });
      // 车座
      carModel.getObjectByName("车座").material =
        new THREE.MeshPhysicalMaterial({
          color: 0x020202,
          metalness: 0.0,
          roughness: 0.6,
          envMapIntensity: 1.0,
        });

      //批量设置环境贴图
      // object.material.envMap = textureCube;
    }
  });
}
export { SetCarMaterial };
