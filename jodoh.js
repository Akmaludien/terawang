/* ============================================================
   RAMALIN — Terawang Jodoh 💘
   Slot reel 3D (three.js) + seeded RNG + share canvas.
   ============================================================ */
"use strict";

/* ---------------- DATA ---------------- */
const INISIAL_W = {A:9,D:8,M:9,R:8,S:8,N:6,P:6,B:6,H:5,F:5,I:5,K:5,L:4,T:5,W:4,Y:4,E:4,G:4,J:3,O:3,U:3,C:2,V:2,Z:1,Q:1,X:1};
const INISIAL = Object.keys(INISIAL_W);

const PROFESI = ["Pilot","Dokter","Barista","Anak Startup","Abang Ojol","Streamer","Guru","Arsitek",
"Fotografer","Chef","Atlet","Musisi","Penulis","Desainer","Programmer","Pengacara","Psikolog",
"Pramugari","Tentara","Polisi","Petani Milenial","Content Creator","MC Kondangan","Karyawan Bank",
"Freelancer","Ilmuwan","Calon Astronot","Sutradara","Komedian","Makeup Artist","Atlet E-sport",
"Pawang Hujan","Dukun Digital","Calon Mantu Idaman","CEO Startup","Influencer","Dosen",
"Kurir Paket","Nelayan","Penjaga Warteg"];

const PERSONALITY = [
["INTJ","Cintanya lewat spreadsheet perencanaan masa depan"],["INTP","Sayang tapi gengsi bilang, taunya lewat meme"],
["ENTJ","Nembak pakai proposal dan timeline yang jelas"],["ENTP","Debat kusir adalah bahasa cintanya"],
["INFJ","Paham kamu sebelum kamu sempat ngomong"],["INFP","Nulis puisi diam-diam tentang kamu"],
["ENFJ","Tipe yang dikenalin ke orang tua duluan"],["ENFP","Kencan pertamanya nggak akan kamu lupain"],
["ISTJ","Komitmennya sekuat kontrak notaris"],["ISFJ","Ingat semua hal kecil tentang kamu"],
["ESTJ","Ngatur jadwal kencan pakai Gantt chart"],["ESFJ","Dikenal baik sama semua tetangga kamu"],
["ISTP","Sayangnya lewat benerin motor kamu"],["ISFP","Romantisnya estetik kayak film indie"],
["ESTP","Adrenalin dulu, baper kemudian"],["ESFP","Pesta di mana-mana, hatinya cuma satu"],
["Si Paling Bucin","Chat dibalas kurang dari 1 menit, selalu"],["Tsundere","Jutek di depan, perhatian di belakang"],
["Misterius","Story-nya selalu bikin penasaran"],["Ambivert","Ramai di tongkrongan, manja kalau berdua"],
["Green Flag Jalan","Red flag? Nggak kenal"],["Anak Rumahan","Kencan ideal: rebahan bareng"],
["Petualang","Minggu ini gunung, minggu depan pantai"],["Si Paling Sabar","Dramamu dihadapi dengan senyum"]];

const TEMPAT = ["Kampus","Konser musik","Antre kopi","Gerbong KRL","DM TikTok","Kantin kantor",
"Grup WhatsApp RT","Nikahan teman","Perpustakaan","Gym","Event cosplay","Warung kopi",
"Bandara","KKN","Kelas online","Futsal","Pameran seni","Kajian"];

const FIRSTMOVE = ["Dia yang duluan nge-chat","Kamu yang duluan sapa","Teman yang comblangin",
"Salah kirim chat","Rebutan bangku","Ketemu pas hujan deras","Saling follow duluan",
"Dititipin barang","Satu kelompok tugas","Lomba 17-an","Ketiduran di bahu","Antre bareng"];

const REEL_LABELS = ["INISIAL","UMUR","TINGGI","PROFESI","KEPRIBADIAN"];

/* ---------------- SEEDED RNG ---------------- */
function hashStr(s){let h=5381;for(let i=0;i<s.length;i++){h=(((h<<5)+h)+s.charCodeAt(i))>>>0}return h}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeRng(key){return mulberry32(hashStr(key))}
function pickW(rng, items, weights){
  let total=0; for(const w of weights) total+=w;
  let r=rng()*total;
  for(let i=0;i<items.length;i++){r-=weights[i]; if(r<0) return items[i]}
  return items[items.length-1];
}
function pickU(rng, arr){return arr[Math.floor(rng()*arr.length)]}

/* ---------------- COMPUTE JODOH ---------------- */
function computeJodoh(nama, umur, tinggi, pers){
  const key=[nama,umur,tinggi,pers].join("|").toLowerCase().trim();
  const rng=makeRng(key);
  const inisial=pickW(rng, INISIAL, INISIAL.map(l=>INISIAL_W[l]));
  const lo=Math.max(18,umur-7), hi=Math.min(40,umur+7);
  const umurPool=[]; for(let u=lo;u<=hi;u++) umurPool.push(u);
  const umurOut=pickU(rng, umurPool);
  const tItems=[],tW=[];
  for(let t=155;t<=190;t++){tItems.push(t);tW.push(Math.max(1,Math.round(8-Math.abs(t-168)/2.2)))}
  const tinggiOut=pickW(rng, tItems, tW);
  const profesi=pickU(rng, PROFESI);
  const personality=pickU(rng, PERSONALITY);
  const tempat=pickU(rng, TEMPAT);
  const firstmove=pickU(rng, FIRSTMOVE);
  const skor=70+Math.floor(rng()*30);
  return {key, inisial, umur:umurOut, tinggi:tinggiOut, profesi,
          persLabel:personality[0], persDesc:personality[1],
          tempat, firstmove, skor};
}
function reelPools(j){
  const lo=Math.max(18,curUmur-7), hi=Math.min(40,curUmur+7);
  const umurPool=[]; for(let u=lo;u<=hi;u++) umurPool.push(String(u));
  const tinggiPool=[]; for(let t=155;t<=190;t++) tinggiPool.push(String(t)+" cm");
  return [INISIAL, umurPool, tinggiPool, PROFESI, PERSONALITY.map(p=>p[0])];
}
function targetIndexes(j){
  return [INISIAL.indexOf(j.inisial),
          reelPools(j)[1].indexOf(String(j.umur)),
          reelPools(j)[2].indexOf(String(j.tinggi)+" cm"),
          PROFESI.indexOf(j.profesi),
          PERSONALITY.findIndex(p=>p[0]===j.persLabel)];
}

/* ---------------- UI refs ---------------- */
const $=id=>document.getElementById(id);
const inNama=$("jNama"), inUmur=$("jUmur"), inTinggi=$("jTinggi"), inPers=$("jPers");
let curUmur=25, curHasil=null;

/* personality dropdown */
(function(){
  const groups=[["MBTI",PERSONALITY.slice(0,16)],["Tipe umum",PERSONALITY.slice(16)]];
  for(const [gl,items] of groups){
    const og=document.createElement("optgroup"); og.label=gl;
    for(const [label] of items){const o=document.createElement("option");o.value=label;o.textContent=label;og.appendChild(o)}
    inPers.appendChild(og);
  }
})();

function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),2200)}
function shake(el){el.classList.add("shake");setTimeout(()=>el.classList.remove("shake"),450);el.focus()}
async function refreshCounter(){
  try{const r=await fetch("/api/stats");const d=await r.json();
    $("counter").textContent=(d.total||0).toLocaleString("id-ID")}catch(e){$("counter").textContent="0"}
}

/* ---------------- AUDIO (WebAudio, tanpa file) ---------------- */
let AC=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}return AC}
function tick(){
  const c=ac(); if(!c) return;
  const o=c.createOscillator(),g=c.createGain();
  o.type="square";o.frequency.value=1400;
  g.gain.setValueAtTime(.06,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.05);
  o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.05);
}
function chime(){
  const c=ac(); if(!c) return;
  [660,990].forEach((f,i)=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type="sine";o.frequency.value=f;
    const t=c.currentTime+i*.12;
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.35);
    o.connect(g).connect(c.destination);o.start(t);o.stop(t+.4);
  });
}

/* ---------------- THREE.JS REELS ---------------- */
const COLS=8, CW=256, CH=128;
let renderer,scene,camera,reels=[],animId=null,use3D=false;
const REEL_SPACING=2.15;

function fitCamera(){
  const w=$("reelWrap");
  const aspect=w.clientWidth/Math.max(1,w.clientHeight);
  const halfW=(reels.length-1)*REEL_SPACING/2+1.25; /* semua reel + margin */
  const halfH=1.1;
  const vFov=camera.fov*Math.PI/180;
  const distW=halfW/(Math.tan(vFov/2)*aspect);
  const distH=halfH/Math.tan(vFov/2);
  camera.position.z=Math.max(distW,distH,4);
  camera.aspect=aspect;camera.updateProjectionMatrix();
  renderer.setSize(w.clientWidth,w.clientHeight);
}

function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}

function makeAtlas(labels){
  const rows=Math.ceil(labels.length/COLS);
  const cv=document.createElement("canvas");cv.width=COLS*CW;cv.height=rows*CH;
  const ctx=cv.getContext("2d");
  labels.forEach((t,j)=>{
    const c=j%COLS,r=(j/COLS)|0,x=c*CW,y=r*CH;
    ctx.fillStyle="#1e1826";roundRect(ctx,x+8,y+8,CW-16,CH-16,20);ctx.fill();
    ctx.strokeStyle="rgba(217,166,140,.5)";ctx.lineWidth=3;roundRect(ctx,x+8,y+8,CW-16,CH-16,20);ctx.stroke();
    let fs=54;ctx.textAlign="center";ctx.textBaseline="middle";
    do{ctx.font="bold "+fs+"px Georgia,serif";fs-=4}while(ctx.measureText(t).width>CW-44&&fs>22);
    ctx.fillStyle="#f5e9d4";ctx.fillText(t,x+CW/2,y+CH/2+2);
  });
  return {cv,rows};
}
function labelOffset(j,rows){return {x:(j%COLS)/COLS, y:1-(((j/COLS)|0)+1)/rows}}

function initThree(pools){
  const wrap=$("reelWrap");
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(wrap.clientWidth,wrap.clientHeight);
  wrap.appendChild(renderer.domElement);
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(32,wrap.clientWidth/wrap.clientHeight,.1,50);
  camera.position.set(0,0,7.2);
  const light=new THREE.AmbientLight(0xffffff,1);scene.add(light);
  reels=[];
  pools.forEach((labels,i)=>{
    const {cv,rows}=makeAtlas(labels);
    const tex=new THREE.CanvasTexture(cv);tex.anisotropy=4;
    const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true});
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2.05,1.02),mat);
    mesh.position.x=(i-(pools.length-1)/2)*REEL_SPACING;
    mesh.userData={tex,rows,labels,idx:Math.floor(Math.random()*labels.length),flip:0};
    const off=labelOffset(mesh.userData.idx,rows);
    tex.repeat.set(1/COLS,1/rows);tex.offset.set(off.x,off.y);
    scene.add(mesh);reels.push(mesh);
  });
  use3D=true;
  fitCamera();
  const t0=performance.now();
  (function loop(){
    animId=requestAnimationFrame(loop);
    const t=(performance.now()-t0)/1000;
    reels.forEach((m,i)=>{m.position.y=Math.sin(t*2+i*1.3)*.06;m.rotation.x+=(0-m.rotation.x)*.22});
    renderer.render(scene,camera);
  })();
  window.addEventListener("resize",fitCamera);
}
function setReelLabel(mesh,j){
  const u=mesh.userData;u.idx=j;
  const off=labelOffset(j,u.rows);
  u.tex.offset.set(off.x,off.y);
  mesh.rotation.x=-.55; /* efek flip */
}

/* Spin: tiap reel berhenti berurutan, mendarat tepat di target */
function spinReels(pools,targets,done){
  const timers=[];
  reels.forEach((mesh,i)=>{
    const N=pools[i].length,target=targets[i];
    const startIdx=mesh.userData.idx;
    const minTicks=16+i*8;
    const totalTicks=minTicks+((target-startIdx-minTicks)%N+N)%N;
    const startDelay=i*450;
    let tickCount=0,last=0;
    const t0=performance.now()+startDelay;
    function step(now){
      if(now<t0){timers[i]=requestAnimationFrame(step);return}
      if(!last)last=now;
      const p=tickCount/totalTicks;                 /* 0→1 */
      const interval=55+365*Math.pow(p,2.2);         /* ease-out */
      if(now-last>=interval){
        last=now;tickCount++;
        const j=(startIdx+tickCount)%N;
        setReelLabel(mesh,j);tick();
        if(tickCount>=totalTicks){chime();return}    /* berhenti */
      }
      timers[i]=requestAnimationFrame(step);
    }
    timers[i]=requestAnimationFrame(step);
  });
  /* panggil done setelah durasi maksimum */
  let maxMs=0;
  reels.forEach((mesh,i)=>{
    const N=pools[i].length,startIdx=mesh.userData.idx,target=targets[i];
    const minTicks=16+i*8;
    const totalTicks=minTicks+((target-startIdx-minTicks)%N+N)%N;
    let ms=i*450;
    for(let k=0;k<totalTicks;k++)ms+=55+365*Math.pow(k/totalTicks,2.2);
    if(ms>maxMs)maxMs=ms;
  });
  setTimeout(done,maxMs+600);
}

/* ---------------- FALLBACK 2D (kalau three.js gagal) ---------------- */
function spinFallback(pools,targets,done){
  const fb=$("reelFallback");fb.hidden=false;$("reelWrap").style.display="none";
  fb.innerHTML="";
  const cols=pools.map((labels,i)=>{
    const d=document.createElement("div");d.className="fb-col";
    d.innerHTML="<span>"+REEL_LABELS[i]+"</span><b>…</b>";
    fb.appendChild(d);return d;
  });
  pools.forEach((labels,i)=>{
    const target=targets[i],el=cols[i].querySelector("b");
    let n=0;const total=14+i*6;
    const iv=setInterval(()=>{
      el.textContent=labels[Math.floor(Math.random()*labels.length)];tick();
      if(++n>=total){clearInterval(iv);el.textContent=labels[target];chime();
        if(i===pools.length-1)setTimeout(done,500)}
    },90+i*22);
  });
}

/* ---------------- ALUR UTAMA ---------------- */
function validInputs(){
  const nama=inNama.value.trim();
  const umur=parseInt(inUmur.value,10), tinggi=parseInt(inTinggi.value,10);
  if(!nama){shake(inNama);return null}
  if(!umur||umur<17||umur>60){shake(inUmur);toast("Umur 17–60 ya");return null}
  if(!tinggi||tinggi<140||tinggi>210){shake(inTinggi);toast("Tinggi 140–210 cm ya");return null}
  if(!inPers.value){shake(inPers);return null}
  return {nama,umur,tinggi,pers:inPers.value};
}
function doGacha(fromLink){
  const v=fromLink||validInputs();
  if(!v)return;
  ac(); /* buka AudioContext dari gesture */
  curUmur=v.umur;
  curHasil=computeJodoh(v.nama,v.umur,v.tinggi,v.pers);
  curHasil.nama=v.nama;
  $("formPane").hidden=true;$("resultPane").hidden=true;$("bonusPane").hidden=true;
  $("stagePane").hidden=false;
  $("stagePane").scrollIntoView({behavior:"smooth",block:"start"});
  const pools=reelPools(curHasil),targets=targetIndexes(curHasil);
  const finish=()=>showBonus();
  try{
    if(!use3D){initThree(pools)}
    else{ /* reset texture ke posisi acak awal */
      reels.forEach((m,i)=>{const j=Math.floor(Math.random()*pools[i].length);setReelLabel(m,j);m.rotation.x=0});
    }
    $("reelWrap").style.display="block";$("reelFallback").hidden=true;
    spinReels(pools,targets,finish);
  }catch(e){ spinFallback(pools,targets,finish); }
}
$("gachaBtn").onclick=()=>doGacha();
[inNama,inUmur,inTinggi].forEach(el=>el.addEventListener("keydown",e=>{if(e.key==="Enter")doGacha()}));

/* ---------------- BONUS CARDS ---------------- */
const ICO={
pin:'<svg viewBox="0 0 24 24" fill="none" stroke="#d9a68c" stroke-width="1.8" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
chat:'<svg viewBox="0 0 24 24" fill="none" stroke="#d9a68c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v10H9l-5 4z"/></svg>',
heart:'<svg viewBox="0 0 24 24" fill="none" stroke="#d9a68c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20C7.5 15.5 4.5 12.3 4.5 8.9 4.5 6.4 6.6 5 8.9 5c1.6 0 2.6.9 3.1 1.9.5-1 1.5-1.9 3.1-1.9 2.3 0 4.4 1.4 4.4 3.9 0 3.4-3 6.6-7.5 11.1z"/></svg>'};
const BONUS=[
  ()=>["pin","KETEMU DI MANA",curHasil.tempat],
  ()=>["chat","FIRST MOVE",curHasil.firstmove],
  ()=>["heart","SKOR KECOCOKAN",curHasil.skor+"%"],
];
function showBonus(){
  $("bonusPane").hidden=false;
  const wrap=$("bonusCards");wrap.innerHTML="";
  BONUS.forEach((fn,i)=>{
    const [ic,label,val]=fn();
    const d=document.createElement("div");d.className="bcard";
    d.innerHTML='<div class="binner"><div class="bfront"><p class="blabel">'+label+'</p></div>'+
      '<div class="bback">'+ICO[ic]+'<p class="blabel">'+label+'</p><p class="bval">'+val+'</p></div></div>';
    wrap.appendChild(d);
    setTimeout(()=>{d.classList.add("flip");chime()},400+i*900);
  });
  setTimeout(showFinal,400+BONUS.length*900+700);
}

/* ---------------- HASIL FINAL ---------------- */
function showFinal(){
  const j=curHasil;
  $("rNama").textContent=j.nama.toUpperCase();
  $("rInisial").textContent=j.inisial;
  $("rUmur").textContent=j.umur+" tahun";
  $("rTinggi").textContent=j.tinggi+" cm";
  $("rProfesi").textContent=j.profesi;
  $("rPers").textContent=j.persLabel;
  $("rPersDesc").textContent="“"+j.persDesc+"”";
  $("rTempat").textContent=j.tempat;
  $("rFirst").textContent=j.firstmove;
  $("rSkor").textContent=j.skor+"%";
  $("resultPane").hidden=false;
  drawShareCard();
  $("resultPane").scrollIntoView({behavior:"smooth",block:"start"});
  try{history.replaceState(null,"","?jodoh=1&nama="+encodeURIComponent(j.nama)+
    "&umur="+curUmur+"&tinggi="+$("jTinggi").value+"&pers="+encodeURIComponent($("jPers").value))}catch(e){}
  refreshCounter();
}
$("againBtn").onclick=()=>{
  $("resultPane").hidden=true;$("bonusPane").hidden=true;$("stagePane").hidden=true;
  $("formPane").hidden=false;
  try{history.replaceState(null," ",location.pathname)}catch(e){}
  window.scrollTo({top:0,behavior:"smooth"});
};

/* ---------------- SHARE CANVAS ---------------- */
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function wrap(ctx,text,maxW){const words=text.split(" "),lines=[];let line="";
  for(const w of words){const t=line?line+" "+w:w;if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=w}else line=t}
  if(line)lines.push(line);return lines}
function stars(ctx,W,H,seed){let s=hashStr(seed);const rnd=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
  ctx.fillStyle="#ffd9e8";for(let i=0;i<70;i++){ctx.globalAlpha=.12+rnd()*.45;ctx.beginPath();ctx.arc(rnd()*W,rnd()*H,rnd()*2.4,0,7);ctx.fill()}ctx.globalAlpha=1}
function drawShareCard(){
  const j=curHasil,cv=$("shareCanvas"),ctx=cv.getContext("2d"),W=1080,H=1350;
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#1a1526");g.addColorStop(1,"#0d0b13");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);stars(ctx,W,H,j.key+"jodoh");
  /* bingkai ganda */
  ctx.strokeStyle="rgba(217,166,140,.55)";ctx.lineWidth=5;rr(ctx,40,40,W-80,H-80,10);ctx.stroke();
  ctx.strokeStyle="rgba(217,166,140,.25)";ctx.lineWidth=2;rr(ctx,62,62,W-124,H-124,6);ctx.stroke();
  ctx.textAlign="center";
  /* stempel lilin */
  ctx.fillStyle="#a84352";ctx.beginPath();ctx.arc(W/2,168,58,0,7);ctx.fill();
  ctx.strokeStyle="#e8b48a";ctx.lineWidth=2.5;ctx.setLineDash([7,7]);
  ctx.beginPath();ctx.arc(W/2,168,45,0,7);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#f2d7c2";
  ctx.beginPath();
  ctx.moveTo(W/2,192);
  ctx.bezierCurveTo(W/2-26,168,W/2-32,160,W/2-32,152);
  ctx.bezierCurveTo(W/2-32,142,W/2-24,138,W/2-18,138);
  ctx.bezierCurveTo(W/2-12,138,W/2-8,142,W/2,148);
  ctx.bezierCurveTo(W/2+8,142,W/2+12,138,W/2+18,138);
  ctx.bezierCurveTo(W/2+24,138,W/2+32,142,W/2+32,152);
  ctx.bezierCurveTo(W/2+32,160,W/2+26,168,W/2,192);
  ctx.fill();
  ctx.fillStyle="#f5e6cf";ctx.font="64px Marcellus,Georgia,serif";
  ctx.fillText("R A M A L I N",W/2,300);
  ctx.fillStyle="#a89880";ctx.font="italic 30px Georgia,serif";
  ctx.fillText("Terawang jodohmu",W/2,352);
  ctx.fillStyle="#a89880";ctx.font="28px Georgia,serif";
  ctx.fillText("JODOH BERIKUTNYA "+j.nama.toUpperCase(),W/2,420);
  ctx.fillStyle="#eecfae";ctx.font="120px Marcellus,Georgia,serif";
  ctx.fillText(j.inisial,W/2,560);
  const rows=[["UMUR",j.umur+" tahun"],["TINGGI",j.tinggi+" cm"],
              ["PROFESI",j.profesi],["KEPRIBADIAN",j.persLabel]];
  ctx.textAlign="left";
  rows.forEach((r,i)=>{
    const y=680+i*68;
    ctx.fillStyle="#a89880";ctx.font="26px Georgia,serif";ctx.fillText(r[0],120,y);
    ctx.fillStyle="#f2e7d5";ctx.font="38px Marcellus,Georgia,serif";
    wrap(ctx,r[1],560).slice(0,1).forEach(l=>ctx.fillText(l,420,y));
  });
  ctx.textAlign="center";ctx.fillStyle="#cbb393";ctx.font="italic 30px Georgia,serif";
  wrap(ctx,"“"+j.persDesc+"”",860).slice(0,2).forEach((l,i)=>ctx.fillText(l,W/2,1000+i*44));
  /* perforasi */
  ctx.strokeStyle="rgba(217,166,140,.5)";ctx.lineWidth=3;ctx.setLineDash([16,14]);
  ctx.beginPath();ctx.moveTo(110,1108);ctx.lineTo(W-110,1108);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#a89880";ctx.font="28px Georgia,serif";
  ctx.fillText(j.tempat+"  ·  "+j.firstmove,W/2,1160);
  ctx.fillStyle="#eecfae";ctx.font="110px Marcellus,Georgia,serif";
  ctx.fillText(j.skor+"%",W/2,1268);
}
function downloadCanvas(){
  const j=curHasil;
  $("shareCanvas").toBlob(b=>{const a=document.createElement("a");
    a.href=URL.createObjectURL(b);
    a.download="ramalin-jodoh-"+j.nama.toLowerCase().replace(/\s+/g,"-")+".png";
    a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    toast("Kartu tersimpan! Bagikan ke story 📲")});
}
$("dlBtn").onclick=downloadCanvas;
$("shareBtn").onclick=()=>{
  const j=curHasil;
  const url=location.origin+location.pathname+"?jodoh=1&nama="+encodeURIComponent(j.nama)+
    "&umur="+curUmur+"&tinggi="+$("jTinggi").value+"&pers="+encodeURIComponent($("jPers").value);
  const data={title:"Ramalin 💘",
    text:"Jodohku berikutnya: inisial "+j.inisial+", "+j.umur+" thn, "+j.profesi+"! Skor "+j.skor+"% 💘 Cek jodohmu",
    url};
  if(navigator.share){navigator.share(data).catch(()=>{})}
  else{navigator.clipboard.writeText(data.text+" "+url).then(()=>toast("Link disalin! 📋")).catch(()=>toast("Gagal menyalin"))}
};

/* ---------------- INIT ---------------- */
refreshCounter();
(function(){
  const qp=new URLSearchParams(location.search);
  if(qp.get("jodoh")==="1"&&qp.get("nama")){
    inNama.value=qp.get("nama")||"";
    inUmur.value=qp.get("umur")||"";
    inTinggi.value=qp.get("tinggi")||"";
    const p=qp.get("pers")||"";
    if(p){for(const o of inPers.options){if(o.value===p){inPers.value=p;break}}}
    setTimeout(()=>doGacha(),700);
  }
})();
