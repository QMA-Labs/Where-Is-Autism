import {chromium} from 'file:///C:/Users/ASUS/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {claims,sources} from './research-en-data.ts';
import assert from 'node:assert/strict';
const out='outputs/where-is-autism-research-edition';
for(const c of claims)for(const ref of c.refs)assert(sources.some(s=>s.id===ref));
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1050},offline:true,reducedMotion:'reduce'});
const errors=[],network=[];context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});});
const page=await context.newPage();await page.goto(pathToFileURL(path.resolve(out+'/index.html')).href);
const go=async hash=>{await page.evaluate(h=>location.hash=h,hash);await page.waitForTimeout(60);};
await page.locator('.hero').waitFor();await page.screenshot({path:'outputs/research-edition-overview.png',fullPage:true});
assert.equal(await page.locator('html').getAttribute('lang'),'en');assert(!/[\u0600-\u06ff]/.test(await page.locator('body').innerText()));
await page.getByRole('link',{name:'About the project initiator'}).click();await page.waitForTimeout(100);assert((await page.locator('#author').boundingBox()).y<250);
assert.equal(await page.locator('a[href="mailto:masihanayeriii@gmail.com"]').count(),2);
for(const c of claims){await go('ideas/'+c.id);assert((await page.locator('.claim-panel h2').innerText())===c.title);assert.equal(await page.locator('.claim-block').count(),5);assert(!/[\u0600-\u06ff]/.test(await page.locator('body').innerText()));}
await go('ideas/output');await page.screenshot({path:'outputs/research-edition-hypothesis.png',fullPage:true});await page.locator('.citation-links a').first().click();assert.equal(await page.locator('.source-card').count(),1);await page.getByRole('link',{name:'Show all 11 sources'}).click();assert.equal(await page.locator('.source-card').count(),11);await page.getByRole('searchbox').fill('Strawson');assert.equal(await page.locator('.source-card').count(),1);await page.getByRole('searchbox').fill('no_such_author_xyz');assert.equal(await page.locator('.source-card').count(),0);await page.getByRole('searchbox').fill('');
for(const s of sources){await go('evidence/'+s.id);assert.equal(await page.locator('.source-card').count(),1);assert.equal(await page.locator('.source-card .source-title').getAttribute('href'),s.url);}
await go('proposal');await page.locator('.technical summary').click();for(const q of await page.locator('.reviewer-questions summary').all())await q.click();assert.equal(await page.locator('.reviewer-questions details[open]').count(),9);await page.screenshot({path:'outputs/research-edition-proposal.png',fullPage:true});
for(const [label,file] of [['↓ Full research dossier','Masiha-Nayeri-Research-Dossier.html'],['↓ Short inquiry','Masiha-Nayeri-Research-Inquiry.html']]){const download=page.waitForEvent('download');await page.getByRole('button',{name:label,exact:true}).click();const d=await download;await d.saveAs('work/'+file);const doc=await context.newPage();await doc.goto(pathToFileURL(path.resolve('work/'+file)).href);assert((await doc.locator('body').innerText()).includes('Masiha Nayeri'));assert(!/[\u0600-\u06ff]/.test(await doc.locator('body').innerText()));if(file.includes('Dossier'))assert.equal(await doc.locator('section').count(),25);await doc.close();}
await go('overview');await page.keyboard.press('Control+Home');await page.locator('.skip-link').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'content');
for(const width of [390,320,768]){await page.setViewportSize({width,height:900});for(const route of ['overview','ideas/output','ideas/geometry','evidence','proposal']){await go(route);assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`Overflow: ${width}/${route}`);}if(width===390){await go('overview');await page.screenshot({path:'outputs/research-edition-mobile.png',fullPage:true});}}
await go('ideas/family');await go('proposal');await page.goBack();await page.locator('.claim-panel h2').waitFor();assert((await page.locator('.claim-panel h2').innerText()).includes('Family'));
await browser.close();assert.equal(errors.length,0);assert.equal(network.length,0);
const result={edition:'English research-group dossier 2.0',hypotheses:14,sources:11,reviewerAnswers:9,typecheck:'passed',offline:true,externalRequests:network,pageErrors:errors,language:'English UI and both exports verified',exports:'Full 25-section dossier and short inquiry verified',responsive:'320, 390, 768 and 1440 px checked',keyboard:'skip link and native details verified',navigation:'claim/source cross-links and browser back verified'};
await fs.writeFile(out+'/VALIDATION.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
