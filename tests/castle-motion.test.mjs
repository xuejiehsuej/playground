import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {cityMotion} from '../dist/worlds/castle-motion.js';

function fixture() {
  const blocks=[];
  for (const x of [-36,0,36]) for(const y of [-36,0,36]) for(const z of [-48,0,48]) {
    const b=new T.Group(); b.position.set(x,y+5,z-55); blocks.push(b);
  }
  return {blocks,motion:cityMotion(blocks)};
}
const snapshot=blocks=>blocks.map(b=>[...b.position.toArray(),...b.quaternion.toArray()]);
test('all city blocks rotate in different slices and keep their new layout',()=>{
  const {blocks,motion}=fixture(),before=snapshot(blocks);
  motion.reconfigure(); for(let i=0;i<40;i++)motion.update(.05);
  assert.equal(snapshot(blocks).filter((b,i)=>JSON.stringify(b)!==JSON.stringify(before[i])).length,27);
  assert.ok(blocks[0].quaternion.angleTo(blocks[1].quaternion)>.5);
  for(let i=0;i<160;i++)motion.update(.05);
  assert.equal(motion.moving,false);
  const after=snapshot(blocks); assert.notDeepEqual(after,before);
  motion.update(1); assert.deepEqual(snapshot(blocks),after);
  motion.reconfigure(true); assert.notDeepEqual(snapshot(blocks),after);
});
test('queued clicks finish; reduced motion immediately drains pending turns',()=>{
  const {blocks,motion}=fixture();motion.reconfigure();motion.update(.7);motion.reconfigure();
  const before=snapshot(blocks);motion.reconfigure(true);
  assert.equal(motion.moving,false);assert.notDeepEqual(snapshot(blocks),before);
  const after=snapshot(blocks);motion.update(.1);assert.deepEqual(snapshot(blocks),after);
  for(const b of blocks)assert.ok(Math.abs(b.quaternion.length()-1)<1e-8);
});
