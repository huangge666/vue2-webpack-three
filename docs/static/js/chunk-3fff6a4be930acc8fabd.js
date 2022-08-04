"use strict";(self.webpackChunkmy_webpack_vue=self.webpackChunkmy_webpack_vue||[]).push([[488],{6488:(t,e,n)=>{n.r(e),n.d(e,{default:()=>D});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"car-model"},[t.percentage<100?e("div",{staticClass:"mask"},[e("el-progress",{attrs:{"text-inside":!0,"stroke-width":24,percentage:t.percentage,status:"success"}})],1):t._e(),t._v(" "),e("div",{staticClass:"light",on:{click:function(e){return t.lightEvent()}}},[t._v("\n    "+t._s(t.light?"关灯":"开灯")+"\n  ")])])};i._withStripped=!0;var a=n(9477),s=n(9365),o=n(7970),r=window.innerWidth,l=window.innerHeight,u=new a.xsS,c=new a.Ox3(16777215,.8);c.position.set(400,200,300),u.add(c);var h=new a.Ox3(16777215,.8);h.position.set(-400,-200,-300),u.add(h);var p=new a.Mig(16777215,.9);u.add(p),u.fog=new a.ybr(13421772,1200,3500);var d=new a.cPb(30,r/l,1,3e4);d.position.set(-621,357,357),d.lookAt(0,0,0);var v=new a.CP7({antialias:!0});v.setPixelRatio(window.devicePixelRatio),v.setSize(r,l),v.outputEncoding=a.knz,v.setClearColor(13421772,1);var f=new s.z(d,v.domElement);f.minDistance=500,f.maxDistance=1200,f.maxPolarAngle=Math.PI/2*.9,window.onresize=function(){v.setSize(window.innerWidth,window.innerHeight),d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix()},function t(){o.w&&o.w.update(),v.render(u,d),requestAnimationFrame(t)}();var m=n(1217);(new a.cBK).setPath("./static/model/envMap/").load(["px.jpg","nx.jpg","py.jpg","ny.jpg","pz.jpg","nz.jpg"]).encoding=a.knz;var w=new a.SJI,_=new a.BbS(w),g=new a.BbS(w),y=new a.mTL;y.load("./static/model/open.wav",(function(t){_.setBuffer(t),_.setVolume(.4)})),y.load("./static/model/close.wav",(function(t){g.setBuffer(t),g.setVolume(1)}));var b=[];function x(t,e,n,i,a){var s={angle:e},r=new o.w.Tween(s);return r.to({angle:n},1e3),r.onUpdate((function(){"y"==t?i.rotation.y=s.angle:i.rotation.z=s.angle})),"open"==a?r.onStart((function(){_.play()})):r.onComplete((function(){g.play()})),r}addEventListener("click",(function(t){var e=t.clientX,n=t.clientY,i=e/window.innerWidth*2-1,s=-n/window.innerHeight*2+1,o=new a.iMs;o.setFromCamera(new a.FM8(i,s),d);var r=o.intersectObjects(b);if(r.length>0){var l=r[0].object.door;"close"==l.state?(l.state="open",l.openTween.start()):(l.state="close",l.closeTween.start())}}));class M extends a.Kj0{constructor(){super(M.Geometry,new a.vBJ({opacity:0,transparent:!0})),this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const t=new a.Pa4,e=new a.Pa4,n=new a.Wzm(16,16,a.wk1),i=new a.Wzm(16,16,a.wk1),s=M.Geometry,o=new a.FIo({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec3 screenPosition;\n\t\t\t\tuniform vec2 scale;\n\n\t\t\t\tattribute vec3 position;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );\n\n\t\t\t\t}",fragmentShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );\n\n\t\t\t\t}",depthTest:!0,depthWrite:!1,transparent:!1}),r=new a.FIo({uniforms:{map:{value:n},scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec3 screenPosition;\n\t\t\t\tuniform vec2 scale;\n\n\t\t\t\tattribute vec3 position;\n\t\t\t\tattribute vec2 uv;\n\n\t\t\t\tvarying vec2 vUV;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvUV = uv;\n\n\t\t\t\t\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );\n\n\t\t\t\t}",fragmentShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform sampler2D map;\n\n\t\t\t\tvarying vec2 vUV;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_FragColor = texture2D( map, vUV );\n\n\t\t\t\t}",depthTest:!1,depthWrite:!1,transparent:!1}),l=new a.Kj0(s,o),u=[],c=I.Shader,h=new a.FIo({uniforms:{map:{value:null},occlusionMap:{value:i},color:{value:new a.Ilk(16777215)},scale:{value:new a.FM8},screenPosition:{value:new a.Pa4}},vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:a.WMw,transparent:!0,depthWrite:!1}),p=new a.Kj0(s,h);this.addElement=function(t){u.push(t)};const d=new a.FM8,v=new a.FM8,f=new a.TUj,m=new a.Ltg;this.onBeforeRender=function(a,c,w){a.getCurrentViewport(m);const _=m.w/m.z,g=m.z/2,y=m.w/2;let b=16/m.w;if(d.set(b*_,b),f.min.set(m.x,m.y),f.max.set(m.x+(m.z-16),m.y+(m.w-16)),e.setFromMatrixPosition(this.matrixWorld),e.applyMatrix4(w.matrixWorldInverse),!(e.z>0)&&(t.copy(e).applyMatrix4(w.projectionMatrix),v.x=m.x+t.x*g+g-8,v.y=m.y+t.y*y+y-8,f.containsPoint(v))){a.copyFramebufferToTexture(v,n);let e=o.uniforms;e.scale.value=d,e.screenPosition.value=t,a.renderBufferDirect(w,null,s,o,l,null),a.copyFramebufferToTexture(v,i),e=r.uniforms,e.scale.value=d,e.screenPosition.value=t,a.renderBufferDirect(w,null,s,r,l,null);const c=2*-t.x,f=2*-t.y;for(let e=0,n=u.length;e<n;e++){const n=u[e],i=h.uniforms;i.color.value.copy(n.color),i.map.value=n.texture,i.screenPosition.value.x=t.x+c*n.distance,i.screenPosition.value.y=t.y+f*n.distance,b=n.size/m.w;const o=m.w/m.z;i.scale.value.set(b*o,b),h.uniformsNeedUpdate=!0,a.renderBufferDirect(w,null,s,h,p,null)}}},this.dispose=function(){o.dispose(),r.dispose(),h.dispose(),n.dispose(),i.dispose();for(let t=0,e=u.length;t<e;t++)u[t].texture.dispose()}}}M.prototype.isLensflare=!0;class I{constructor(t,e=1,n=0,i=new a.Ilk(16777215)){this.texture=t,this.size=e,this.distance=n,this.color=i}}I.Shader={uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\tprecision highp float;\n\n\t\tuniform vec3 screenPosition;\n\t\tuniform vec2 scale;\n\n\t\tuniform sampler2D occlusionMap;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\n\t\tvarying vec2 vUV;\n\t\tvarying float vVisibility;\n\n\t\tvoid main() {\n\n\t\t\tvUV = uv;\n\n\t\t\tvec2 pos = position.xy;\n\n\t\t\tvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\n\n\t\t\tvVisibility =        visibility.r / 9.0;\n\t\t\tvVisibility *= 1.0 - visibility.g / 9.0;\n\t\t\tvVisibility *=       visibility.b / 9.0;\n\n\t\t\tgl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tprecision highp float;\n\n\t\tuniform sampler2D map;\n\t\tuniform vec3 color;\n\n\t\tvarying vec2 vUV;\n\t\tvarying float vVisibility;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texture = texture2D( map, vUV );\n\t\t\ttexture.a *= vVisibility;\n\t\t\tgl_FragColor = texture;\n\t\t\tgl_FragColor.rgb *= color;\n\n\t\t}"},M.Geometry=function(){const t=new a.u9r,e=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),n=new a.vpT(e,5);return t.setIndex([0,1,2,0,2,3]),t.setAttribute("position",new a.kB5(n,3,0,!1)),t.setAttribute("uv",new a.kB5(n,2,3,!1)),t}();var P=(new a.dpR).load("./static/model/lensflare.jpg"),S=new I(P,600,0,new a.Ilk(16777215)),k=new M;k.addElement(S);var C=new M;C.addElement(S),k.visible=!1,C.visible=!1;var E=new a.ZAu,T=new m.E,O=100;T.load("./static/model/轿车.glb",(function(t){!function(t){t.traverse((function(e){if("Mesh"===e.type){switch(e.name.slice(0,2)){case"外壳":e.material=new a.EJi({color:e.material.color,clearcoat:1,clearcoatRoughness:.01,metalness:.9,roughness:.5,envMapIntensity:2.5});break;case"玻璃":e.material=new a.EJi({color:0,metalness:0,roughness:0,transparent:!0,transmission:.5,opacity:.5});break;case"轮胎":e.material.color.set(0),e.material.normalScale.set(2,2),e.material.metalness=0,e.material.roughness=.6;break;case"塑料":e.material=new a.EJi({color:65793,metalness:0,roughness:.8,envMapIntensity:1})}switch(e.name.slice(0,3)){case"后视镜":e.material=new a.Wid({color:16777215,metalness:1,roughness:0,envMapIntensity:1});break;case"前灯罩":e.material=new a.EJi({color:16777215,metalness:0,roughness:0,transmission:.9,transparent:!0,envMapIntensity:2.5,opacity:.9})}switch(e.name.slice(0,4)){case"高光金属":e.material=new a.Wid({color:e.material.color,metalness:1,roughness:.2,envMapIntensity:1});break;case"尾灯灯罩":e.material=new a.EJi({color:16711680,metalness:0,roughness:0,transmission:.5,transparent:!0,envMapIntensity:2.5,opacity:.5});break;case"尾灯发光":e.material=new a.YBo({color:6684672})}switch(e.name.slice(0,5)){case"尾灯第二层":e.material=new a.EJi({color:4456448,metalness:0,roughness:0,transmission:.5,transparent:!0,opacity:.5});break;case"尾灯第三层":e.material=new a.YBo({color:421068800})}t.getObjectByName("天窗黑玻璃").material=new a.EJi({color:0,metalness:0,roughness:0,envMapIntensity:1,transmission:.2,transparent:!0,opacity:.8}),t.getObjectByName("车座").material=new a.EJi({color:131586,metalness:0,roughness:.6,envMapIntensity:1})}}))}(t.scene),function(t){var e=15,n=[];["右前光标","右后光标","左前光标","左后光标","后备箱光标"].forEach((function(i){var s=new a.xeV({map:(new a.dpR).load("./static/model/光点.png"),transparent:!0}),o=new a.jyi(s);o.scale.set(e,e,1),t.getObjectByName(i).add(o),"右前光标"==i||"右后光标"==i?o.position.z-=o.scale.x/2:"左前光标"==i||"左后光标"==i?o.position.z+=o.scale.x/2:"后备箱光标"==i&&(o.position.x+=o.scale.x/2),n.push(o)}));var i=0;!function t(){i+=.01,n.forEach((function(t){i<.5?(t.scale.x=e*(1+i),t.scale.y=e*(1+i)):i>=.5&&i<1?(t.scale.x=e*(2-i),t.scale.y=e*(2-i)):i=0})),requestAnimationFrame(t)}()}(t.scene),function(t){var e=["右前门","右后门","左前门","左后门","后备箱"];["右前光标","右后光标","左前光标","左后光标","后备箱光标"].forEach((function(n,i){var a=t.getObjectByName(n).children[0];b.push(a),a.door=t.getObjectByName(e[i]),a.door.state="close";var s=a.door,o=a.door.name;"右前门"==o||"右后门"==o?(s.openTween=x("y",0,Math.PI/3,s,"open"),s.closeTween=x("y",Math.PI/3,0,s,"close")):"左前门"==o||"左后门"==o?(s.openTween=x("y",0,-Math.PI/3,s,"open"),s.closeTween=x("y",-Math.PI/3,0,s,"close")):"后备箱"==o&&(s.openTween=x("z",0,Math.PI/3,s,"open"),s.closeTween=x("z",Math.PI/3,0,s,"close"))}))}(t.scene),E.add(t.scene);var e=t.scene.getObjectByName("镜头光晕1"),n=t.scene.getObjectByName("镜头光晕2");e.add(k),n.add(C)}),(function(t){O=+(t.loaded/t.total*100).toFixed(0)}),(function(t){}));const j={name:"Car",data:function(){return{percentage:O,light:!1}},methods:{lightEvent:function(){this.light=!this.light,this.light?(k.visible=!0,C.visible=!0,p.intensity=.3):(k.visible=!1,C.visible=!1,p.intensity=.9)}},mounted:function(){u.add(E),this.$el.appendChild(v.domElement)}};const D=(0,n(1900).Z)(j,i,[],!1,null,"eea33432",null).exports},7970:(t,e,n)=>{n.d(e,{w:()=>o});var i=function(){this._tweens={},this._tweensAddedDuringUpdate={}};i.prototype={getAll:function(){return Object.keys(this._tweens).map(function(t){return this._tweens[t]}.bind(this))},removeAll:function(){this._tweens={}},add:function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},remove:function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},update:function(t,e){var n=Object.keys(this._tweens);if(0===n.length)return!1;for(t=void 0!==t?t:o.now();0<n.length;){this._tweensAddedDuringUpdate={};for(var i=0;i<n.length;i++){var a=this._tweens[n[i]];a&&!1===a.update(t)&&(a._isPlaying=!1,e||delete this._tweens[n[i]])}n=Object.keys(this._tweensAddedDuringUpdate)}return!0}};var a,s,o=new i;o.Group=i,o._nextId=0,o.nextId=function(){return o._nextId++},"undefined"==typeof self&&{env:{NODE_DEV:"prodction"}}.hrtime?o.now=function(){var t={env:{NODE_DEV:"prodction"}}.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof self&&void 0!==self.performance&&void 0!==self.performance.now?o.now=self.performance.now.bind(self.performance):void 0!==Date.now?o.now=Date.now:o.now=function(){return(new Date).getTime()},o.Tween=function(t,e){this._object=t,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._repeat=0,this._repeatDelayTime=void 0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=null,this._easingFunction=o.Easing.Linear.None,this._interpolationFunction=o.Interpolation.Linear,this._chainedTweens=[],this._onStartCallback=null,this._onStartCallbackFired=!1,this._onUpdateCallback=null,this._onCompleteCallback=null,this._onStopCallback=null,this._group=e||o,this._id=o.nextId()},o.Tween.prototype={getId:function(){return this._id},isPlaying:function(){return this._isPlaying},to:function(t,e){return this._valuesEnd=Object.create(t),void 0!==e&&(this._duration=e),this},duration:function(t){return this._duration=t,this},start:function(t){for(var e in this._group.add(this),this._isPlaying=!0,this._onStartCallbackFired=!1,this._startTime=void 0!==t?"string"==typeof t?o.now()+parseFloat(t):t:o.now(),this._startTime+=this._delayTime,this._valuesEnd){if(this._valuesEnd[e]instanceof Array){if(0===this._valuesEnd[e].length)continue;this._valuesEnd[e]=[this._object[e]].concat(this._valuesEnd[e])}void 0!==this._object[e]&&(this._valuesStart[e]=this._object[e],this._valuesStart[e]instanceof Array==0&&(this._valuesStart[e]*=1),this._valuesStartRepeat[e]=this._valuesStart[e]||0)}return this},stop:function(){return this._isPlaying&&(this._group.remove(this),this._isPlaying=!1,null!==this._onStopCallback&&this._onStopCallback(this._object),this.stopChainedTweens()),this},end:function(){return this.update(1/0),this},stopChainedTweens:function(){for(var t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop()},group:function(t){return this._group=t,this},delay:function(t){return this._delayTime=t,this},repeat:function(t){return this._repeat=t,this},repeatDelay:function(t){return this._repeatDelayTime=t,this},yoyo:function(t){return this._yoyo=t,this},easing:function(t){return this._easingFunction=t,this},interpolation:function(t){return this._interpolationFunction=t,this},chain:function(){return this._chainedTweens=arguments,this},onStart:function(t){return this._onStartCallback=t,this},onUpdate:function(t){return this._onUpdateCallback=t,this},onComplete:function(t){return this._onCompleteCallback=t,this},onStop:function(t){return this._onStopCallback=t,this},update:function(t){var e,n,i;if(t<this._startTime)return!0;for(e in!1===this._onStartCallbackFired&&(null!==this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),n=(t-this._startTime)/this._duration,n=0===this._duration||1<n?1:n,i=this._easingFunction(n),this._valuesEnd)if(void 0!==this._valuesStart[e]){var a=this._valuesStart[e]||0,s=this._valuesEnd[e];s instanceof Array?this._object[e]=this._interpolationFunction(s,i):("string"==typeof s&&(s="+"===s.charAt(0)||"-"===s.charAt(0)?a+parseFloat(s):parseFloat(s)),"number"==typeof s&&(this._object[e]=a+(s-a)*i))}if(null!==this._onUpdateCallback&&this._onUpdateCallback(this._object),1!==n)return!0;if(0<this._repeat){for(e in isFinite(this._repeat)&&this._repeat--,this._valuesStartRepeat){if("string"==typeof this._valuesEnd[e]&&(this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(this._valuesEnd[e])),this._yoyo){var o=this._valuesStartRepeat[e];this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=o}this._valuesStart[e]=this._valuesStartRepeat[e]}return this._yoyo&&(this._reversed=!this._reversed),void 0!==this._repeatDelayTime?this._startTime=t+this._repeatDelayTime:this._startTime=t+this._delayTime,!0}null!==this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var r=0,l=this._chainedTweens.length;r<l;r++)this._chainedTweens[r].start(this._startTime+this._duration);return!1}},o.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){return t*t*(2.70158*t-1.70158)},Out:function(t){return--t*t*(2.70158*t+1.70158)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((1+e)*t-e)*.5:.5*((t-=2)*t*((1+e)*t+e)+2)}},Bounce:{In:function(t){return 1-o.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*o.Easing.Bounce.In(2*t):.5*o.Easing.Bounce.Out(2*t-1)+.5}}},o.Interpolation={Linear:function(t,e){var n=t.length-1,i=n*e,a=Math.floor(i),s=o.Interpolation.Utils.Linear;return e<0?s(t[0],t[1],i):1<e?s(t[n],t[n-1],n-i):s(t[a],t[n<a+1?n:a+1],i-a)},Bezier:function(t,e){for(var n=0,i=t.length-1,a=Math.pow,s=o.Interpolation.Utils.Bernstein,r=0;r<=i;r++)n+=a(1-e,i-r)*a(e,r)*t[r]*s(i,r);return n},CatmullRom:function(t,e){var n=t.length-1,i=n*e,a=Math.floor(i),s=o.Interpolation.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(a=Math.floor(i=n*(1+e))),s(t[(a-1+n)%n],t[a],t[(a+1)%n],t[(a+2)%n],i-a)):e<0?t[0]-(s(t[0],t[0],t[1],t[1],-i)-t[0]):1<e?t[n]-(s(t[n],t[n],t[n-1],t[n-1],i-n)-t[n]):s(t[a?a-1:0],t[a],t[n<a+1?n:a+1],t[n<a+2?n:a+2],i-a)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=o.Interpolation.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:(s=[1],function(t){var e=1;if(s[t])return s[t];for(var n=t;1<n;n--)e*=n;return s[t]=e}),CatmullRom:function(t,e,n,i,a){var s=.5*(n-t),o=.5*(i-e),r=a*a;return(2*e-2*n+s+o)*(a*r)+(-3*e+3*n-2*s-o)*r+s*a+e}}},a=void 0,"function"==typeof define&&define.amd?define([],(function(){return o})):"undefined"!=typeof module&&"object"==typeof exports?module.exports=o:void 0!==a&&(a.TWEEN=o)}}]);
//# sourceMappingURL=chunk-3fff6a4be930acc8fabd.js.map