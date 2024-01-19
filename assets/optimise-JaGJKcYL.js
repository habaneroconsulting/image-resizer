import{_ as a}from"./index-x2JP2lQQ.js";const o={level:2,interlace:!1,optimiseAlpha:!1};async function s(t){const{default:e,optimise:i}=await a(()=>import("./squoosh_oxipng-iruKZ4F0.js"),__vite__mapDeps([]));return await e(t),i}let n;async function r(t){return n||(n=s(t)),n}async function c(t,e={}){const i={...o,...e};return(await r())(new Uint8Array(t),i.level,i.interlace,i.optimiseAlpha).buffer}export{c as default,r as init};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
