(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();class W{async render(){return`
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
    `}async afterRender(){document.getElementById("loginForm").addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("email").value,o=document.getElementById("password").value,i=await(await fetch("https://story-api.dicoding.dev/v1/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:o})})).json();i.error?alert(i.message):(localStorage.setItem("token",i.loginResult.token),location.hash="/home")})}}class q{async render(){return`
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
    `}async afterRender(){document.getElementById("registerForm").addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("name").value,o=document.getElementById("email").value,r=document.getElementById("password").value,c=await(await fetch("https://story-api.dicoding.dev/v1/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,email:o,password:r})})).json();c.error?alert(c.message):(alert("Register berhasil"),location.hash="/login")})}}const b=(e,t)=>t.some(n=>e instanceof n);let k,A;function $(){return k||(k=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function _(){return A||(A=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const w=new WeakMap,h=new WeakMap,g=new WeakMap;function H(e){const t=new Promise((n,a)=>{const o=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{n(p(e.result)),o()},i=()=>{a(e.error),o()};e.addEventListener("success",r),e.addEventListener("error",i)});return g.set(t,e),t}function K(e){if(w.has(e))return;const t=new Promise((n,a)=>{const o=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",i),e.removeEventListener("abort",i)},r=()=>{n(),o()},i=()=>{a(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",r),e.addEventListener("error",i),e.addEventListener("abort",i)});w.set(e,t)}let E={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return w.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function O(e){E=e(E)}function z(e){return _().includes(e)?function(...t){return e.apply(I(this),t),p(this.request)}:function(...t){return p(e.apply(I(this),t))}}function J(e){return typeof e=="function"?z(e):(e instanceof IDBTransaction&&K(e),b(e,$())?new Proxy(e,E):e)}function p(e){if(e instanceof IDBRequest)return H(e);if(h.has(e))return h.get(e);const t=J(e);return t!==e&&(h.set(e,t),g.set(t,e)),t}const I=e=>g.get(e);function U(e,t,{blocked:n,upgrade:a,blocking:o,terminated:r}={}){const i=indexedDB.open(e,t),c=p(i);return a&&i.addEventListener("upgradeneeded",d=>{a(p(i.result),d.oldVersion,d.newVersion,p(i.transaction),d)}),n&&i.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{r&&d.addEventListener("close",()=>r()),o&&d.addEventListener("versionchange",l=>o(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const G=["get","getKey","getAll","getAllKeys","count"],Q=["put","add","delete","clear"],v=new Map;function T(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(v.get(t))return v.get(t);const n=t.replace(/FromIndex$/,""),a=t!==n,o=Q.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(o||G.includes(n)))return;const r=async function(i,...c){const d=this.transaction(i,o?"readwrite":"readonly");let l=d.store;return a&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),o&&d.done]))[0]};return v.set(t,r),r}O(e=>({...e,get:(t,n,a)=>T(t,n)||e.get(t,n,a),has:(t,n)=>!!T(t,n)||e.has(t,n)}));const X=["continue","continuePrimaryKey","advance"],M={},S=new WeakMap,R=new WeakMap,Y={get(e,t){if(!X.includes(t))return e[t];let n=M[t];return n||(n=M[t]=function(...a){S.set(this,R.get(this)[t](...a))}),n}};async function*Z(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,Y);for(R.set(n,t),g.set(n,I(t));t;)yield n,t=await(S.get(n)||t.continue()),S.delete(n)}function C(e,t){return t===Symbol.asyncIterator&&b(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&b(e,[IDBIndex,IDBObjectStore])}O(e=>({...e,get(t,n,a){return C(t,n)?Z:e.get(t,n,a)},has(t,n){return C(t,n)||e.has(t,n)}}));const ee="story-app-db",te=1,f="stories",B=U(ee,te,{upgrade(e){e.createObjectStore(f,{keyPath:"id"})}});async function ne(e){return(await B).put(f,e)}async function oe(){return(await B).getAll(f)}async function re(e){return(await B).delete(f,e)}class ae{async render(){return`
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
    `}async afterRender(){const t=localStorage.getItem("token");if(!t){location.hash="/login";return}document.getElementById("logoutButton").addEventListener("click",()=>{localStorage.removeItem("token"),location.hash="/login"});const o=(await(await fetch("https://story-api.dicoding.dev/v1/stories",{headers:{Authorization:`Bearer ${t}`}})).json()).listStory,r=document.getElementById("stories"),i=L.map("map").setView([-2.5,118],5),c=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}),d=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"});c.addTo(i);const l={OpenStreetMap:c,Satellite:d};L.control.layers(l).addTo(i),o.forEach(s=>{r.innerHTML+=`
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
      `,s.lat&&s.lon&&L.marker([s.lat,s.lon]).addTo(i).bindPopup(`
            <b>${s.name}</b><br>
            ${s.description}
          `)}),document.querySelectorAll(".save-button").forEach(s=>{s.addEventListener("click",async()=>{const u=o.find(m=>m.id===s.dataset.id);await ne(u),alert("Story berhasil disimpan")})}),document.querySelectorAll(".delete-button").forEach(s=>{s.addEventListener("click",async()=>{await re(s.dataset.id),s.closest(".story-card").remove(),alert("Story berhasil dihapus")})});const P=await oe();console.log("IndexedDB Stories:",P)}}class ie{async render(){return`
      <a href="#main-content" class="skip-link">
        Skip to Content
      </a>

      <header>
        <div class="container main-header">

          <a href="#/home" class="brand-name">
            Story App
          </a>

          <nav class="navigation-drawer">
            <ul class="nav-list">

              <li>
                <a href="#/home">
                  Home
                </a>
              </li>

              <li>
                <a href="#/add-story">
                  Tambah Story
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
        <h1>Tambah Story</h1>

        <form id="addStoryForm">

          <div style="margin-bottom:16px;">
            <label for="description">
              Deskripsi
            </label>

            <textarea
              id="description"
              required
              rows="5"
              style="
                width:100%;
                padding:10px;
              "
            ></textarea>
          </div>

          <div style="margin-bottom:16px;">
            <label for="photo">
              Upload Foto
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
            >
          </div>

          <!-- CAMERA -->
          <div style="margin-bottom:20px;">

            <video
              id="cameraPreview"
              autoplay
              playsinline
              width="300"
            ></video>

            <br><br>

            <button
              type="button"
              id="openCameraButton"
            >
              Buka Kamera
            </button>

            <button
              type="button"
              id="captureButton"
            >
              Ambil Foto
            </button>

            <canvas
              id="canvas"
              style="display:none"
            ></canvas>

          </div>

          <div style="margin-bottom:16px;">
            <label for="lat">
              Latitude
            </label>

            <input
              type="text"
              id="lat"
              readonly
              required
            >
          </div>

          <div style="margin-bottom:16px;">
            <label for="lon">
              Longitude
            </label>

            <input
              type="text"
              id="lon"
              readonly
              required
            >
          </div>

          <div
            id="map"
            aria-label="Peta memilih lokasi"
            style="
              height:400px;
              margin-bottom:20px;
            "
          ></div>

          <button type="submit">
            Tambah Story
          </button>

        </form>
      </main>

      <footer
        style="
          padding:20px;
          text-align:center;
        "
      >
        <p>Story App</p>
      </footer>
    `}async afterRender(){const t=document.getElementById("map");t._leaflet_id&&(t._leaflet_id=null);const n=L.map("map").setView([-2.5489,118.0149],5);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(n);let a;n.on("click",s=>{const{lat:u,lng:m}=s.latlng;document.getElementById("lat").value=u,document.getElementById("lon").value=m,a&&n.removeLayer(a),a=L.marker([u,m]).addTo(n)});const o=document.getElementById("cameraPreview"),r=document.getElementById("canvas"),i=document.getElementById("openCameraButton"),c=document.getElementById("captureButton");let d,l=null;i.addEventListener("click",async()=>{d=await navigator.mediaDevices.getUserMedia({video:!0}),o.srcObject=d}),c.addEventListener("click",()=>{const s=r.getContext("2d");r.width=o.videoWidth,r.height=o.videoHeight,s.drawImage(o,0,0,r.width,r.height),r.toBlob(u=>{l=new File([u],"camera.jpg",{type:"image/jpeg"})},"image/jpeg"),d&&d.getTracks().forEach(u=>u.stop())}),document.getElementById("addStoryForm").addEventListener("submit",async s=>{s.preventDefault();const u=localStorage.getItem("token"),m=document.getElementById("description").value,j=document.getElementById("photo").files[0],F=l||j,N=document.getElementById("lat").value,V=document.getElementById("lon").value,y=new FormData;y.append("description",m),y.append("photo",F),y.append("lat",N),y.append("lon",V);const D=await(await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${u}`},body:y})).json();D.error?alert(D.message):((await navigator.serviceWorker.ready).showNotification("Story berhasil dibuat",{body:m,icon:"/favicon.png"}),alert("Story berhasil ditambahkan"),location.hash="/home")})}}function se(e){if(!document.startViewTransition){e();return}document.startViewTransition(()=>{e()}).finished.catch(()=>{})}const de={"/login":W,"/register":q,"/home":ae,"/add-story":ie};async function x(){const e=document.querySelector("#app"),t=location.hash.slice(1)||"/login",n=de[t];if(!n){e.innerHTML=`
      <main>
        <h1>404 Page Not Found</h1>
      </main>
    `;return}const a=new n;se(async()=>{e.innerHTML=await a.render(),a.afterRender&&await a.afterRender()})}window.addEventListener("load",x);window.addEventListener("hashchange",x);x();"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{const e=await navigator.serviceWorker.register("/sw.js");console.log("Service Worker registered"),await Notification.requestPermission()}catch(e){console.error(e)}});
