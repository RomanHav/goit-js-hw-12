import{a as h,i as m,S as w}from"./assets/vendor-550cebad.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();let r={page:1,per_page:15},u=0;async function b(s){try{const o={q:s,key:"43138861-aa01fee7d014e33c8f4078e7d",image_type:"photo",orientation:"horizontal",safesearch:!0},a=await h.get(`https://pixabay.com/api/?key=${o.key}&q=${o.q}&image_type=${o.image_type}&orientation=${o.orientation}&safesearch=${o.safesearch}&page=${r.page}&per_page=${r.per_page}`);if(a.status!==200)throw new Error(a.status);return u=a.data.totalHits,a.data}catch(o){throw console.error("Fetch error:",o),o}}const v=document.querySelector(".search"),$=document.querySelector(".load-button"),f=document.querySelector(".gallery"),c=document.querySelector(".loader");async function d(){c.style.display="block";try{const s=await b(v.value.trim());if(s.hits.length===0)c.style.display="none",m.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B"}),$.style.display="none";else{const o=s.hits.map(e=>`<li class="gallery-item">
        <a class="image-link" href="${e.largeImageURL}">
        <img class="image" src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <ul class="about-image">
        <li class="likes">
            <span class="likes-title">Likes</span>
            <span class="likes-count">${e.likes}</span>
            </li>
            <li class="views">
            <span class="views-title">Views</span>
            <span class="views-count">${e.views}</span>
            </li>
            <li class="comments">
            <span class="comments-title">Comments</span>
            <span class="comments-count">${e.comments}</span>
            </li>
            <li class="downloads">
            <span class="downloads-title">Downloads</span>
            <span class="downloads-count">${e.downloads}</span>
            </li>
            </ul>
            </li>`).join("");c.style.display="none",f.insertAdjacentHTML("beforeend",o),new w(".gallery a",{captionsData:"alt",captionsDelay:250}).refresh();const n=document.querySelector(".gallery-item"),t=n.getBoundingClientRect();console.log(n.getBoundingClientRect()),window.scrollBy({top:t.height*2,behavior:"smooth"})}}catch(s){console.error("Error fetching data:",s)}}const y=document.querySelector(".load-button");y.style.display="none";const l=document.querySelector(".search"),B=document.querySelector(".button");let g="";function p(){return g=l.value.trim(),g}function q(){return g}function k(s){s.preventDefault(),p().length===0?(console.log(`${p()}----`),m.error({theme:"dark",message:"The field must be fullfield",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",progressBarColor:"#B51B1B"})):(console.log(p()),f.innerHTML="",r.page=1,d(),l.value="",y.style.display="block")}y.addEventListener("click",s=>{r.page++,l.value=q();const o=Math.ceil(u/r.per_page),a=r.page*r.per_page;if(r.page===o)return r.per_page=a-u,console.log(r.per_page),d(),s.target.style.display="none",m.info({position:"topRight",message:"We're sorry, there are no more posts to load"});d(),l.value=""});B.addEventListener("click",k);
//# sourceMappingURL=commonHelpers.js.map
