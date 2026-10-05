import {industrial} from './worlds/industrial.js';
import {binary} from './worlds/binary.js';
import {pelagic} from './worlds/pelagic.js';
import {castle} from './worlds/castle.js';

export const VIEWPOINTS={
 hub:[{name:'轨道总览',position:[103,70,119],target:[0,4,-23]},{name:'主馆底部',position:[54,-25,47],target:[0,-7,-8]},{name:'机械近景',position:[26,15,29],target:[0,11,-8]}],
 digital:[{name:'数字流域',position:[32,18,72],target:[0,7,-36]},{name:'穿入数据',position:[0,8,40],target:[0,8,-70]},{name:'高处垂流',position:[33,64,23],target:[0,0,-35]}],
 ocean:[{name:'汪洋全景',position:[43,18,68],target:[-6,1,-65]},{name:'潜入深蓝',position:[14,-14,27],target:[-16,-22,-22]},{name:'潮汐近景',position:[-2,5,26],target:[-15,5,-30]}],
 infinity:[{name:'千重回廊',position:[10,21,53],target:[0,0,-68]},{name:'倒置天井',position:[-10,39,51],target:[0,0,-72],up:[0,-1,0]},{name:'格栅与灯影',position:[12,10,19],target:[25,9,-8]}]
};
export function createWorld(id){return({hub:industrial,digital:binary,ocean:pelagic,infinity:castle}[id]||industrial)();}
export function disposeWorld(world){const geometries=new Set(),materials=new Set(),textures=new Set();world.scene.traverse(o=>{if(o.shadow)o.shadow.dispose();if(o.userData.previewTarget)o.userData.previewTarget.dispose();if(o.userData.waterTarget)o.userData.waterTarget.dispose();if(o.geometry)geometries.add(o.geometry);for(const mat of(Array.isArray(o.material)?o.material:[o.material]))if(mat){materials.add(mat);for(const value of Object.values(mat))if(value?.isTexture)textures.add(value);if(mat.uniforms)for(const u of Object.values(mat.uniforms))if(u.value?.isTexture)textures.add(u.value);}});geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());world.scene.clear();}
