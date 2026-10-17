import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {topics,references} from '../app/journey-data.ts';
import {proposal,registerRows} from './research-plan.ts';
const dir='outputs/where-is-autism-complete';
const html=await fs.readFile(dir+'/index.html','utf8');
assert.equal(topics.length,14);assert.equal(references.length,11);
assert.equal(new Set(topics.map(t=>t.id)).size,14);
for(const t of topics){for(const id of t.refs)assert(references.some(r=>r.id===id),`missing reference ${id}`);for(const id of t.related)assert(topics.some(x=>x.id===id));for(const [key,value] of Object.entries(t))assert(value!==''&&value!==undefined,`${t.id}.${key}`);}
for(const r of registerRows){assert(topics.some(t=>t.id===r.topic));if(r.support)assert(references.some(s=>s.id===r.support));}
assert(!/<script[^>]+src=/.test(html));assert(!/<link[^>]+(?:stylesheet|preload)/.test(html));assert(!/@import|url\(https?:/i.test(html));
let scripts=0;for(const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(match[1].includes('application/json'))JSON.parse(match[2]);else{new vm.Script(match[2]);scripts++;}}
assert.equal(scripts,2);assert(html.includes('href="#map">ورود به بخش دوم'));assert(html.includes('masihanayeriii@gmail.com'));assert(html.includes('https://github.com/QMA-Labs'));assert(!html.includes('gamil.com'));assert(html.includes('clone.querySelector(\'#explorer-root\').replaceChildren()'));assert(html.includes('چهار بخش · نسخهٔ پژوهشی'));
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brief=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Masiha Nayeri — Research brief</title><style>body{font:17px/1.85 Georgia,serif;max-width:820px;margin:50px auto;padding:0 24px;color:#172839;background:#fafbfc}h1{font-size:36px;line-height:1.3}h2{font-size:23px;margin-top:35px}a{color:#29536d;overflow-wrap:anywhere}article{border-top:1px solid #cbd5df;padding:18px 0}small{color:#566a7c}@media print{body{font-size:11pt;margin:0}article{break-inside:avoid}}</style><body><small>WHERE IS AUTISM? / INDEPENDENT RESEARCH REPRESENTATION / 22 SEPTEMBER 2026</small><h1>${esc(proposal.title)}</h1><p><strong>Masiha Nayeri</strong><br>Born 12 March 2010 · Age 16 as of September 2026<br>10th-grade student<br><a href="https://github.com/QMA-Labs">GitHub / QMA-Labs</a> · <a href="mailto:masihanayeriii@gmail.com">masihanayeriii@gmail.com</a></p>${Object.entries(proposal).filter(([k])=>k!=='title').map(([k,v])=>`<h2>${esc(k[0].toUpperCase()+k.slice(1))}</h2><p>${esc(v)}</p>`).join('')}<h2>A result that limits the account</h2><p>A 2025 Registered Report with 311 participants found no difference in information transfer between single-neurotype and mixed-neurotype chains, contrasting with the earlier 2020 result. The earlier result alone cannot support a general claim about communication.</p><h2>Selected reading</h2><p>This register is curated, non-systematic and non-exhaustive. Original texts require internet access.</p>${references.map(r=>`<article><strong>${esc(r.author)}</strong><br><a href="${esc(r.url)}">${esc(r.title)}</a></article>`).join('')}</body></html>`;
await fs.writeFile(dir+'/Masiha-Nayeri-Research-Brief.html',brief);
const results={checkedAt:new Date().toISOString(),topics:14,references:11,referenceIntegrity:'passed',scriptsParsed:scripts,externalRuntimeDependencies:0,confirmedProfile:'present',typecheck:'Run npm run check:types separately',browserVerification:'See VALIDATION.txt for the separate browser test result.'};
await fs.writeFile(dir+'/STATIC-VALIDATION.txt',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
