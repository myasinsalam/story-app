(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const a="https://story-api.dicoding.dev/v1";async function l(r,t,o){return(await fetch(`${a}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r,email:t,password:o})})).json()}async function u(r,t){return(await fetch(`${a}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,password:t})})).json()}async function p(r){return(await fetch(`${a}/stories`,{headers:{Authorization:`Bearer ${r}`}})).json()}async function m(r,t){return(await fetch(`${a}/stories`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:r})).json()}const f={async render(){return`
      <section class="container">

        <h1>Daftar Story</h1>

        <div id="stories"></div>

      </section>
    `},async afterRender(){const r=localStorage.getItem("token"),t=await p(r),o=document.querySelector("#stories");o.innerHTML=t.listStory.map(s=>`
          <div>

            <img
              src="${s.photoUrl}"
              width="300"
            />

            <h2>
              ${s.name}
            </h2>

            <p>
              ${s.description}
            </p>

          </div>
        `).join("")}},c={async render(){return`
      <section class="container">

        <h1>Login</h1>

        <form id="loginForm">

          <input
            type="email"
            id="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </section>
    `},async afterRender(){document.querySelector("#loginForm").addEventListener("submit",async t=>{t.preventDefault();const o=document.querySelector("#email").value,s=document.querySelector("#password").value,e=await u(o,s);e.error?alert(e.message):(localStorage.setItem("token",e.loginResult.token),window.location.hash="#/home")})}},y={async render(){return`
      <section class="container">

        <h1>Register</h1>

        <form id="registerForm">

          <input
            type="text"
            id="name"
            placeholder="Nama"
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

      </section>
    `},async afterRender(){document.querySelector("#registerForm").addEventListener("submit",async t=>{t.preventDefault();const o=document.querySelector("#name").value,s=document.querySelector("#email").value,e=document.querySelector("#password").value,n=await l(o,s,e);n.error?alert(n.message):(alert("Register berhasil"),window.location.hash="#/login")})}},h={async render(){return`
      <section class="container">

        <h1>Tambah Story</h1>

        <form id="addStoryForm">

          <div>
            <label for="description">
              Deskripsi
            </label>

            <input
              type="text"
              id="description"
              required
            />
          </div>

          <div>
            <label for="photo">
              Foto
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
              required
            />
          </div>

          <button type="submit">
            Tambah Story
          </button>

        </form>

      </section>
    `},async afterRender(){document.querySelector("#addStoryForm").addEventListener("submit",async t=>{t.preventDefault();const o=document.querySelector("#description").value,s=document.querySelector("#photo").files[0],e=new FormData;e.append("description",o),e.append("photo",s);const n=localStorage.getItem("token"),i=await m(e,n);i.error?alert(i.message):(alert("Story berhasil ditambahkan"),window.location.hash="#/home")})}},g={"/":c,"/login":c,"/register":y,"/home":f,"/add-story":h};async function d(){const r=document.querySelector("#app"),t=window.location.hash.slice(1)||"/",o=g[t];if(!o){r.innerHTML=`
      <section class="container">
        <h1>404 Page Not Found</h1>
      </section>
    `;return}document.startViewTransition?document.startViewTransition(async()=>{r.innerHTML=await o.render(),await o.afterRender()}):(r.innerHTML=await o.render(),await o.afterRender())}window.addEventListener("hashchange",d);window.addEventListener("load",async()=>{if(await d(),"serviceWorker"in navigator)try{await navigator.serviceWorker.register("/story-app/sw.js"),console.log("Service Worker registered")}catch(r){console.error(r)}});
