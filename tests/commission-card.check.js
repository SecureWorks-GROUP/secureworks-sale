// Commission card check: node tests/commission-card.check.js sale.html
// Renders the cockpit commission card and hero from stub answers (new
// backend with full and partial commission, and the older answer shape).
const fs=require('fs'); const src=fs.readFileSync(process.argv[2],'utf8');
function grab(name){const i=src.indexOf('  function '+name+'('); if(i<0) throw name; let d=0,j=src.indexOf('{',i); for(let k=j;k<src.length;k++){if(src[k]=='{')d++; if(src[k]=='}'){d--; if(!d) return src.slice(i,k+1);}}}
const els={}; const document={getElementById:id=>(els[id]=els[id]||{textContent:'',innerHTML:''}), querySelectorAll:()=>[]};
const code=['ckFmtMoney','ckEscape','ckCommMissing','ckRenderCommission','ckRenderHero'].map(grab).join('\n');
const ctx=new Function('document','_isAdmin','_ckRepId','_user','CK_KHAIRO','CK_NITHIN','ckEffectiveRepId', code+'; return {ckRenderCommission, ckRenderHero};');
const f=ctx(document,false,null,{name:'Test Rep'},'a','b',()=>null);
const assert=require('assert');
const full={earned_total:1234.5,jobs_count:3,commission_unknown_count:0,commission_complete:true,formula_snapshot:{basis:'x',earned_trigger:'deposit_paid'}};
const part={earned_total:800,jobs_count:4,commission_unknown_count:2,commission_complete:false,formula_snapshot:{basis:'x'}};
f.ckRenderCommission(full,full,full);
assert.equal(els.ckCommMonth.textContent,'$1,235'); assert.ok(!/Partial/.test(els.ckCommFormula.innerHTML)); assert.ok(/accepted quote/.test(els.ckCommFormula.innerHTML)); assert.ok(!/margin_pct|baseline/.test(els.ckCommFormula.innerHTML));
f.ckRenderCommission(part,full,part);
assert.equal(els.ckCommMonth.textContent,'$800+'); assert.equal(els.ckCommWeek.textContent,'$1,235'); assert.equal(els.ckCommYtd.textContent,'$800+');
assert.ok(/Partial total/.test(els.ckCommFormula.innerHTML)); assert.ok(/2 this month · 2 this year/.test(els.ckCommFormula.innerHTML)); assert.ok(!/this week/.test(els.ckCommFormula.innerHTML.split('(')[1]));
const old={earned_total:500,jobs_count:2,formula_snapshot:{rep_rate:0.15,fencing_baseline_gp:0.35,patio_baseline_gp:0.3}};
f.ckRenderCommission(old,old,old); assert.equal(els.ckCommMonth.textContent,'$500'); assert.ok(/15%/.test(els.ckCommFormula.innerHTML));
f.ckRenderCommission({error:'rep_user_id required'},null,null); assert.equal(els.ckCommFormula.textContent,'Pick a rep above to see their commission.');
f.ckRenderHero({cards:[]},part); assert.equal(els.ckHeroWeek.textContent,'$800+'); assert.equal(els.ckHeroWeekJobs.textContent,'4 jobs this week · 2 with no saved commission');
f.ckRenderHero({cards:[]},full); assert.equal(els.ckHeroWeekJobs.textContent,'3 jobs this week');
f.ckRenderHero({cards:[]},old); assert.equal(els.ckHeroWeek.textContent,'$500');
console.log('sale commission render: 15 checks passed');
