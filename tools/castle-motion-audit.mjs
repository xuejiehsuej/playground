import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/86137/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await mkdir('docs/qa/castle-motion',{recursive:true});
try {
 await page.goto('http://127.0.0.1:4180/#infinity');
 await page.waitForFunction(()=>document.querySelector('canvas')?.dataset.ready==='true');
 await page.waitForTimeout(1500);
 const model=await page.locator('canvas').first().getAttribute('data-model');
 await page.screenshot({path:'docs/qa/castle-motion/before.png'});
 await page.getByRole('button',{name:'↻ 空间重排'}).click();
 await page.waitForTimeout(2300);
 await page.screenshot({path:'docs/qa/castle-motion/during.png'});
 await page.waitForTimeout(14000);
 await page.screenshot({path:'docs/qa/castle-motion/after.png'});
 const integration=await page.evaluate(async()=>{
  const {castle}=await import('/worlds/castle.js');
  const w=castle(),blocks=w.scene.children.filter(o=>o.name.startsWith('castle-sector-'));
  const snap=()=>blocks.map(b=>JSON.stringify([...b.position.toArray(),...b.quaternion.toArray()]));
  const before=snap();w.reconfigure(false);
  for(let i=0;i<200;i++)w.animate(0,null,.05);
  const after=snap();w.animate(0,null,.05);const stable=JSON.stringify(after)===JSON.stringify(snap());
  w.reconfigure(true);const repeated=JSON.stringify(after)!==JSON.stringify(snap());
  return {rooms:w.scene.userData.rooms,blocks:blocks.length,moved:after.filter((v,i)=>v!==before[i]).length,stable,repeated,instances:w.scene.userData.instances};
 });
 assert.equal(integration.rooms,570);assert.equal(integration.blocks,27);assert.equal(integration.moved,27);assert.ok(integration.stable&&integration.repeated);assert.deepEqual(errors,[]);
 await writeFile('docs/qa/castle-motion/results.json',JSON.stringify({model:JSON.parse(model),integration,errors},null,2));
 console.log(JSON.stringify({integration,errors}));
}finally{await browser.close();}
