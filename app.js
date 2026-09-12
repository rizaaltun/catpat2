const A={
  menuBg:'assets/ui/menu_background.png', logo:'assets/ui/title_logo.png',
  playNormal:'assets/ui/button_play_normal.png', playPressed:'assets/ui/button_play_pressed.png',
  mapBg:'assets/ui/chapter_map.png',
  bg1:'assets/backgrounds/scene_01_warm_festival.png', bg2:'assets/backgrounds/scene_02_river.png',
  bg3:'assets/backgrounds/scene_03_waterfall.png', bg4:'assets/backgrounds/scene_04_festival_approach.png',
  pitpit:'assets/friends/pitpit.png', porsuk:'assets/friends/porsuk_happy.png', baykus:'assets/friends/baykus_happy.png', civciv:'assets/friends/civciv_happy.png',
  daisy:'assets/characters/daisy.png',
  storyGarden:'assets/story/story_garden.png', storyTrampled:'assets/story/story_trampled.png', storyHappy:'assets/story/story_catpat_happy_book.png',
  pShort:'assets/platforms/short.png', pMedium:'assets/platforms/medium.png', pLong:'assets/platforms/long.png',
  pBridge:'assets/platforms/bridge.png', pStep:'assets/platforms/step.png', pStump:'assets/platforms/stump.png',
  hCrate:'assets/hazards/crate.png', hStone:'assets/hazards/stone.png', hThorn:'assets/hazards/thorn.png',
  hWheel:'assets/hazards/spikewheel.png', hFence:'assets/hazards/fence.png', hLog:'assets/hazards/moving_log.png'
};
for(let i=0;i<8;i++){
 const n=String(i).padStart(2,'0');
 A['idle'+i]=`assets/characters/catpat/idle/catpat_idle_${n}.png`;
 A['run'+i]=`assets/characters/catpat/run/catpat_run_${n}.png`;
 A['jump'+i]=`assets/characters/catpat/jump/catpat_jump_${n}.png`;
 A['cele'+i]=`assets/characters/catpat/celebrate/catpat_celebrate_${n}.png`;
}

const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
const V={w:1280,h:720};let scale=1,ox=0,oy=0;
function resize(){
  const dpr=Math.min(2,devicePixelRatio||1); canvas.width=Math.max(1,innerWidth*dpr); canvas.height=Math.max(1,innerHeight*dpr);
  const sx=canvas.width/V.w,sy=canvas.height/V.h; scale=Math.min(sx,sy); ox=(canvas.width-V.w*scale)/2; oy=(canvas.height-V.h*scale)/2;
}
addEventListener('resize',resize);resize();
function begin(){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#10291f';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.setTransform(scale,0,0,scale,ox,oy);ctx.clearRect(0,0,V.w,V.h);}
const I={};let ready=0;const keys=Object.keys(A);keys.forEach(k=>{const im=new Image;im.onload=()=>ready++;im.onerror=()=>console.error('asset',A[k]);im.src=A[k];I[k]=im});
function cover(im,x=0,y=0,w=V.w,h=V.h){if(!im?.naturalWidth)return;const s=Math.max(w/im.naturalWidth,h/im.naturalHeight),dw=im.naturalWidth*s,dh=im.naturalHeight*s;ctx.drawImage(im,x+(w-dw)/2,y+(h-dh)/2,dw,dh)}
function contain(im,x,y,w,h){if(!im?.naturalWidth)return;const s=Math.min(w/im.naturalWidth,h/im.naturalHeight),dw=im.naturalWidth*s,dh=im.naturalHeight*s;ctx.drawImage(im,x+(w-dw)/2,y+(h-dh)/2,dw,dh)}
function rr(x,y,w,h,r,fill,stroke,lw=3){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke()}}
function textFit(t,x,y,maxW,maxSize=28,minSize=12,color='#3b2418',weight=700,align='center'){
  let s=maxSize;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle=color;
  while(s>minSize){ctx.font=`${weight} ${s}px Trebuchet MS,Arial`;if(ctx.measureText(t).width<=maxW)break;s--}
  ctx.fillText(t,x,y);return s;
}
function shadow(alpha=.28,blur=18,y=7){ctx.shadowColor=`rgba(0,0,0,${alpha})`;ctx.shadowBlur=blur;ctx.shadowOffsetY=y}

let screen='menu',pressed=false,storyPage=0,paused=false,complete=false,finishHint=0;
const playRect={x:720,y:500,w:420,h:132};
// Centers match the authored blank plaques/circles in chapter_map.png; all labels are fitted to these authored surfaces.
const stages=[
 {x:94,y:270,w:175,h:170,cx:168,cy:331,signX:95,signY:375,signW:150,label:'Orman Yolu',num:'1',open:true},
 {x:372,y:360,w:180,h:175,cx:450,cy:423,signX:378,signY:466,signW:150,label:'Dere Kenarı',num:'2'},
 {x:688,y:275,w:180,h:175,cx:765,cy:338,signX:690,signY:384,signW:150,label:'Tepe Yolu',num:'3'},
 {x:1034,y:260,w:180,h:175,cx:1115,cy:323,signX:1040,signY:370,signW:150,label:'Festival',num:'4'}
];
const nextRect={x:1100,y:590,w:130,h:90};

const WORLD=9200,CONTACT=0,PLAYER_H=126,PLAYER_HW=34,SPRITE_DRAW_H=222,SPRITE_ANCHOR_Y=620/640;
// Calibrated walk-surface row in each source PNG. The physics y is aligned to the visible deck/grass surface, not the image canvas top.
const SURFACE_PX={pBridge:53,pStump:19,pLong:93,pMedium:79,pShort:36};
const platforms=[
 {id:'p0',x:0,w:900,s:610,a:'pLong'},
 {id:'p1',x:1010,w:310,s:560,a:'pBridge'},
 {id:'p2',x:1430,w:270,s:500,a:'pStump'},
 {id:'p3',x:1830,w:430,s:565,a:'pBridge'},
 {id:'p4',x:2380,w:285,s:505,a:'pStump'},
 {id:'p5',x:2780,w:470,s:590,a:'pBridge'},
 {id:'pm',x:3370,w:300,s:500,a:'pBridge',moving:true,base:3370,amp:30,speed:.9,phase:0},
 {id:'p7',x:3780,w:280,s:540,a:'pStump'},
 {id:'p8',x:4210,w:520,s:590,a:'pBridge'},
 {id:'p9',x:4870,w:300,s:500,a:'pBridge'},
 {id:'p10',x:5290,w:300,s:555,a:'pBridge'},
 {id:'p11',x:5700,w:500,s:475,a:'pBridge'},
 {id:'p12',x:6360,w:310,s:555,a:'pStump'},
 {id:'p13',x:6780,w:520,s:590,a:'pBridge'},
 {id:'p14',x:7440,w:300,s:505,a:'pStump'},
 {id:'p15',x:7860,w:520,s:570,a:'pBridge'},
 {id:'p16',x:8510,w:520,s:610,a:'pBridge'}
];
// Jump apex is about 118 px; every blocking obstacle is deliberately below that clearance.
const solidDefs=[
 {id:'crate',x:5925,bottom:475,w:66,a:'hCrate'},
 {id:'stone',x:6475,bottom:555,w:72,a:'hStone'},
 {id:'fence',x:8050,bottom:570,w:74,a:'hFence'}
];
const hazards=[
 {id:'thorn',x:2500,bottom:505,w:82,a:'hThorn',kind:'static'},
 {id:'wheel',x:4480,bottom:590,w:62,a:'hWheel',kind:'patrol',base:4480,amp:85,speed:1.15}
];
// Collectibles force route decisions instead of sitting on a flat line.
const daisies=[
 [600,540],[1155,495],[1560,430],[2020,500],[2495,430],[3000,515],[3495,425],[3925,465],[4380,515],[5005,425],[5785,395],[6530,480]
].map((p,i)=>({x:p[0],y:p[1],got:false,i}));
const checkpoints=[{x:380,y:610},{x:2805,y:590},{x:4235,y:590},{x:6795,y:590},{x:8525,y:610}];
let time=0,camera=0,flowerCount=0,last=performance.now(),inputX=0,jumpQueued=0;
let player={x:380,y:610,vx:0,vy:0,onGround:true,platformId:'p0',dir:1,anim:0,animT:0,jumpT:0,landT:0,coyote:.1,hearts:3,invuln:0,checkpoint:0};

function dynX(p){return p.moving?p.base+Math.sin(time*p.speed+p.phase)*p.amp:p.x}
function platformAtId(id){return platforms.find(p=>p.id===id)}
function imgWH(key,w){const im=I[key];return im?.naturalWidth?{w,h:w*im.naturalHeight/im.naturalWidth}:{w,h:w*.4}}
function platformSurfaceOffset(p){const im=I[p.a];if(!im?.naturalWidth)return 0;return (SURFACE_PX[p.a]||0)*(p.w/im.naturalWidth)}
function drawPlatform(p){const x=dynX(p)-camera;if(x+p.w<-120||x>1400)return;const wh=imgWH(p.a,p.w),topVisual=p.s-platformSurfaceOffset(p);ctx.drawImage(I[p.a],x,topVisual,wh.w,wh.h);if(DEBUG){ctx.strokeStyle='#00e5ff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,p.s);ctx.lineTo(x+p.w,p.s);ctx.stroke();}}
function solidMetrics(s){const wh=imgWH(s.a,s.w);return {x:s.x,y:s.bottom-wh.h,w:s.w,h:wh.h,top:s.bottom-wh.h}}
function drawSolid(s){const m=solidMetrics(s),x=m.x-camera;if(x+m.w<-100||x>1380)return;ctx.drawImage(I[s.a],x,m.y,m.w,m.h);if(DEBUG){ctx.strokeStyle='#ffd500';ctx.strokeRect(x,m.y,m.w,m.h)}}
function hazardMetrics(h){const xx=h.kind==='patrol'?h.base+Math.sin(time*h.speed)*h.amp:h.x;const wh=imgWH(h.a,h.w);return{x:xx,y:h.bottom-wh.h,w:h.w,h:wh.h,bottom:h.bottom}}
function drawHazard(h){const m=hazardMetrics(h),x=m.x-camera;if(x+m.w<-100||x>1380)return;if(h.id==='wheel'){ctx.save();ctx.translate(x+m.w/2,m.y+m.h/2);ctx.rotate(time*2.4);ctx.drawImage(I[h.a],-m.w/2,-m.h/2,m.w,m.h);ctx.restore()}else ctx.drawImage(I[h.a],x,m.y,m.w,m.h);if(DEBUG){ctx.strokeStyle='#ff3355';ctx.strokeRect(x+8,m.y+10,m.w-16,m.h-10)}}

function drawSprite(key,x,footY,dir=1,h=SPRITE_DRAW_H,alpha=1){const im=I[key];if(!im?.naturalWidth)return;const w=h*im.naturalWidth/im.naturalHeight;ctx.save();ctx.globalAlpha=alpha;ctx.shadowColor='rgba(255,236,184,.72)';ctx.shadowBlur=14;const top=footY-h*SPRITE_ANCHOR_Y;if(dir<0){ctx.translate(x,0);ctx.scale(-1,1);ctx.drawImage(im,-w/2,top,w,h)}else ctx.drawImage(im,x-w/2,top,w,h);ctx.restore()}
function playerAnimKey(){
 if(complete)return 'cele'+(player.anim%8);
 if(!player.onGround){const phase=Math.min(7,Math.floor(player.jumpT*10));return 'jump'+phase}
 if(player.landT>0)return 'jump7';
 if(Math.abs(player.vx)>24)return 'run'+(player.anim%8);
 return 'idle'+(player.anim%8);
}

function drawMenu(){
 cover(I.menuBg);
 ctx.save();shadow(.20,18,6);contain(I.logo,355,18,610,205);ctx.restore();
 // Only canonical/reused game characters are shown. No invented menu-only substitutes.
 ctx.save();shadow(.22,14,5);drawSprite('idle0',245,650,1,350);ctx.restore();
 ctx.save();shadow(.18,10,4);contain(I.pitpit,515,397,150,215);contain(I.porsuk,650,430,150,165);contain(I.baykus,805,420,150,170);contain(I.civciv,965,435,130,155);ctx.restore();
 ctx.save();shadow(.28,16,6);contain(pressed?I.playPressed:I.playNormal,playRect.x,playRect.y,playRect.w,playRect.h);ctx.restore();
}
function drawLock(cx,cy){ctx.save();ctx.strokeStyle='#fff7da';ctx.fillStyle='rgba(31,42,36,.82)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(cx,cy-8,18,Math.PI,0);ctx.stroke();rr(cx-24,cy-8,48,39,8,'rgba(31,42,36,.88)','#fff7da',3);ctx.restore()}
function drawMap(){
 cover(I.mapBg);
 // One compact title only; all stage labels fit inside the authored wooden plaques.
 rr(470,18,340,70,28,'rgba(239,196,119,.94)','rgba(92,58,32,.75)',2);textFit('Bölümler',640,53,290,38,24,'#3a2417',800);
 stages.forEach((st,i)=>{
   if(i===0){ctx.save();ctx.strokeStyle='rgba(255,207,61,.95)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(st.cx,st.cy,54+Math.sin(time*3)*3,0,Math.PI*2);ctx.stroke();ctx.restore();}
   else drawLock(st.cx,st.cy);
   textFit(st.num,st.cx,st.cy-2,42,30,20,'#3a2417',800);
   textFit(st.label,st.signX+st.signW/2,st.signY,st.signW-18,17,11,'#3a2417',800);
 });
 rr(24,22,66,66,33,'rgba(62,43,28,.78)','rgba(255,226,155,.9)',3);textFit('‹',57,52,44,54,40,'#fff8e4',800);
}
function drawStory(){cover(I.gameBg);ctx.fillStyle='rgba(17,29,28,.32)';ctx.fillRect(0,0,V.w,V.h);const im=storyPage===0?I.storyGarden:storyPage===1?I.storyTrampled:I.storyHappy;ctx.save();shadow(.4,28,8);contain(im,150,34,980,650);ctx.restore();rr(1120,590,98,78,39,'rgba(242,174,49,.96)','rgba(255,242,193,.95)',3);textFit(storyPage<2?'›':'▶',1169,628,62,42,30,'#3a2417',800);rr(28,28,74,58,29,'rgba(47,38,25,.76)','rgba(255,225,149,.85)',3);textFit('‹',65,56,48,48,34,'#fff',800)}
function drawGameBg(){
 const bgKeys=['bg1','bg2','bg1','bg4'];
 const seg=2200,idx=Math.min(3,Math.floor(camera/seg)),t=Math.min(1,(camera%seg)/(seg*.72));
 cover(I[bgKeys[idx]]);
 if(idx<3&&t>.58){ctx.save();ctx.globalAlpha=(t-.58)/.42;cover(I[bgKeys[idx+1]]);ctx.restore();}
 // soft warm halo only for readability, not a replacement for the painted background.
 const px=player.x-camera;const g=ctx.createRadialGradient(px,515,20,px,515,160);g.addColorStop(0,'rgba(255,238,196,.30)');g.addColorStop(1,'rgba(255,236,194,0)');ctx.fillStyle=g;ctx.fillRect(Math.max(0,px-180),350,360,300);
}
function drawHUD(){
 rr(20,18,170,58,29,'rgba(35,43,36,.72)','rgba(255,230,167,.75)',2);textFit('♥'.repeat(player.hearts),105,47,130,30,22,'#ef4d4d',800);
 rr(1020,18,190,58,29,'rgba(35,43,36,.72)','rgba(255,230,167,.75)',2);contain(I.daisy,1038,26,42,42);textFit(`${flowerCount} / 12`,1144,47,105,25,18,'#fff',800);
 rr(1218,18,52,52,26,'rgba(35,43,36,.72)','rgba(255,230,167,.75)',2);textFit('Ⅱ',1244,44,28,24,18,'#fff',800);
 const alpha='rgba(25,42,37,.52)',edge='rgba(255,255,255,.62)';rr(26,620,78,78,39,alpha,edge,2);textFit('◀',65,658,45,34,24,'#fff',800);rr(118,620,78,78,39,alpha,edge,2);textFit('▶',157,658,45,34,24,'#fff',800);rr(1152,610,88,88,44,alpha,edge,2);textFit('↑',1196,652,50,46,32,'#fff',800)
}
function drawGame(){
 drawGameBg(); platforms.forEach(drawPlatform); solidDefs.forEach(drawSolid); hazards.forEach(drawHazard);
 daisies.forEach(f=>{if(f.got)return;const x=f.x-camera;if(x<-70||x>1350)return;contain(I.daisy,x-28,f.y-58,58,58)});
 const px=player.x-camera;ctx.save();ctx.fillStyle='rgba(29,23,15,.24)';ctx.beginPath();ctx.ellipse(px,player.y+5,31,8,0,0,Math.PI*2);ctx.fill();ctx.restore();
 const blink=player.invuln>0&&Math.floor(player.invuln*12)%2===0?.38:1;drawSprite(playerAnimKey(),px,player.y,player.dir,SPRITE_DRAW_H,blink);
 const pitX=8890-camera;if(pitX>-150&&pitX<1400)contain(I.pitpit,pitX-70,350,170,245);
 drawHUD();
 if(finishHint>0){rr(380,95,520,70,30,'rgba(247,228,179,.95)','rgba(112,72,35,.8)',2);textFit('Pıtpıt: Birkaç papatya daha kaldı!',640,130,450,25,16,'#5b351d',800)}
 if(paused){ctx.fillStyle='rgba(7,18,16,.58)';ctx.fillRect(0,0,1280,720);rr(450,205,380,290,32,'rgba(66,47,31,.93)','rgba(255,224,154,.86)',3);textFit('Duraklatıldı',640,260,310,40,25,'#fff6dc',800);rr(505,318,270,72,33,'rgba(55,156,73,.96)','rgba(210,255,196,.92)',2);textFit('Devam Et',640,354,220,27,18,'#fff',800);textFit('ESC: devam  •  M: ana menü',640,438,300,18,13,'#eadfbf',600)}
 if(complete){ctx.fillStyle='rgba(8,20,18,.52)';ctx.fillRect(0,0,1280,720);rr(220,82,840,556,38,'rgba(246,230,187,.97)','rgba(113,74,37,.86)',3);textFit('Harika!',640,140,480,50,32,'#704016',800);textFit('Tüm papatyaları Pıtpıt’a getirdin.',640,195,650,27,18,'#52331e',700);drawSprite('cele'+(player.anim%8),400,535,1,275);contain(I.pitpit,735,275,215,290);textFit('Pıtpıt artık seninle festivale gelecek!',640,555,650,24,16,'#52331e',700);rr(500,578,280,62,31,'rgba(58,161,74,.97)','rgba(206,255,193,.92)',2);textFit('Bölümlere Dön',640,609,235,23,16,'#fff',800)}
}

function rectsOverlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function bodyRect(x=player.x,y=player.y){return{x:x-PLAYER_HW,y:y-PLAYER_H,w:PLAYER_HW*2,h:PLAYER_H}}
function landingSurfaces(){
 const arr=platforms.map(p=>({id:p.id,x:dynX(p),w:p.w,s:p.s,kind:'platform'}));
 solidDefs.forEach(s=>{const m=solidMetrics(s);arr.push({id:'solid-'+s.id,x:m.x,w:m.w,s:m.top,kind:'solid'})}); return arr;
}
function handleHorizontal(prevX){
 const b=bodyRect();for(const s of solidDefs){const m=solidMetrics(s),r={x:m.x,y:m.y,w:m.w,h:m.h};if(!rectsOverlap(b,r))continue;
   if(player.vx>0&&prevX+PLAYER_HW<=m.x+6){player.x=m.x-PLAYER_HW-1;player.vx=0}
   else if(player.vx<0&&prevX-PLAYER_HW>=m.x+m.w-6){player.x=m.x+m.w+PLAYER_HW+1;player.vx=0}
 }
}
function respawn(hit=false){if(hit){player.hearts--;if(player.hearts<=0)player.hearts=3;}const cp=checkpoints[player.checkpoint];player.x=cp.x;player.y=cp.y;player.vx=0;player.vy=0;player.onGround=false;player.platformId=null;player.invuln=1.15;camera=Math.max(0,player.x-320)}
function checkHazards(){if(player.invuln>0)return;const b=bodyRect();for(const h of hazards){const m=hazardMetrics(h),r={x:m.x+9,y:m.y+10,w:m.w-18,h:m.h-10};if(rectsOverlap(b,r)){respawn(true);return}}}
function update(dt){
 time+=dt;if(finishHint>0)finishHint-=dt;if(screen!=='game'||paused)return;
 if(complete){player.animT+=dt;if(player.animT>.11){player.animT=0;player.anim=(player.anim+1)%8}return}
 if(player.invuln>0)player.invuln-=dt;if(jumpQueued>0)jumpQueued-=dt;player.landT=Math.max(0,player.landT-dt);
 // carry player with moving platform
 if(player.onGround&&player.platformId){const p=platformAtId(player.platformId);if(p?.moving){const old=p.base+Math.sin((time-dt)*p.speed+p.phase)*p.amp,now=dynX(p);player.x+=now-old}}
 const prevX=player.x,prevY=player.y;
 const target=inputX*270;const accel=inputX?15:20;player.vx+=(target-player.vx)*Math.min(1,accel*dt);if(Math.abs(player.vx)<2)player.vx=0;
 player.x+=player.vx*dt;handleHorizontal(prevX);
 player.coyote=player.onGround?.11:Math.max(0,player.coyote-dt);
 if(jumpQueued>0&&player.coyote>0){player.vy=-625;player.onGround=false;player.platformId=null;player.coyote=0;jumpQueued=0;player.jumpT=0}
 if(!player.onGround){player.vy+=1650*dt;player.jumpT+=dt}else player.vy=Math.max(0,player.vy);
 player.y+=player.vy*dt;
 let landed=null;if(player.vy>=0){for(const s of landingSurfaces()){const margin=PLAYER_HW*.55;if(player.x<s.x+margin||player.x>s.x+s.w-margin)continue;if(prevY<=s.s+6&&player.y>=s.s){if(!landed||s.s<landed.s)landed=s}}}
 if(landed){const wasAir=!player.onGround;player.y=landed.s+CONTACT;player.vy=0;player.onGround=true;player.platformId=landed.kind==='platform'?landed.id:null;if(wasAir)player.landT=.09}else{player.onGround=false;player.platformId=null}
 if(player.y>820){respawn(true);return}
 player.x=Math.max(55,Math.min(WORLD-70,player.x));
 checkHazards();
 // checkpoints are one-way progression markers
 checkpoints.forEach((cp,i)=>{if(player.x>cp.x&&i>player.checkpoint)player.checkpoint=i});
 daisies.forEach(f=>{if(!f.got&&Math.abs(player.x-f.x)<52&&Math.abs((player.y-70)-f.y)<80){f.got=true;flowerCount++}});
 if(player.x>8800){if(flowerCount===12){complete=true;player.anim=0;player.animT=0}else{finishHint=1.8;player.x=8760}}
 player.animT+=dt;const fps=!player.onGround?10:11;if(player.animT>1/fps){player.animT=0;player.anim=(player.anim+1)%8}
 camera=Math.max(0,Math.min(WORLD-1280,player.x-340));
}
function resetGame(){player={x:380,y:610,vx:0,vy:0,onGround:true,platformId:'p0',dir:1,anim:0,animT:0,jumpT:0,landT:0,coyote:.1,hearts:3,invuln:0,checkpoint:0};camera=0;flowerCount=0;daisies.forEach(f=>f.got=false);paused=false;complete=false;finishHint=0;inputX=0;jumpQueued=0}
function draw(){begin();if(ready<keys.length){ctx.fillStyle='#17382d';ctx.fillRect(0,0,1280,720);textFit('Çatpat hazırlanıyor…',640,360,520,32,20,'#fff',700);return}if(screen==='menu')drawMenu();else if(screen==='map')drawMap();else if(screen==='story')drawStory();else drawGame()}
function loop(t){const dt=Math.min(.033,(t-last)/1000||.016);last=t;update(dt);draw();requestAnimationFrame(loop)}
function pt(e){const r=canvas.getBoundingClientRect(),dpr=canvas.width/r.width;return{x:((e.clientX-r.left)*dpr-ox)/scale,y:((e.clientY-r.top)*dpr-oy)/scale}}
function inR(p,r){return p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h}
function queueJump(){jumpQueued=.13}
canvas.addEventListener('pointerdown',e=>{const p=pt(e);if(screen==='menu'&&inR(p,playRect)){pressed=true;return}if(screen==='game'){if(p.x<112&&p.y>595){inputX=-1;player.dir=-1}else if(p.x<215&&p.y>595){inputX=1;player.dir=1}else if(p.x>1125&&p.y>585)queueJump();else if(p.x>1200&&p.y<95)paused=!paused;else if(paused&&p.x>500&&p.x<780&&p.y>300&&p.y<405)paused=false;else if(complete&&p.x>490&&p.x<790&&p.y>565){screen='map';complete=false}}});
canvas.addEventListener('pointerup',e=>{const p=pt(e);if(screen==='menu'&&pressed){pressed=false;if(inR(p,playRect))screen='map';return}if(screen==='map'){if(p.x<105&&p.y<105){screen='menu';return}if(inR(p,stages[0])){storyPage=0;screen='story';return}}if(screen==='story'){if(p.x<115&&p.y<105){screen='map';return}if(inR(p,nextRect)){if(storyPage<2)storyPage++;else{resetGame();screen='game'}}}if(screen==='game'&&p.y>590&&p.x<230)inputX=0});
canvas.addEventListener('pointercancel',()=>{pressed=false;inputX=0});
addEventListener('keydown',e=>{if(screen!=='game')return;if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A'){inputX=-1;player.dir=-1}if(e.key==='ArrowRight'||e.key==='d'||e.key==='D'){inputX=1;player.dir=1}if(e.key==='ArrowUp'||e.key==='w'||e.key==='W'||e.key===' '){e.preventDefault();queueJump()}if(e.key==='Escape')paused=!paused;if((e.key==='m'||e.key==='M')&&paused)screen='menu'});
addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight','a','A','d','D'].includes(e.key))inputX=0});
const DEBUG=new URLSearchParams(location.search).has('debug');
window.__CATPAT_TEST__={state:()=>({screen,x:player.x,y:player.y,onGround:player.onGround,platformId:player.platformId,flowers:flowerCount,hearts:player.hearts,camera}),setScreen:s=>screen=s,startGame:()=>{resetGame();screen='game'},teleport:(x,y)=>{player.x=x;player.y=y;player.vx=0;player.vy=0;player.onGround=false;player.platformId=null;camera=Math.max(0,Math.min(WORLD-1280,x-340));},jump:queueJump,left:()=>{inputX=-1;player.dir=-1},right:()=>{inputX=1;player.dir=1},stop:()=>inputX=0};
const q=new URLSearchParams(location.search);if(q.has('screen')){const qs=q.get('screen');if(['menu','map','story','game'].includes(qs)){if(qs==='game')resetGame();screen=qs;}if(q.has('x')&&qs==='game'){player.x=Number(q.get('x'))||380;camera=Math.max(0,Math.min(WORLD-1280,player.x-340));}}
requestAnimationFrame(loop);
