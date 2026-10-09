import seeds from './translation-seeds.json';
export type Language='sv'|'en';
export type BilingualMenu={days:string[][];days_en?:(string|null)[][];days_sv?:(string|null)[][];originalLanguage?:string};
const prepared=seeds as Record<Language,Record<string,string>>;
export function translationKey(language:Language,source:string){return language+'\u0000'+source;}
export function menuDish(r:BilingualMenu,day:number,index:number,language:Language,extra:Record<string,string>={}){
 const source=r.days[day]?.[index]||'',original=r.originalLanguage==='en'?'en':'sv';
 if(language===original)return {text:source,translated:false,missing:false,source};
 const official=(language==='en'?r.days_en:r.days_sv)?.[day]?.[index];
 if(official)return {text:official,translated:false,missing:false,source};
 const translated=prepared[language][source]||extra[translationKey(language,source)];
 return {text:translated||source,translated:!!translated,missing:!translated,source};
}
