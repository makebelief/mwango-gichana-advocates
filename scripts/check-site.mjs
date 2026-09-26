import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const htmlFiles=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='.git'||entry.name==='.vercel'||entry.name==='node_modules')continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))htmlFiles.push(full)}}
walk(root);
const errors=[];
const forbidden=[/Victor L\. Andande/i,/andande\.law/i,/victor-andande/i,/Mama Ngina Street/i,/0729\s*099\s*307/];
for(const file of htmlFiles){const body=fs.readFileSync(file,'utf8');const rel=path.relative(root,file);for(const pattern of forbidden){if(pattern.test(body))errors.push(`${rel}: forbidden residue ${pattern}`)}if(!/<title>[^<]+<\/title>/.test(body))errors.push(`${rel}: missing title`);if(!/<html lang="en-KE">/.test(body))errors.push(`${rel}: missing en-KE language`);for(const match of body.matchAll(/(?:href|src)="([^"]+)"/g)){const target=match[1];if(!target.startsWith('/')||target.startsWith('//'))continue;const clean=target.split(/[?#]/)[0];if(!clean||clean==='/')continue;let local=path.join(root,clean);if(fs.existsSync(local))continue;if(fs.existsSync(`${local}.html`))continue;if(fs.existsSync(path.join(local,'index.html')))continue;errors.push(`${rel}: broken local reference ${target}`)}}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Checked ${htmlFiles.length} HTML files: local references, titles, language and client residue passed.`);
