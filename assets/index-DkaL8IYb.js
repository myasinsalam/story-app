(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const h=(e,t)=>t.some(n=>e instanceof n);let E,I;function C(){return E||(E=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function F(){return I||(I=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const g=new WeakMap,f=new WeakMap,m=new WeakMap;function j(e){const t=new Promise((n,i)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(u(e.result)),r()},o=()=>{i(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",o)});return m.set(t,e),t}function N(e){if(g.has(e))return;const t=new Promise((n,i)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});g.set(e,t)}let b={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return g.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return u(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function T(e){b=e(b)}function q(e){return F().includes(e)?function(...t){return e.apply(v(this),t),u(this.request)}:function(...t){return u(e.apply(v(this),t))}}function V(e){return typeof e=="function"?q(e):(e instanceof IDBTransaction&&N(e),h(e,C())?new Proxy(e,b):e)}function u(e){if(e instanceof IDBRequest)return j(e);if(f.has(e))return f.get(e);const t=V(e);return t!==e&&(f.set(e,t),m.set(t,e)),t}const v=e=>m.get(e);function $(e,t,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(e,t),d=u(o);return i&&o.addEventListener("upgradeneeded",c=>{i(u(o.result),c.oldVersion,c.newVersion,u(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),d.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),d}const W=["get","getKey","getAll","getAllKeys","count"],H=["put","add","delete","clear"],y=new Map;function B(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(y.get(t))return y.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,r=H.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||W.includes(n)))return;const s=async function(o,...d){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(d.shift())),(await Promise.all([l[n](...d),r&&c.done]))[0]};return y.set(t,s),s}T(e=>({...e,get:(t,n,i)=>B(t,n)||e.get(t,n,i),has:(t,n)=>!!B(t,n)||e.has(t,n)}));const _=["continue","continuePrimaryKey","advance"],D={},w=new WeakMap,A=new WeakMap,K={get(e,t){if(!_.includes(t))return e[t];let n=D[t];return n||(n=D[t]=function(...i){w.set(this,A.get(this)[t](...i))}),n}};async function*z(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,K);for(A.set(n,t),m.set(n,v(t));t;)yield n,t=await(w.get(n)||t.continue()),w.delete(n)}function x(e,t){return t===Symbol.asyncIterator&&h(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&h(e,[IDBIndex,IDBObjectStore])}T(e=>({...e,get(t,n,i){return x(t,n)?z:e.get(t,n,i)},has(t,n){return x(t,n)||e.has(t,n)}}));const J="story-app-db",U=1,p="stories",S=$(J,U,{upgrade(e){e.createObjectStore(p,{keyPath:"id"})}});async function G(e){return(await S).put(p,e)}async function Q(){return(await S).getAll(p)}async function X(e){return(await S).delete(p,e)}class Y{async render(){return`
      <main
        id="main-content"
        class="container"
      >

        <section class="home-header">

          <h1>Daftar Story</h1>

          <div class="story-actions">

            <a
              href="#/add-story"
              class="button"
            >
              Tambah Story
            </a>

            <button
              id="logoutButton"
              class="button"
            >
              Logout
            </button>

          </div>

        </section>

        <section
          id="map"
          style="
            height:400px;
            margin-block:20px;
          "
          aria-label="Peta story"
        ></section>

        <section
          id="stories"
          class="stories-grid"
        ></section>

      </main>
    `}async afterRender(){const t=localStorage.getItem("token");if(!t){location.hash="/login";return}document.getElementById("logoutButton").addEventListener("click",()=>{localStorage.removeItem("token"),location.hash="/login"});const r=(await(await fetch("https://story-api.dicoding.dev/v1/stories",{headers:{Authorization:`Bearer ${t}`}})).json()).listStory,s=document.getElementById("stories"),o=L.map("map").setView([-2.5,118],5),d=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}),c=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"});d.addTo(o);const l={OpenStreetMap:d,Satellite:c};L.control.layers(l).addTo(o),r.forEach(a=>{s.innerHTML+=`
        <article class="story-card">

          <img
            src="${a.photoUrl}"
            alt="Foto story dari ${a.name}"
            class="story-image"
          >

          <div class="story-content">

            <h2>${a.name}</h2>

            <p>
              ${a.description}
            </p>

            <div
              style="
                display:flex;
                gap:10px;
                margin-top:10px;
              "
            >

              <button
                class="save-button"
                data-id="${a.id}"
              >
                Simpan
              </button>

              <button
                class="delete-button"
                data-id="${a.id}"
              >
                Hapus
              </button>

            </div>

          </div>

        </article>
      `,a.lat&&a.lon&&L.marker([a.lat,a.lon]).addTo(o).bindPopup(`
            <b>${a.name}</b><br>
            ${a.description}
          `)}),document.querySelectorAll(".save-button").forEach(a=>{a.addEventListener("click",async()=>{const O=r.find(R=>R.id===a.dataset.id);await G(O),alert("Story berhasil disimpan")})}),document.querySelectorAll(".delete-button").forEach(a=>{a.addEventListener("click",async()=>{await X(a.dataset.id),a.closest(".story-card").remove(),alert("Story berhasil dihapus")})});const k=await Q();console.log("IndexedDB Stories:",k)}}class P{async render(){return`
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/login" class="brand-name">
            Story App
          </a>

          <nav class="navigation-drawer">
            <ul class="nav-list">

              <li>
                <a href="#/login">
                  Login
                </a>
              </li>

              <li>
                <a href="#/register">
                  Register
                </a>
              </li>

            </ul>
          </nav>

        </div>
      </header>

      <main
        id="main-content"
        class="main-content container"
      >
        <h1>Login</h1>

        <form id="loginForm">

          <div style="margin-bottom:16px;">
            <label for="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p style="margin-top:20px;">
          Belum punya akun?

          <a href="#/register">
            Register
          </a>
        </p>
      </main>

      <footer
        style="
          padding:20px;
          text-align:center;
        "
      >
        <p>Story App</p>
      </footer>
    `}async afterRender(){document.getElementById("loginForm").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("email").value,r=document.getElementById("password").value,o=await(await fetch("https://story-api.dicoding.dev/v1/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:r})})).json();o.error?alert(o.message):(localStorage.setItem("token",o.loginResult.token),location.hash="/home")})}}class Z{async render(){return`
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/register" class="brand-name">
            Story App
          </a>

          <nav class="navigation-drawer">
            <ul class="nav-list">

              <li>
                <a href="#/login">
                  Login
                </a>
              </li>

              <li>
                <a href="#/register">
                  Register
                </a>
              </li>

            </ul>
          </nav>

        </div>
      </header>

      <main
        id="main-content"
        class="main-content container"
      >
        <h1>Register</h1>

        <form id="registerForm">

          <div style="margin-bottom:16px;">
            <label for="name">
              Nama
            </label>

            <input
              type="text"
              id="name"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              style="
                width:100%;
                padding:10px;
              "
            >
          </div>

          <button type="submit">
            Register
          </button>

        </form>

        <p style="margin-top:20px;">
          Sudah punya akun?

          <a href="#/login">
            Login
          </a>
        </p>
      </main>

      <footer
        style="
          padding:20px;
          text-align:center;
        "
      >
        <p>Story App</p>
      </footer>
    `}async afterRender(){document.getElementById("registerForm").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("name").value,r=document.getElementById("email").value,s=document.getElementById("password").value,d=await(await fetch("https://story-api.dicoding.dev/v1/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,email:r,password:s})})).json();d.error?alert(d.message):(alert("Register berhasil"),location.hash="/login")})}}const ee="https://story-api.dicoding.dev/v1";async function te(e,t){return(await fetch(`${ee}/stories`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e})).json()}const ne={async render(){return`
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
    `},async afterRender(){document.querySelector("#addStoryForm").addEventListener("submit",async t=>{t.preventDefault();const n=document.querySelector("#description").value,i=document.querySelector("#photo").files[0],r=new FormData;r.append("description",n),r.append("photo",i);const s=localStorage.getItem("token"),o=await te(r,s);o.error?alert(o.message):(alert("Story berhasil ditambahkan"),window.location.hash="#/home")})}},re={"/":P,"/login":P,"/register":Z,"/home":Y,"/add-story":ne};async function M(){const e=document.querySelector("#app"),t=window.location.hash.slice(1)||"/",n=re[t];if(!n){e.innerHTML=`
      <section class="container">
        <h1>404 Page Not Found</h1>
      </section>
    `;return}document.startViewTransition?document.startViewTransition(async()=>{e.innerHTML=await n.render(),await n.afterRender()}):(e.innerHTML=await n.render(),await n.afterRender())}window.addEventListener("hashchange",M);window.addEventListener("load",async()=>{if(await M(),"serviceWorker"in navigator)try{await navigator.serviceWorker.register("/story-app/sw.js"),console.log("Service Worker registered")}catch(e){console.error(e)}});
