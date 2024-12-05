import{a as g,S as h,i as n}from"./vendor-hwdYKDic.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const y="YOUR_PIXABAY_API_KEY",b="https://pixabay.com/api/";async function u(r,o=1,i=12){const a={key:y,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:i};return(await g.get(b,{params:a})).data}function m({webformatURL:r,largeImageURL:o,tags:i,likes:a,views:e,comments:t,downloads:s}){return`
      <div class="photo-card">
        <a href="${o}">
          <img src="${r}" alt="${i}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${a}</p>
          <p><b>Views:</b> ${e}</p>
          <p><b>Comments:</b> ${t}</p>
          <p><b>Downloads:</b> ${s}</p>
        </div>
      </div>
    `}function L(r){r.innerHTML=""}const v=document.querySelector("#search-form"),f=document.querySelector(".gallery"),l=document.querySelector(".loader"),p=new h(".gallery a",{captionsData:"alt",captionDelay:250});let c="",d=1;v.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.searchQuery.value.trim(),!c){n.error({title:"Error",message:"Enter a valid search query"});return}d=1,L(f);try{l.classList.remove("hidden");const o=await u(c,d);if(o.hits.length===0){n.warning({message:"No images found. Try again!"});return}f.innerHTML=o.hits.map(m).join(""),p.refresh()}catch{n.error({title:"Error",message:"Failed to load images."})}finally{l.classList.add("hidden")}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){d+=1;try{l.classList.remove("hidden");const r=await u(c,d);if(r.hits.length===0){n.info({message:"No more images available."});return}f.insertAdjacentHTML("beforeend",r.hits.map(m).join("")),p.refresh()}catch{n.error({title:"Error",message:"Failed to load more images."})}finally{l.classList.add("hidden")}}});
//# sourceMappingURL=main-C1CNJ6p6.js.map
