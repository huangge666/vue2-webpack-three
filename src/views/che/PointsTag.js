// 引入Three.js
import * as THREE from "three";

function CreateCarTag (carModel) {
  //精灵缩放倍数
  const scale = 15;
  // 模型标签名
  const tagNameArr = [
    "右前光标",
    "右后光标",
    "左前光标",
    "左后光标",
    "后备箱光标",
  ];
  // 标签数组(精灵图)
  const tagArr = [];

  tagNameArr.forEach(name => {
    // 配置贴图
    const spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load("./static/model/光点.png"), //设置精灵纹理贴图
      transparent: true,
    });
    // 创建精灵
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(scale, scale, 1); //大小设置

    // 指定模型部分插入精灵图
    const tagObj = carModel.getObjectByName(name);
    tagObj.add(sprite);

    // 调整位置：根据sprite大小平移，任意观察角度都避免精灵插入到车体内
    if (name == "右前光标" || name == "右后光标") {
      sprite.position.z -= sprite.scale.x / 2;
    } else if (name == "左前光标" || name == "左后光标") {
      sprite.position.z += sprite.scale.x / 2;
    } else if (name == "后备箱光标") {
      sprite.position.x += sprite.scale.x / 2;
    }

    tagArr.push(sprite);
  })

  /**
  * 循环缩放动画
  */
  // 设置标注精灵Sprite波动，提示用户点击
  let s = 0.0;

  // 设置帧动画
  function waveAnimation () {
    // 每次自增0.01
    s += 0.01;
    tagArr.forEach((sprite) => {
      // 放大动画
      if (s < 0.5) {
        sprite.scale.x = scale * (1 + s);
        sprite.scale.y = scale * (1 + s);
      } else if (s >= 0.5 && s < 1.0) {
        // 缩放动画
        sprite.scale.x = scale * (2 - s);
        sprite.scale.y = scale * (2 - s);
      } else {
        // 极限值：超出或等于1，则重置为0
        s = 0.0;
      }
    });

    requestAnimationFrame(waveAnimation);
  }
  waveAnimation();
}

export { CreateCarTag };
