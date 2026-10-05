export const SPACES = [
  {id:'hub', number:'00', name:'轨道主馆', en:'ORBITAL ATRIUM', tag:'THE STARTING POINT', description:'在秩序的边缘，寻找想象的入口。', color:'#e9b15c', categories:['all']},
  {id:'digital', number:'01', name:'数字无界', en:'DIGITAL INFINITY', tag:'BEYOND THE GRID', description:'越过坐标的尽头，进入没有边界的数字意识。', color:'#9ce8ce', categories:['digital']},
  {id:'ocean', number:'02', name:'汪洋之间', en:'PELAGIC WORLD', tag:'BENEATH THE SURFACE', description:'让重力沉入深蓝，在潮汐与光之间漫游。', color:'#80d9d0', categories:['nature']},
  {id:'infinity', number:'03', name:'无限城', en:'THE SHIFTING CASTLE', tag:'ARCHITECTURE OF PARADOX', description:'门后仍是门。向上，向下，所有方向都是远方。', color:'#f0a778', categories:['architecture']}
];
export const CATEGORIES = [{id:'all',name:'全部作品'},{id:'cosmic',name:'宇宙实验'},{id:'mechanical',name:'机械结构'},{id:'digital',name:'数字艺术'},{id:'nature',name:'自然空间'},{id:'architecture',name:'空间构造'}];
// Add future works here: { title, category, space, description, url, cover? }.
export const WORKS = [];
export function spaceFromHash(hash){ return SPACES.find(s=>s.id===hash.replace(/^#/,''))||SPACES[0]; }
export function filterWorks(works,category,query){const q=query.trim().toLowerCase();return works.filter(w=>(category==='all'||w.category===category)&&`${w.title} ${w.description||''}`.toLowerCase().includes(q));}
