(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();class ${async render(){return`
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
    `}async afterRender(){document.getElementById("loginForm").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("email").value,r=document.getElementById("password").value,a=await(await fetch("https://story-api.dicoding.dev/v1/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:r})})).json();a.error?alert(a.message):(localStorage.setItem("token",a.loginResult.token),location.hash="/home")})}}class W{async render(){return`
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
    `}async afterRender(){document.getElementById("registerForm").addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("name").value,r=document.getElementById("email").value,o=document.getElementById("password").value,d=await(await fetch("https://story-api.dicoding.dev/v1/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,email:r,password:o})})).json();d.error?alert(d.message):(alert("Register berhasil"),location.hash="/login")})}}const I=(e,t)=>t.some(n=>e instanceof n);let A,O;function H(){return A||(A=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function K(){return O||(O=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const B=new WeakMap,S=new WeakMap,b=new WeakMap;function z(e){const t=new Promise((n,i)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",a)},o=()=>{n(p(e.result)),r()},a=()=>{i(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",a)});return b.set(t,e),t}function _(e){if(B.has(e))return;const t=new Promise((n,i)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",a),e.removeEventListener("abort",a)},o=()=>{n(),r()},a=()=>{i(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",a),e.addEventListener("abort",a)});B.set(e,t)}let x={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return B.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function F(e){x=e(x)}function U(e){return K().includes(e)?function(...t){return e.apply(T(this),t),p(this.request)}:function(...t){return p(e.apply(T(this),t))}}function G(e){return typeof e=="function"?U(e):(e instanceof IDBTransaction&&_(e),I(e,H())?new Proxy(e,x):e)}function p(e){if(e instanceof IDBRequest)return z(e);if(S.has(e))return S.get(e);const t=G(e);return t!==e&&(S.set(e,t),b.set(t,e)),t}const T=e=>b.get(e);function J(e,t,{blocked:n,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(e,t),d=p(a);return i&&a.addEventListener("upgradeneeded",c=>{i(p(a.result),c.oldVersion,c.newVersion,p(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),d.then(c=>{o&&c.addEventListener("close",()=>o()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),d}const Q=["get","getKey","getAll","getAllKeys","count"],X=["put","add","delete","clear"],E=new Map;function C(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(E.get(t))return E.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,r=X.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Q.includes(n)))return;const o=async function(a,...d){const c=this.transaction(a,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(d.shift())),(await Promise.all([l[n](...d),r&&c.done]))[0]};return E.set(t,o),o}F(e=>({...e,get:(t,n,i)=>C(t,n)||e.get(t,n,i),has:(t,n)=>!!C(t,n)||e.has(t,n)}));const Y=["continue","continuePrimaryKey","advance"],R={},D=new WeakMap,q=new WeakMap,Z={get(e,t){if(!Y.includes(t))return e[t];let n=R[t];return n||(n=R[t]=function(...i){D.set(this,q.get(this)[t](...i))}),n}};async function*ee(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,Z);for(q.set(n,t),b.set(n,T(t));t;)yield n,t=await(D.get(n)||t.continue()),D.delete(n)}function j(e,t){return t===Symbol.asyncIterator&&I(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&I(e,[IDBIndex,IDBObjectStore])}F(e=>({...e,get(t,n,i){return j(t,n)?ee:e.get(t,n,i)},has(t,n){return j(t,n)||e.has(t,n)}}));const te="story-app-db",ne=1,v="stories",P=J(te,ne,{upgrade(e){e.createObjectStore(v,{keyPath:"id"})}});async function re(e){return(await P).put(v,e)}async function oe(){return(await P).getAll(v)}async function ae(e){return(await P).delete(v,e)}class ie{async render(){return`
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
    `}async afterRender(){const t=localStorage.getItem("token");if(!t){location.hash="/login";return}document.getElementById("logoutButton").addEventListener("click",()=>{localStorage.removeItem("token"),location.hash="/login"});const r=(await(await fetch("https://story-api.dicoding.dev/v1/stories",{headers:{Authorization:`Bearer ${t}`}})).json()).listStory,o=document.getElementById("stories"),a=L.map("map").setView([-2.5,118],5),d=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}),c=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"});d.addTo(a);const l={OpenStreetMap:d,Satellite:c};L.control.layers(l).addTo(a),r.forEach(s=>{o.innerHTML+=`
        <article class="story-card">

          <img
            src="${s.photoUrl}"
            alt="Foto story dari ${s.name}"
            class="story-image"
          >

          <div class="story-content">

            <h2>${s.name}</h2>

            <p>
              ${s.description}
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
                data-id="${s.id}"
              >
                Simpan
              </button>

              <button
                class="delete-button"
                data-id="${s.id}"
              >
                Hapus
              </button>

            </div>

          </div>

        </article>
      `,s.lat&&s.lon&&L.marker([s.lat,s.lon]).addTo(a).bindPopup(`
            <b>${s.name}</b><br>
            ${s.description}
          `)}),document.querySelectorAll(".save-button").forEach(s=>{s.addEventListener("click",async()=>{const m=r.find(u=>u.id===s.dataset.id);await re(m),alert("Story berhasil disimpan")})}),document.querySelectorAll(".delete-button").forEach(s=>{s.addEventListener("click",async()=>{await ae(s.dataset.id),s.closest(".story-card").remove(),alert("Story berhasil dihapus")})});const h=await oe();console.log("IndexedDB Stories:",h)}}const se="https://story-api.dicoding.dev/v1";async function ce(e,t){return(await fetch(`${se}/stories`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e})).json()}let g=null;const de={async render(){return`
      <section class="container">

        <h1>Tambah Story</h1>

        <form id="add-story-form">

          <div class="form-control">
            <label for="description">
              Deskripsi
            </label>

            <textarea
              id="description"
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label for="photo">
              Upload Gambar
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
            />
          </div>

          <div class="form-control">
            <label>
              Atau Gunakan Kamera
            </label>

            <video
              id="camera-preview"
              autoplay
              playsinline
              width="300"
            ></video>

            <canvas
              id="camera-canvas"
              hidden
            ></canvas>

            <button
              type="button"
              id="open-camera"
            >
              Buka Kamera
            </button>

            <button
              type="button"
              id="capture-button"
            >
              Ambil Foto
            </button>
          </div>

          <div class="form-control">
            <label>
              Pilih Lokasi
            </label>

            <div
              id="map"
              style="
                height: 300px;
                margin-block: 1rem;
              "
            ></div>
          </div>

          <button type="submit">
            Tambah Story
          </button>

        </form>

      </section>
    `},async afterRender(){const e=document.querySelector("#add-story-form"),t=document.querySelector("#photo"),n=document.querySelector("#open-camera"),i=document.querySelector("#capture-button"),r=document.querySelector("#camera-preview"),o=document.querySelector("#camera-canvas");let a=null,d=null,c=null;const l=L.map("map").setView([-2.5,118],5),h=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}),s=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenTopoMap"});h.addTo(l),L.control.layers({OpenStreetMap:h,Topography:s}).addTo(l);let m;l.on("click",u=>{a=u.latlng.lat,d=u.latlng.lng,m&&l.removeLayer(m),m=L.marker([a,d]).addTo(l)}),n.addEventListener("click",async()=>{g=await navigator.mediaDevices.getUserMedia({video:!0}),r.srcObject=g}),i.addEventListener("click",()=>{const u=o.getContext("2d");o.width=r.videoWidth,o.height=r.videoHeight,u.drawImage(r,0,0),o.toBlob(f=>{c=f,alert("Foto berhasil diambil")},"image/jpeg"),g&&g.getTracks().forEach(f=>f.stop())}),e.addEventListener("submit",async u=>{u.preventDefault();const f=document.querySelector("#description").value;let w=t.files[0];!w&&c&&(w=new File([c],"camera.jpg",{type:"image/jpeg"}));const y=new FormData;y.append("description",f),y.append("photo",w),a&&d&&(y.append("lat",a),y.append("lon",d));const N=localStorage.getItem("token"),M=await ce(y,N);M.error?alert(M.message):(alert("Story berhasil ditambahkan"),window.location.hash="#/home")})}};function le(e){if(!document.startViewTransition){e();return}document.startViewTransition(()=>{e()}).finished.catch(()=>{})}const ue={"/login":$,"/register":W,"/home":ie,"/add-story":de};async function k(){const e=document.querySelector("#app"),t=location.hash.slice(1)||"/login",n=ue[t];if(!n){e.innerHTML=`
      <main>
        <h1>404 Page Not Found</h1>
      </main>
    `;return}const i=new n;le(async()=>{e.innerHTML=await i.render(),i.afterRender&&await i.afterRender()})}window.addEventListener("load",k);window.addEventListener("hashchange",k);async function V(){const e=document.querySelector("#app"),t=window.location.hash.slice(1)||"/",n=k[t];if(!n){e.innerHTML=`
      <section class="container">
        <h1>404 Page Not Found</h1>
      </section>
    `;return}document.startViewTransition?document.startViewTransition(async()=>{e.innerHTML=await n.render(),await n.afterRender()}):(e.innerHTML=await n.render(),await n.afterRender())}window.addEventListener("hashchange",V);window.addEventListener("load",async()=>{if(await V(),"serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/story-app/sw.js");console.log("Service Worker registered")}catch(e){console.error(e)}});
