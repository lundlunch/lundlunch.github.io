import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {refreshMenus,lines} from './menus.mjs';
import seeds from './translation-seeds.json' with {type:'json'};
async function read(path,fallback){try{return JSON.parse(await readFile(path,'utf8'));}catch{return fallback;}}

const previous=await read('menus.json',await read('initial-menus.json',{}));
const menus=await refreshMenus(previous);
const translations=await read('translations.json',{});
const today=new Date().toISOString().slice(0,10);
let quota=await read('translation-quota.json',{date:today,used:0});if(quota.date!==today)quota={date:today,used:0};
for(const r of menus.restaurants)for(let day=0;day<5;day++)for(let i=0;i<(r.days[day]||[]).length;i++){
 const source=r.days[day][i],original=r.originalLanguage==='en'?'en':'sv',language=original==='sv'?'en':'sv',key=language+'\u0000'+source;
 if((language==='en'?r.days_en:r.days_sv)?.[day]?.[i]||seeds[language]?.[source]||translations[key])continue;
 const chinese=[];const input=source.replace(/[（(][^()（）]*[\u3400-\u9fff][^()（）]*[）)]/g,p=>{chinese.push(p);return '';}).trim();
 if(quota.used+input.length>5000)continue;quota.used+=input.length;
 try{
  const chunks=[];let chunk='';for(const word of input.split(/\s+/)){if(new TextEncoder().encode(chunk+' '+word).length>450&&chunk){chunks.push(chunk);chunk='';}chunk+=(chunk?' ':'')+word;}if(chunk)chunks.push(chunk);
  const out=[];for(const q of chunks){const u=new URL('https://api.mymemory.translated.net/get');u.searchParams.set('q',q);u.searchParams.set('mt','1');u.searchParams.set('langpair',original+'|'+language);const res=await fetch(u,{signal:AbortSignal.timeout(6000)});if(!res.ok)throw Error('Translation HTTP '+res.status);const v=await res.json();if(Number(v.responseStatus)!==200)throw Error('Translation quota or service unavailable');const machine=v.matches?.find(m=>m['created-by']==='MT!')?.translation;const text=lines(machine||v.responseData?.translatedText||'').join(' ');if(!text||text.length>2000)throw Error('Invalid translation');out.push(text);}
  translations[key]=out.join(' ')+(chinese.length?' '+chinese.join(' '):'');
 }catch(e){console.warn('Translation unavailable:',e.message);}
}
await writeFile('menus.json',JSON.stringify(menus,null,2));
await writeFile('translations.json',JSON.stringify(translations,null,2));
await writeFile('translation-quota.json',JSON.stringify(quota));
console.log(JSON.stringify({updated:menus.updated,sources:menus.restaurants.map(r=>({name:r.name,status:r.status,error:r.error})),translations:Object.keys(translations).length}));
