import{S as f,i}from"./vendor-B9aX0573.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m="47470900-b8e0eef515806370832377144",p="https://pixabay.com/api/";async function g(r,o=1,s=20){const n=`${p}?key=${m}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`,e=await fetch(n);if(!e.ok)throw new Error("Failed to fetch data from Pixabay API.");return e.json()}function y(r){const o=document.querySelector(".gallery"),s=r.map(({webformatURL:e,largeImageURL:t,tags:a,likes:c,views:l,comments:d,downloads:u})=>`
    <li class="gallery-item">
      <a href="${t}">
        <img src="${e}" alt="${a}" loading="lazy">
      </a>
      <div class="info">
        <p><b>Likes:</b> ${c}</p>
        <p><b>Views:</b> ${l}</p>
        <p><b>Comments:</b> ${d}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </li>
  `).join("");o.insertAdjacentHTML("beforeend",s),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function h(){const r=document.getElementById("loader");r.hidden=!1}function b(){const r=document.getElementById("loader");r.hidden=!0}const L=document.getElementById("search-form"),$=document.querySelector(".gallery");L.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.elements.query.value.trim();if(!o){i.error({title:"Error",message:"Please enter a search term!"});return}$.innerHTML="",h();try{const{hits:s,totalHits:n}=await g(o);s.length===0?i.warning({title:"No results",message:"No images found. Try another query!"}):(y(s),i.success({title:"Success",message:`Found ${n} images!`}))}catch(s){i.error({title:"Error",message:s.message})}finally{b()}});
//# sourceMappingURL=main-CAQnJPrJ.js.map
