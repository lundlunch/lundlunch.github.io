import{readFile,writeFile,copyFile,readdir}from'node:fs/promises';
for(const f of await readdir('build/assets'))await copyFile('build/assets/'+f,f.replace(/^dev-/,'index-'));
await writeFile('index.html',(await readFile('build/dev.html','utf8')).replaceAll('./assets/dev-','./index-').replaceAll('./assets/','./'));
