import{a as y,i as p,S as m}from"./assets/vendor-550cebad.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();let l={page:1,per_page:15};async function f(n){try{const e={q:n,key:"43138861-aa01fee7d014e33c8f4078e7d",image_type:"photo",orientation:"horizontal",safesearch:!0},o=await y.get(`https://pixabay.com/api/?key=${e.key}&q=${e.q}&image_type=${e.image_type}&orientation=${e.orientation}&safesearch=${e.safesearch}&page=${l.page}&per_page=${l.per_page}`);if(o.status!==200)throw new Error(o.status);return o.data}catch(e){throw console.error("Fetch error:",e),e}}const d=document.querySelector(".search");let u="";function i(){return u=d.value.trim(),u}function h(){d.value=""}async function g(){const n=document.querySelector(".gallery"),e=document.querySelector(".loader"),o=i();e.style.display="block";try{const a=await f(o);if(a.hits.length===0)e.style.display="none",p.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B"});else{const t=a.hits.map(r=>`<li class="gallery-item">
        <a class="image-link" href="${r.largeImageURL}">
          <img class="image" src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <ul class="about-image">
          <li class="likes">
            <span class="likes-title">Likes</span>
            <span class="likes-count">${r.likes}</span>
          </li>
          <li class="views">
            <span class="views-title">Views</span>
            <span class="views-count">${r.views}</span>
          </li>
          <li class="comments">
            <span class="comments-title">Comments</span>
            <span class="comments-count">${r.comments}</span>
          </li>
          <li class="downloads">
            <span class="downloads-title">Downloads</span>
            <span class="downloads-count">${r.downloads}</span>
          </li>
        </ul>
      </li>`).join("");e.style.display="none",n.insertAdjacentHTML("beforeend",t),new m(".gallery a",{captionsData:"alt",captionsDelay:250}).refresh()}}catch(a){console.error("Error fetching data:",a)}}async function w(){l.page+=1,g()}const b=document.querySelector(".search"),$=document.querySelector(".button"),L=document.querySelector(".gallery"),c=document.querySelector(".load-button");c.style.display="none";function k(n){n.preventDefault(),i().length===0?p.error({theme:"dark",message:"The field must be fullfield",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B"}):(L.innerHTML="",g(),h(),c.style.display="block")}b.addEventListener("input",i);$.addEventListener("click",k);c.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
