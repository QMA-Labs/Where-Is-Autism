import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
const out='outputs/where-is-autism-complete';
await fs.mkdir(out,{recursive:true});
// Confirmed by the creator; GitHub identity verified via the connected account.
const creator={name:'Masiha Nayeri',birth:'۱۲ مارس ۲۰۱۰ · ۱۶ ساله در سپتامبر ۲۰۲۶',education:'پایهٔ دهم',bio:'من مسیحا نایری هستم؛ دانش‌آموز پایهٔ دهم. این پروژه را با مشاهده و پرسش دربارهٔ فکرکردن، تجربه‌های حسی، عاطفه، ارتباط و شباهت‌های خانوادگی شروع کردم. می‌خواهم منظور هر مشاهده‌ام را روشن کنم، آن را کنار پژوهش‌های موجود بگذارم و از آن پرسشی بسازم که بتوان آزمود؛ حتی اگر نتیجه باعث شود برداشتم را عوض کنم.',github:'https://github.com/QMA-Labs',email:'masihanayeriii@gmail.com'};
let html=await fs.readFile('portable/shell.html','utf8');
html=html.replace(/(<script type="application\/json" id="creator-data">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(creator)+b);
html=html.replaceAll('wia-creator-v1','wia-creator-parts123-v1');
html=html.replace('· بخش اول از چهار بخش','· بخش‌های ۱ تا ۳ از ۴');
html=html.replace('<button id="about">سازنده</button>','<button id="about">سازنده</button><a class="research-link" href="#map">موضوع‌ها</a><a class="research-link" href="#evidence">شواهد</a>');
html=html.replace('بخش اول آماده است؛ مسیر هنوز ادامه دارد','سه بخش آمادهٔ کاوش؛ یک پرسشِ باز');
html=html.replace("'بخش بعد'","'آماده'").replace("'در ادامه'],['نسخهٔ ارائه'","'آماده'],['نسخهٔ ارائه'");
html=html.replace('<button class="primary" data-replay>دوباره تجربه کن\'+icon(\'left\')+\'</button>','<a class="primary" href="#map">ورود به بخش دوم\'+icon(\'left\')+\'</a>');
html=html.replace('تکمیل معرفی و لینک‌ها','ویرایش معرفی و لینک‌ها');
html=html.replace('این فایل فقط بخش اول است؛ فصل‌های بعدی هنوز در این بسته ساخته نشده‌اند.','بخش دوم: چهارده فصل تعاملی. بخش سوم: منابع، نقد و طرح آزمون. بخش چهارمِ ارائهٔ نهایی هنوز در ادامه است.');
html=html.replace('در بخش سوم، ادعاها به منابع و حدود استنادشان وصل خواهند شد؛ بخش اول نتیجهٔ پژوهشی تازه‌ای گزارش نمی‌کند.','در بخش سوم، ادعاها به منابع و حدود استنادشان وصل‌اند؛ این پروژه نتیجهٔ پژوهشی تازه‌ای گزارش نمی‌کند.');
html=html.replace("render();return true;}","render();window.dispatchEvent(new Event('wia-profile-updated'));return true;}");
html=html.replace("const clone=document.documentElement.cloneNode(true);","const clone=document.documentElement.cloneNode(true);clone.querySelector('#explorer-root').replaceChildren();clone.querySelector('body').classList.remove('research-open');");
html=html.replace('</main>','</main><div id="explorer-root"></div><noscript><p>برای اجرای تجربهٔ تعاملی، JavaScript مرورگر باید فعال باشد.</p></noscript>');
html=html.replaceAll('بخش‌های ۱ تا ۳ از ۴','چهار بخش · نسخهٔ پژوهشی').replaceAll('سه بخش آمادهٔ کاوش؛ یک پرسشِ باز','چهار بخش برای فهمیدن و آزمودن').replaceAll('بخش چهارمِ ارائهٔ نهایی هنوز در ادامه است.','بخش چهارم: جمع‌بندی شش‌گامه و دفتر کامل ایده‌ها.').replaceAll("'در ادامه']","'آماده']").replaceAll('اتصال فصل‌ها، آزمون کاربردپذیری و بستهٔ نهایی آفلاین.','جمع‌بندی ایده‌ها و دفتر کاملِ قابل‌دریافت.');
html=html.replace('</head>',`<style>${await fs.readFile('portable/explorer.css','utf8')}</style></head>`);
// Synchronize the visual pause button with the React island's decorative animation.
const pauseSync=`document.getElementById('motion').addEventListener('click',()=>document.body.classList.toggle('motion-paused',document.getElementById('motion').getAttribute('aria-pressed')==='true'));document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();const main=document.querySelector(document.body.classList.contains('research-open')?'#research-content':'#main');main?.setAttribute('tabindex','-1');main?.focus();});`;
// Keep dependency reads inside this workspace; do not scan inaccessible parent directories.
const workspaceResolver={name:'workspace-only',setup(b){
 b.onResolve({filter:/.*/},async args=>{
  let resolved;
  if(path.isAbsolute(args.path))resolved=args.path;
  else if(args.path.startsWith('.')){
   const base=path.resolve(path.dirname(args.importer),args.path);
   for(const suffix of ['','.tsx','.ts','.js','.mjs','/index.js']){try{if((await fs.stat(base+suffix)).isFile()){resolved=base+suffix;break;}}catch{}}
  }else if(args.path==='lucide-react')resolved=path.resolve('node_modules/lucide-react/dist/esm/lucide-react.mjs');
  else resolved=createRequire(args.importer||path.resolve('portable/entry.tsx')).resolve(args.path);
  if(!resolved||!path.resolve(resolved).startsWith(process.cwd()+path.sep))throw Error('Dependency outside workspace: '+args.path);
  return {path:resolved,namespace:'workspace',...(resolved.includes('lucide-react')?{sideEffects:false}:{})};
 });
 b.onLoad({filter:/.*/,namespace:'workspace'},async args=>({contents:await fs.readFile(args.path,'utf8'),loader:args.path.endsWith('.tsx')?'tsx':args.path.endsWith('.ts')?'ts':'js'}));
}};
const bundle=await build({entryPoints:[path.resolve('portable/entry.tsx')],absWorkingDir:process.cwd(),tsconfigRaw:{compilerOptions:{jsx:'react-jsx',target:'ES2020'}},plugins:[workspaceResolver],bundle:true,write:false,format:'iife',minify:true,jsx:'automatic',target:'es2020',define:{'process.env.NODE_ENV':'"production"'},legalComments:'inline'});
html=html.replace('</body>',`<script>${pauseSync}${bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body>`);
await fs.writeFile(path.join(out,'index.html'),html);
await fs.writeFile(path.join(out,'Start-Windows.cmd'),'@echo off\r\nstart "" "%~dp0index.html"\r\n');
await fs.writeFile(path.join(out,'README.txt'),`WHERE IS AUTISM? — Masiha Nayeri\nPortable edition: complete four-part prototype / 22 September 2026\n\nبازکردن: فایل index.html را در Edge، Chrome یا Firefox باز کنید. نصب یا اینترنت لازم نیست.\nدر ویندوز می‌توانید Start-Windows.cmd را هم باز کنید.\nارسال: فایل index.html به‌تنهایی کافی است. بسته را قبل از اجرا از ZIP بیرون بیاورید.\n\nبخش ۱: پرسش، تجربهٔ کوتاه، چهار نگاه، معرفی سازنده.\nبخش ۲: چهارده فصل با مشاهده، تجربه، توضیح و شاهد/آزمون.\nبخش ۳: دفتر ادعاها، ۱۱ منبع، نقد، طرح مطالعه و خلاصهٔ انگلیسی قابل‌دریافت.\nبخش ۴: ارائهٔ شش‌گامه و دفتر کامل ایده‌ها، شواهد و آزمون.\n\nاطلاعات تأییدشده: Masiha Nayeri؛ تولد ۱۲ مارس ۲۰۱۰؛ پایهٔ دهم؛ ۱۶ ساله در سپتامبر ۲۰۲۶.\nGitHub: https://github.com/QMA-Labs\nEmail: masihanayeriii@gmail.com\n\nهمهٔ نمودارها ساختگی و مفهومی‌اند. هیچ دادهٔ انسانی، تشخیص یا نتیجهٔ تجربی تازه‌ای نداریم.\nخلاصهٔ منابع آفلاین است؛ متن اصلی منابع و لینک‌های تماس به اینترنت نیاز دارند.\nراهنما پاسخ‌های آماده را جست‌وجو می‌کند و به سرویس هوش مصنوعی وصل نیست.\nاطلاعات سازنده را می‌توان محلی ویرایش و از پنجرهٔ معرفی، نسخهٔ مستقل دریافت کرد.\n\nArchitecture: standalone HTML shell + bundled React island; inline CSS/JS; SVG/canvas, no network dependencies. Hash navigation; source content separate from presentation.\nSource: portable/Explorer.tsx, portable/research-plan.ts, app/journey-data.ts, app/ExperienceLab.tsx, app/JourneyGuide.tsx.\nRebuild (Node + project dependencies): node portable/build.mjs\nDesign and IA: portable/DESIGN.md.\n`);
let licenses='Third-party software licenses\n\n';
for(const name of ['react','react-dom','scheduler','lucide-react']){try{licenses+=`\n${name}\n`+await fs.readFile(`node_modules/${name}/LICENSE`,'utf8');}catch{try{licenses+=await fs.readFile(`node_modules/${name}/LICENSE.txt`,'utf8');}catch{}}}
await fs.writeFile(path.join(out,'THIRD-PARTY-LICENSES.txt'),licenses);
console.log(`Built ${out}/index.html (${Math.round(Buffer.byteLength(html)/1024)} KB), no external runtime dependencies.`);
