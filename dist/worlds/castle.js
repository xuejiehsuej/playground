import {T,rng,material,glow,surface,batch,lighting,rail,stars} from './kit.js';

import {cityMotion} from './castle-motion.js';

function cityBatch(scene) {
 const sectors=new Map();let selected;
 function select(x,y,z){
  const ix=x < -16 ? -1 : x > 16 ? 1 : 0;
  const iy=y < -13 ? -1 : y > 23 ? 1 : 0;
  const iz=z < -79 ? -1 : z > -31 ? 1 : 0;
  const key=[ix,iy,iz].join(',');
  if(!sectors.has(key)){
   const group=new T.Group();group.name='castle-sector-'+key;
   group.position.set(ix*36,5+iy*36,-55+iz*48);
   scene.add(group);sectors.set(key,{group,batch:batch(group)});
  }
  selected=sectors.get(key).batch;return selected;
 }
 const router={select,finish(){
  let total=0;for(const {group,batch:b} of sectors.values()){
   total+=b.finish();
   // Geometry was authored in world coordinates; preserve its initial placement.
   for(const mesh of group.children)mesh.position.copy(group.position).negate();
  }
  scene.userData.instances=total;scene.userData.cityBlocks=sectors.size;
  return [...sectors.values()].map(s=>s.group);
 }};
 for(const name of ['box','round','sphere','cylinder','beam','transform','identity'])
  router[name]=(...args)=>selected[name](...args);
 return router;
}

export function castle(){const scene=new T.Scene();scene.background=new T.Color('#100c14');scene.fog=new T.FogExp2('#100c14',.006);lighting(scene,'#8a7d94','#22181e',1.2);const warm=new T.DirectionalLight('#ffbd85',2.5);warm.position.set(-18,25,38);scene.add(warm);const b=cityBatch(scene),m={wood:surface('wood','#805444'),dark:surface('wood','#30242b'),floor:surface('tatami','#c1aa7f'),border:material('#37463e',.05,.8),roof:surface('metal','#333343',.4),trim:surface('wood','#b17a56'),paper:surface('paper','#d1b991'),brass:material('#aa8a58',.7,.3),lamp:glow('#ffd39d',1.4),black:material('#201b24')};m.paper.emissive=new T.Color('#e8ad70');m.paper.emissiveIntensity=.32;
 let rooms=0;
 function room(x,y,z,ry=0,rz=0,scale=1,detail=true,target=b){rooms++;if(target===b)b.select(x,y,z);target.transform(x,y,z,ry,rz,scale);const q=target;
 q.box(m.dark,0,-.35,0,10.5,.65,8.6);q.box(m.trim,0,-.06,0,10.8,.12,8.8);q.box(m.wood,0,.02,0,10.3,.1,8.3);
 // Individual tatami panels with dark woven edges and wooden perimeter boards.
 for(let ix=-1;ix<=1;ix++)for(let iz=0;iz<2;iz++){q.box(m.border,ix*2.8,.1,-1.85+iz*3.4,2.77,.11,3.36);q.box(m.floor,ix*2.8,.16,-1.85+iz*3.4,2.65,.05,3.21);}
 for(const xx of [-4.6,4.6])for(const zz of [-3.6,3.6]){q.box(m.wood,xx,2.4,zz,.3,4.8,.3);q.box(m.trim,xx,.4,zz,.39,.65,.39);q.box(m.brass,xx,.75,zz,.4,.07,.4);q.box(m.dark,xx,4.4,zz,.65,.22,.5);}
 // Layered roof, projecting eaves, ridge and exposed rafters.
 for(const side of [-1,1]){q.box(m.roof,0,5.38,side*2.12,11.5,.28,4.5,side*.15,0,0);q.box(m.trim,0,4.93,side*4.32,11.7,.15,.28);q.box(m.dark,0,4.72,side*3.73,10.2,.24,.28);}
 q.box(m.brass,0,5.77,0,11.8,.16,.21);
 for(let xx=-5.3;xx<=5.4;xx+=detail?.55:1.1){q.box(m.wood,xx,4.8,0,.12,.14,9);if(detail)for(const side of [-1,1])q.cylinder(m.roof,xx,5.42,side*2.1,.14,4.3,.14,Math.PI/2+side*.15,0,0);}
 // Shoji: independent panels, rails, lattice, handles and carved transom.
 for(let panel=0;panel<4;panel++){const xx=-3.3+panel*2.2,open=detail&&panel===2?.52:0;q.box(m.paper,xx+open,2.25,-3.48+panel*.018,2.13,3.8,.045);q.box(m.wood,xx-1.08+open,2.25,-3.38,.075,3.95,.075);q.box(m.wood,xx+1.08+open,2.25,-3.38,.075,3.95,.075);for(let row=0;row<6;row++)q.box(m.wood,xx+open,.4+row*.67,-3.36,2.2,.035,.05);if(detail){for(let col=0;col<5;col++)q.box(m.wood,xx-.9+col*.45+open,2.25,-3.35,.03,3.85,.055);q.cylinder(m.black,xx+.84+open,2,-3.28,.12,.025,.12,Math.PI/2,0,0);}}
 q.box(m.trim,0,.22,-3.4,9.2,.08,.22);q.box(m.trim,0,4.29,-3.4,9.3,.15,.28);q.box(m.dark,0,4.56,-3.5,9.3,.5,.08);if(detail)for(let j=0;j<12;j++){const xx=-4.2+j*.75;q.beam(m.trim,[xx,4.35,-3.35],[xx+.35,4.72,-3.35],.035);q.beam(m.trim,[xx+.35,4.72,-3.35],[xx+.7,4.35,-3.35],.035);}
 for(let xx=-4.6;xx<=4.7;xx+=.46){q.box(m.wood,xx,.92,4,.065,1.4,.07);if(detail)q.box(m.trim,xx,1.4,4,.11,.1,.11);}q.box(m.trim,0,1.63,4,10,.13,.2);q.box(m.dark,0,.38,4,10,.11,.16);q.box(m.dark,0,1.12,4,10,.07,.12);
 // Ribbed lantern, suspension, caps and fittings.
 q.sphere(m.lamp,0,3.58,1.6,.78,1.12,.78);q.cylinder(m.dark,0,4.18,1.6,.56,.12,.56);q.cylinder(m.dark,0,2.98,1.6,.5,.13,.5);q.cylinder(m.brass,0,4.55,1.6,.025,.65,.025);if(detail){for(let k=0;k<8;k++){const a=k/8*Math.PI*2;q.beam(m.wood,[Math.cos(a)*.21,3.05,1.6+Math.sin(a)*.21],[Math.cos(a)*.39,3.58,1.6+Math.sin(a)*.39],.021);q.beam(m.wood,[Math.cos(a)*.39,3.58,1.6+Math.sin(a)*.39],[Math.cos(a)*.21,4.1,1.6+Math.sin(a)*.21],.021);}q.cylinder(m.brass,0,2.84,1.6,.03,.22,.03);}
 target.identity();
 }
 // Sixteen levels and eleven bays on both sides, plus rear and outer wings.
 for(let lv=-7;lv<9;lv++){for(let d=0;d<11;d++){const z=14-d*12.5,detail=lv>=-3&&lv<=5&&d<6;room(-25,lv*7.2+(d%2)*.6,z,Math.PI/2,0,1,detail);room(25,lv*7.2+(d%2)*.6,z,-Math.PI/2,0,1,detail);}for(let x=-3;x<=3;x++)room(x*11.4,lv*7.2,-133,0,0,1,false);}
 for(let lv=-4;lv<6;lv++)for(let d=0;d<5;d++){room(-48,lv*10,-d*23,Math.PI/2,0,1.25,false);room(48,lv*10,-d*23,-Math.PI/2,0,1.25,false);}
 room(0,-14,25,0,0,1.45,true);room(-7,49,-38,0,Math.PI,1.4,true);room(3,-42,-24,0,Math.PI/2,1.3,true);
 room(-3,14,-68,0,Math.PI/2,1.3,true);room(11,22,-82,0,Math.PI,1.2,true);room(-17,5,-86,0,0,1.1,true);
 function stairs(x,y,z,direction=1){b.select(x+9.75*direction,y+4.5,z);for(let i=0;i<30;i++){const xx=x+i*.65*direction,yy=y+i*.3;b.box(m.wood,xx,yy,z,.7,.18,2.2);b.box(m.trim,xx,yy+.11,z,.72,.025,2.24);for(const side of [-1,1]){b.box(m.wood,xx,yy+.65,z+side*1.04,.055,1.3,.07);if(i<29)b.beam(m.trim,[xx,yy+1.35,z+side*1.04],[xx+.65*direction,yy+1.65,z+side*1.04],.09);}}}
 for(let j=0;j<16;j++){const z=3-j*8,y=-28+(j%8)*8;b.select(0,y,z);b.box(m.dark,0,y,z,49,.26,2.5);for(let x=-24;x<25;x+=1)b.box(m.wood,x,y+.16,z,.94,.06,2.4);rail(b,m.trim,null,[-24,y+.2,z+1.25],[24,y+.2,z+1.25],1.2);if(j%2===0)stairs(-11,y-9,z-3);}
 stairs(-10,-7,-13);stairs(10,14,-42,-1);stairs(-12,-32,-83);
 const r=rng(222);for(let i=0;i<150;i++){const x=(r()-.5)*80,y=(r()-.5)*120,z=-r()*145;b.select(x,y,z);b.sphere(m.lamp,x,y,z,.25,.55,.25);b.cylinder(m.dark,x,y+.31,z,.3,.08,.3);}
 const motes=stars(scene,1400,230,'#f1bb8a');motes.material.size=.06;const motion=cityMotion(b.finish());scene.userData.rooms=rooms;
 return{scene,portals:[],pose:{position:[10,21,53],target:[0,0,-68]},caption:'THE INFINITE INTERIOR<br>SECTOR 03 — ROOMS WITHIN ROOMS',reconfigure(instant){motion.reconfigure(instant);},animate(t,camera,dt){motion.update(dt);motes.rotation.y=t*.003;}};
}
