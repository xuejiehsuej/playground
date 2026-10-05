import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/86137/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
await mkdir('docs/qa',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
try{
 await page.goto('http://127.0.0.1:4180/?debug=1');await page.waitForFunction(()=>document.querySelector('canvas').dataset.ready==='true');await page.waitForTimeout(1800);
 await page.screenshot({path:'docs/qa/hub.png'});
 for(const id of ['digital','ocean','infinity']){await page.locator(`.space-link[data-space=${id}]`).click();await page.waitForFunction(id=>document.body.dataset.space===id,id);await page.waitForTimeout(1300);await page.screenshot({path:`docs/qa/${id}.png`});}
 console.log(JSON.stringify({errors,debug:await page.locator('#debug').textContent()}));
 await writeFile('docs/qa/visual-errors.json',JSON.stringify(errors,null,2));
}finally{await browser.close();}
