import * as T from 'three';
export class SpatialNavigation {
  constructor(camera,canvas,onInteract){this.camera=camera;this.canvas=canvas;this.target=new T.Vector3();this.keys=new Set();this.pointers=new Map();this.enabled=true;this.onInteract=onInteract;this.moved=false;this.zoomMin=2;this.zoomMax=700;
    canvas.addEventListener('pointerdown',e=>{if(!this.enabled)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.moved=false;});
    canvas.addEventListener('pointermove',e=>{if(!this.enabled||!this.pointers.has(e.pointerId))return;const old=this.pointers.get(e.pointerId),dx=e.clientX-old.x,dy=e.clientY-old.y;if(Math.abs(dx)+Math.abs(dy)>1)this.moved=true;if(this.pointers.size===2){const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)[1];const before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(e.clientX-other.x,e.clientY-other.y);this.dolly((before-after)*.008);this.pan(dx*.5,dy*.5);}else if(e.shiftKey||e.buttons===2)this.pan(dx,dy);else this.orbit(dx,dy);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(this.moved)this.onInteract();});
    const release=e=>this.pointers.delete(e.pointerId);canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('contextmenu',e=>e.preventDefault());
    const wheel=e=>{if(!this.enabled)return;e.preventDefault();this.dolly(Math.max(-.25,Math.min(.25,e.deltaY*.001)));this.onInteract();};
    canvas.addEventListener('wheel',wheel,{passive:false});
    document.querySelector('#portal-labels')?.addEventListener('wheel',wheel,{passive:false});
    window.addEventListener('keydown',e=>{if(!this.enabled||e.target.matches('input,textarea,select')||document.querySelector('dialog[open]'))return;if(['w','a','s','d','q','e','r','f','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();this.keys.add(e.key);this.onInteract();}if(e.key==='Home'){e.preventDefault();this.reset();}});
    window.addEventListener('keyup',e=>this.keys.delete(e.key));window.addEventListener('blur',()=>this.keys.clear());
  }
  setPose(pose){this.pose=pose;this.reset();}
  reset(){this.camera.position.fromArray(this.pose.position);this.target.fromArray(this.pose.target);this.camera.up.set(0,1,0);this.camera.lookAt(this.target);this.keys.clear();this.pointers.clear();}
  orbit(dx,dy){const offset=this.camera.position.clone().sub(this.target),right=new T.Vector3(1,0,0).applyQuaternion(this.camera.quaternion);const qYaw=new T.Quaternion().setFromAxisAngle(this.camera.up.clone().normalize(),-dx*.004),qPitch=new T.Quaternion().setFromAxisAngle(right,-dy*.004);offset.applyQuaternion(qYaw).applyQuaternion(qPitch);this.camera.up.applyQuaternion(qPitch).normalize();this.camera.position.copy(this.target).add(offset);this.camera.lookAt(this.target);}
  pan(dx,dy){const scale=this.camera.position.distanceTo(this.target)*.0015;const delta=new T.Vector3(-dx*scale,dy*scale,0).applyQuaternion(this.camera.quaternion);this.translate(delta);}
  translate(delta){const next=this.target.clone().add(delta);if(next.length()>800)return;this.target.copy(next);this.camera.position.add(delta);}
  dolly(amount){const offset=this.camera.position.clone().sub(this.target);offset.setLength(T.MathUtils.clamp(offset.length()*Math.exp(amount),this.zoomMin,this.zoomMax));this.camera.position.copy(this.target).add(offset);}
  roll(angle){const axis=this.target.clone().sub(this.camera.position).normalize();this.camera.up.applyAxisAngle(axis,angle).normalize();this.camera.lookAt(this.target);}
  update(dt){if(!this.enabled)return;const speed=dt*15,delta=new T.Vector3();if(this.keys.has('w')||this.keys.has('ArrowUp'))delta.z-=speed;if(this.keys.has('s')||this.keys.has('ArrowDown'))delta.z+=speed;if(this.keys.has('a')||this.keys.has('ArrowLeft'))delta.x-=speed;if(this.keys.has('d')||this.keys.has('ArrowRight'))delta.x+=speed;if(this.keys.has('r'))delta.y+=speed;if(this.keys.has('f'))delta.y-=speed;delta.applyQuaternion(this.camera.quaternion);this.translate(delta);if(this.keys.has('q'))this.roll(dt*.7);if(this.keys.has('e'))this.roll(-dt*.7);}
}
