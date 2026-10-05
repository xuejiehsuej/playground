import {T,rng,stars} from './kit.js';

// Each instance is one readable binary glyph, moving in a genuine 3D field.
export function binary(){const scene=new T.Scene();scene.background=new T.Color('#020c0d');const r=rng(91),c=document.createElement('canvas');c.width=128;c.height=96;const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.font='500 76px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('0',32,49);ctx.fillText('1',96,49);const atlas=new T.CanvasTexture(c);atlas.minFilter=T.LinearFilter;atlas.magFilter=T.LinearFilter;
 const base=new T.PlaneGeometry(.74,1.06),g=new T.InstancedBufferGeometry();g.index=base.index.clone();g.attributes.position=base.attributes.position.clone();g.attributes.uv=base.attributes.uv.clone();base.dispose();const values=[],origins=[];
 // A hollow river of code running through the scene, surrounded by falling streams.
 for(let col=0;col<88;col++){const seed=r();for(let row=0;row<110;row++){values.push(col/88*Math.PI*2,row,seed,1);origins.push(0,0,0);}}
 for(let col=0;col<230;col++){const x=(r()-.5)*200,z=(r()-.5)*280,seed=r();if(Math.abs(x)<20&&z>-70&&z<80)continue;for(let row=0;row<95;row++){values.push(0,row,seed,0);origins.push(x,0,z);}}
 g.setAttribute('aData',new T.InstancedBufferAttribute(new Float32Array(values),4));g.setAttribute('aOrigin',new T.InstancedBufferAttribute(new Float32Array(origins),3));g.instanceCount=values.length/4;scene.userData.binaryGlyphs=g.instanceCount;
 const mat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,uniforms:{uTime:{value:0},uAtlas:{value:atlas}},vertexShader:`
 attribute vec4 aData;attribute vec3 aOrigin;uniform float uTime;varying vec2 vUv;varying float vDigit;varying float vAlpha;varying float vHead;
 float hash(float n){return fract(sin(n)*43758.5453);}
 void main(){float seed=aData.z;float speed=3.+seed*6.;float lane=aData.x;float row=aData.y;vec3 p=aOrigin;
 if(aData.w>.5){float z=mod(row*1.6+seed*32.-uTime*speed,176.)-100.;float a=lane+z*.022+sin(z*.015+uTime*.12)*.14;float radius=23.+3.*sin(z*.045+lane*2.);p=vec3(cos(a)*radius,sin(a)*radius+8.,z);}
 else{p.y=mod(row*1.48+seed*160.-uTime*speed,141.)-60.;}
 float trail=fract(row*.023+seed-uTime*.018*speed);vHead=pow(trail,24.);vAlpha=(.16+pow(trail,2.)*.75);vDigit=step(.5,hash(row*12.3+seed*77.+floor(uTime*.7)));vUv=uv;vec4 mv=modelViewMatrix*vec4(p,1.);mv.xy+=position.xy*(aData.w>.5?1.:.86);gl_Position=projectionMatrix*mv;vAlpha*=smoothstep(290.,75.,-mv.z);}
 `,fragmentShader:`uniform sampler2D uAtlas;varying vec2 vUv;varying float vDigit;varying float vAlpha;varying float vHead;void main(){float a=texture2D(uAtlas,vec2((vUv.x+vDigit)*.5,vUv.y)).a;if(a<.05)discard;vec3 col=mix(vec3(.12,.8,.55),vec3(.8,1.,.91),vHead);gl_FragColor=vec4(col,a*vAlpha);}`});const flow=new T.Mesh(g,mat);flow.frustumCulled=false;scene.add(flow);stars(scene,600,350,'#64bda2');
 return{scene,portals:[],pose:{position:[32,18,72],target:[0,7,-36]},caption:'BINARY CONSCIOUSNESS<br>SECTOR 01 — 0101 / ENDLESS FLOW',animate(t){mat.uniforms.uTime.value=t;}};
}
