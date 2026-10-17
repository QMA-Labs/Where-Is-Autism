import fs from 'node:fs/promises';
let s=await fs.readFile('app/ExperienceLab.tsx','utf8');
s=s.replace('width={i?35*7:50*7}','width={(i?35:50)*4.5}').replace('enabled[0]?.2*a:0','enabled[0] ? .2*a : 0').replace('enabled[1]?.15*b:0','enabled[1] ? .15*b : 0').replace('enabled[2]?.1*c:0','enabled[2] ? .1*c : 0');
await fs.writeFile('app/ExperienceLab.tsx',s);
s=await fs.readFile('app/journey-data.ts','utf8');s=s.replaceAll('۹ منبع','۱۰ منبع').replaceAll("'family','communication']","'family','communication','replication']").replaceAll("refs:['communication']","refs:['communication','replication']");await fs.writeFile('app/journey-data.ts',s);
