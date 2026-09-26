import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const port=3000;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.txt':'text/plain; charset=utf-8'};

http.createServer((req,res)=>{
  const urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const relative=urlPath.replace(/^\/+|\/+$/g,'');
  if(relative.includes('..')){res.writeHead(400);res.end('Bad request');return}
  const candidates=relative? [`${relative}.html`,relative,path.join(relative,'index.html')]:['index.html'];
  let file=candidates.map(candidate=>path.join(root,candidate)).find(candidate=>fs.existsSync(candidate)&&fs.statSync(candidate).isFile());
  let status=200;
  if(!file){file=path.join(root,'404.html');status=404}
  const ext=path.extname(file).toLowerCase();
  res.writeHead(status,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`Local site: http://127.0.0.1:${port}`));
