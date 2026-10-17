import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';
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

const out='outputs/where-is-autism-research-edition';
await fs.mkdir(out,{recursive:true});
const options={absWorkingDir:process.cwd(),tsconfigRaw:{compilerOptions:{jsx:'react-jsx',target:'ES2020'}},plugins:[workspaceResolver],bundle:true,write:false,minify:true,jsx:'automatic',target:'es2020',define:{'process.env.NODE_ENV':'"production"'},legalComments:'inline'};
const result=await build({...options,entryPoints:[path.resolve('portable/research-entry.tsx')],format:'iife'});
const css=await fs.readFile('portable/research-edition.css','utf8');
const script=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
const html='<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="description" content="An independent research concept proposal by Masiha Nayeri: hypotheses, evidence and a proposed first study."><title>Where Is Autism? — Research Dossier</title><link rel="icon" href="data:,"><style>'+css+'</style></head><body><div id="root"></div><noscript><p>This interactive index needs JavaScript. Open Masiha-Nayeri-Research-Dossier.html from the same folder to read the complete standalone document.</p></noscript><script>'+script+'</script></body></html>';
await fs.writeFile(out+'/index.html',html);
const reports=await build({...options,entryPoints:[path.resolve('portable/research-documents.ts')],format:'esm'});
await fs.mkdir('work',{recursive:true});await fs.writeFile('work/research-documents.mjs',reports.outputFiles[0].text);
const {documentHTML}=await import(pathToFileURL(path.resolve('work/research-documents.mjs')).href+'?t='+Date.now());
await fs.writeFile(out+'/Masiha-Nayeri-Research-Dossier.html',documentHTML(false));
await fs.writeFile(out+'/Masiha-Nayeri-Research-Inquiry.html',documentHTML(true));
await fs.writeFile(out+'/Start-Windows.cmd','@echo off\r\nstart "" "%~dp0index.html"\r\n');
await fs.writeFile(out+'/README.txt','WHERE IS AUTISM? — Research-group edition 2.0\nMasiha Nayeri / September 2026\n\nOpen index.html in a browser. No installation, server or internet is required. Extract the ZIP first.\n\nFour routes: Overview; Ideas & hypotheses; Evidence; Proposed study.\nAll UI and documents are English. Fourteen detailed idea entries, eleven sources, a proposed study, reviewer questions and creator/contact information.\n\nMasiha-Nayeri-Research-Dossier.html: full standalone dossier.\nMasiha-Nayeri-Research-Inquiry.html: short standalone research inquiry.\nPrint either document from your browser to save a PDF. External source/contact links require internet.\n\nThis is an early-stage concept proposal, not an empirical paper, validated theory or diagnostic tool. No messages have been sent to any institution.\n\nSource architecture: portable/ResearchEdition.tsx, research-en-data.ts, research-documents.ts, research-edition.css. Rebuild: node portable/build-research.mjs with project dependencies installed. Design/IA: portable/RESEARCH-EDITION.md.\n');
let notices='Third-party software licenses\n\n';
for(const name of ['react','react-dom','scheduler']){
 let notice;
 for(const candidate of ['LICENSE','LICENSE.txt']){try{notice=await fs.readFile(path.resolve('node_modules',name,candidate),'utf8');break;}catch(error){if(error.code!=='ENOENT')throw error;}}
 if(!notice)throw new Error('Missing dependency license for '+name);
 notices+='\n'+name+'\n'+notice+'\n';
}
await fs.writeFile(out+'/THIRD-PARTY-LICENSES.txt',notices);
await fs.copyFile('portable/RESEARCH-EDITION.md',out+'/DESIGN-AND-ARCHITECTURE.md');
console.log('Built English research edition: '+Math.round(Buffer.byteLength(html)/1024)+' KB');
