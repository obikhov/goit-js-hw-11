import{a as f,S as d,i}from"./assets/vendor-YT4DRQk6.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const m="твій_ключ",g="https://pixabay.com/api/";async function y(o,t=1,a=40){const s={key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:a};return(await f.get(g,{params:s})).data}function h(o){return o.map(({webformatURL:t,largeImageURL:a,tags:s,likes:e,views:r,comments:n,downloads:p})=>`
        <div class="photo-card">
          <a href="${a}">
            <img src="${t}" alt="${s}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes</b>: ${e}</p>
            <p><b>Views</b>: ${r}</p>
            <p><b>Comments</b>: ${n}</p>
            <p><b>Downloads</b>: ${p}</p>
          </div>
        </div>
      `).join("")}const b=document.querySelector("#search-form"),l=document.querySelector(".gallery");let u=1,c="";const L=new d(".gallery a");b.addEventListener("submit",async o=>{if(o.preventDefault(),c=o.currentTarget.elements.searchQuery.value.trim(),!c){i.warning({message:"Please enter a search query!"});return}u=1,l.innerHTML="";try{const t=await y(c,u);if(t.hits.length===0){i.error({message:"No images found. Please try again!"});return}l.innerHTML=h(t.hits),L.refresh()}catch(t){i.error({message:"Something went wrong. Please try again!"}),console.error(t)}});
//# sourceMappingURL=index.js.map
