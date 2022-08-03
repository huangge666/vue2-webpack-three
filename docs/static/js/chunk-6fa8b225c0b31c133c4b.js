"use strict";(self.webpackChunkmy_webpack_vue=self.webpackChunkmy_webpack_vue||[]).push([[818],{2818:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var i=function(){return(0,this._self._c)("div",{ref:"three",staticClass:"three",attrs:{id:"three"}})};i._withStripped=!0;var o=n(5785),a=n(5861),r=n(4687),s=n.n(r),d=n(9477),l=n(9365),c=n(2086),h=n(2666),m=n(1217),u=n(8496);const p={name:"demoVue4",data:function(){return{Scene:null,Renderer:null,Camera:null,Model:null,Lights:null,AnimationMixer:null,Tclock:new d.SUY,Controls:null,GridHelper:new d.VLJ(300,50,65298,16777215),models:[{name:"机械测试",path:"static/fbx/cs/机械测试.fbx",position:[0,0,50],type:"fbx"},{name:"大缸",path:"static/fbx/cs/02.fbx",position:[0,0,5],type:"fbx"},{name:"青铁牛",path:"static/fbx/cs/青铁牛.fbx",position:[0,0,5],type:"fbx"}],STATE:{showGrid:!1,showLightOrigin:!1,wireframe:!1}}},methods:{init:function(){var e=this;return(0,a.Z)(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setScene(),e.setRenderer(),e.setCamera(),e.addControls(),e.addLight(),e.modelLoader(e.models[0]),e.animation(),e.switchModel();case 8:case"end":return t.stop()}}),t)})))()},setScene:function(){var e=new d.xsS;e.background=(new d.dpR).load(u),this.Scene=e},setRenderer:function(){var e=document.getElementById("three"),t=new d.CP7({antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setSize(e.clientWidth,e.clientHeight),t.shadowMap.enabled=!0,t.physicallyCorrectLights=!0,t.outputEncoding=d.knz,this.Renderer=t,e.appendChild(t.domElement)},setCamera:function(){this.Camera=new d.cPb(45,window.innerWidth/window.innerHeight,1,1e4),this.Camera.position.set(0,0,50),this.Camera.lookAt(this.Scene.position)},modelLoader:function(e){var t=this,n=this.addLoadTip();this.Controls.autoRotate=!1,e.hdr&&this.HdrLoader(e.hdr);var i="",a=e.type||"glb";if(-1!="glb,gltf".indexOf(a))i=new m.E;else{if(-1=="fbx".indexOf(a))return void(n.textContent="请使用glb,gltf,fbx格式模型");i=new c.y}i.load(e.path,(function(i){var r;n.textContent="加载完成！",t.Model&&t.Scene.remove(t.Model),(r=t.Camera.position).set.apply(r,(0,o.Z)(e.position)),t.Model=-1!="fbx".indexOf(a)?i:i.scene,t.Model.traverse((function(t){e.texture&&e.texture.map((function(e){-1!=e.name.indexOf(t.name)&&(t.material=new d.xoR({map:d.PpQ.loadTexture(e.path)}))})),t.isMesh&&(t.material.shininess=1,t.castShadow=!0,t.receiveShadow=!0,t.material.transparent=!0,t.material.opacity=1)})),t.setScaleToFitSize(i),t.ModelAutoCenter(t.Model),t.Model.animations.length>0&&(t.AnimationMixer=new d.Xcj(t.Model),t.AnimationMixer.clipAction(t.Model.animations[0]).play()),t.Scene.add(t.Model),setTimeout((function(){n.style.display="none",t.Controls.autoRotate=!0}),1e3)}),(function(e){n.textContent=parseInt(e.loaded/e.total*100)+"%加载中..."}),(function(e){n.textContent="模型加载失败！"}))},addLight:function(){var e=this;this.Lights=[{name:"AmbientLight",obj:new d.Mig(16777215,1.5)},{name:"DirectionalLight",obj:new d.Ox3(16777215,1),position:[80,100,50]}],this.Lights.map((function(t){var n;t.obj.name=t.name,t.position&&(n=t.obj.position).set.apply(n,(0,o.Z)(t.position)),t.Helper=new d.xG9(t.obj),e.Scene.add(t.obj)}))},HdrLoader:function(e){var t=this,n=new d.anP(this.Renderer);n.compileEquirectangularShader(),(new h.x).load(e,(function(e,i){var o=n.fromEquirectangular(e).texture;o.isPmremTexture=!0,n.dispose(),t.Scene.environment=o,t.Scene.background=o}))},addControls:function(){this.Controls=new l.z(this.Camera,this.Renderer.domElement),this.Controls.enableDamping=!0,this.Controls.enableZoom=!0,this.Controls.minDistance=0,this.Controls.maxDistance=200,this.Controls.enablePan=!1,this.Controls.dampingFactor=.5,this.Controls.autoRotate=!1,this.Controls.autoRotateSpeed=1},switchModel:function(){var e=document.getElementById("three"),t=this,n=document.createElement("style");n.type="text/css",n.innerText+=".modelList{position:fixed;width:100%; display:flex;justify-content:space-around; bottom:0;left:0;color:#0EF4F4;background:rgba(14,14,44,0.9);cursor:pointer;}                .modelList li{width:50%;line-height:30px;padding:5px;text-align:center;font-size:14px;}.modelList li:last-child{border:0;}.modelList li:hover,.modelList li.on{background:#0E2440;}";var i=document.createElement("ul");i.className="modelList",this.models.map((function(e,t){i.innerHTML+='<li class="'+(0==t?"on":"")+'">'+e.name+"</li>"})),document.head.insertBefore(n,document.head.lastChild),e.insertBefore(i,e.firstChild);for(var o=i.children,a=function(e){o[e].onclick=function(){for(var n=0;n<o.length;n++)o[n].className="";this.className="on",t.modelLoader(t.models[e])}},r=0;r<o.length;r++)a(r)},addLoadTip:function(){var e=document.getElementById("three");document.querySelector(".loadTip")&&e.removeChild(document.querySelector(".loadTip"));var t=document.createElement("div");return t.className="loadTip",t.style.cssText+="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:5px;background-color:rgba(0,0,0,0.5);padding:5px 10px;color:#fff;",e.appendChild(t),t},ModelAutoCenter:function(e){var t=new d.ZzF;t.expandByObject(e);var n=new d.Pa4;t.getCenter(n),e.position.x=e.position.x-n.x,e.position.y=e.position.y-n.y,e.position.z=e.position.z-n.z},animation:function(){var e=this;this.Renderer.render(this.Scene,this.Camera),this.Controls.update(),this.AnimationMixer&&this.AnimationMixer.update(this.Tclock.getDelta()),requestAnimationFrame((function(){return e.animation()}))},onWindowResize:function(){this.Camera.aspect=window.innerWidth/window.innerHeight,this.Camera.updateProjectionMatrix(),this.Renderer.setSize(window.innerWidth,window.innerHeight),this.Renderer.render(this.Scene,this.Camera)},getFitScaleValue:function(e){var t=new d.fQA(e);t.geometry.computeBoundingBox();var n=t.geometry.boundingBox,i=Math.max(n.max.x-n.min.x,n.max.y-n.min.y,n.max.z-n.min.z);return this.Camera.position.z/i},setScaleToFitSize:function(e){var t=.5*this.getFitScaleValue(e);return e.scale.set(t,t,t),t}},mounted:function(){var e=this;this.init(),window.onresize=function(){return e.onWindowResize()}}};const f=(0,n(1900).Z)(p,i,[],!1,null,"364dc7df",null).exports},8496:(e,t,n)=>{e.exports=n.p+"static/images/8e4fe26be1ecf22c0d5d.jpg"}}]);
//# sourceMappingURL=chunk-6fa8b225c0b31c133c4b.js.map