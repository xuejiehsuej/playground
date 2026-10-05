import test from 'node:test';
import assert from 'node:assert/strict';
let catalog;
try { catalog = await import('../dist/catalog.js'); } catch {}
test('unknown or empty navigation restores the main gallery',()=>{ assert.ok(catalog, 'catalogue must exist'); assert.equal(catalog.spaceFromHash('#missing').id,'hub'); assert.equal(catalog.spaceFromHash('').id,'hub'); });
test('every agreed environment is reachable by URL',()=>{ assert.ok(catalog); for(const id of ['hub','digital','ocean','infinity']) assert.equal(catalog.spaceFromHash('#'+id).id,id); });
test('collection starts honestly empty and supports filtering future works',()=>{ assert.ok(catalog); assert.equal(catalog.WORKS.length,0); const works=[{title:'表',category:'mechanical'},{title:'星',category:'cosmic'}]; assert.equal(catalog.filterWorks(works,'mechanical','表').length,1); assert.equal(catalog.filterWorks(works,'all','不存在').length,0); assert.equal(catalog.filterWorks(works,'all','').length,2); });
