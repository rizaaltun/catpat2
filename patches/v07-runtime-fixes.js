/* Catpat2 v0.7 production patch layer over the exact v0.6 baseline.
 * Keep changes here small and auditable while the full runtime is migrated.
 * Final UI/art replacements still require canonical image assets + QA.
 */

// v0.6 drawStory referenced I.gameBg although the baseline asset map has no gameBg key.
// Use an existing authored background until the final comic scene package replaces this screen.
drawStory = function drawStoryV07() {
  cover(I.bg1);
  ctx.fillStyle='rgba(17,29,28,.32)';
  ctx.fillRect(0,0,V.w,V.h);
  const im=storyPage===0?I.storyGarden:storyPage===1?I.storyTrampled:I.storyHappy;
  ctx.save();
  shadow(.4,28,8);
  contain(im,150,34,980,650);
  ctx.restore();
  rr(1120,590,98,78,39,'rgba(242,174,49,.96)','rgba(255,242,193,.95)',3);
  textFit(storyPage<2?'›':'▶',1169,628,62,42,30,'#3a2417',800);
  rr(28,28,74,58,29,'rgba(47,38,25,.76)','rgba(255,225,149,.85)',3);
  textFit('‹',65,56,48,48,34,'#fff',800);
};

// The exact v0.6 route contains four transitions below the 15% horizontal
// mobile-safety reserve target. Move existing platforms; never stretch their art.
// Checkpoints, daisies, solids and the festival endpoint remain on valid surfaces.
const routeXOverrides=Object.freeze({
  p8:4180,
  p9:4820,
  p10:5240,
  p11:5650,
  p12:6270,
  p13:6700,
  p14:7340,
  p15:7760,
  p16:8410
});
for(const platform of platforms){
  if(Object.prototype.hasOwnProperty.call(routeXOverrides,platform.id)){
    platform.x=routeXOverrides[platform.id];
    if(platform.moving) platform.base=routeXOverrides[platform.id];
  }
}

// The exact v0.6 thorn at x=2500 was reported as practically impassable by the user.
// The theoretical jump envelope is not enough evidence to keep a mandatory hazard.
// Remove it from the working mandatory route until measured landscape-mobile QA and
// replacement hazard art pass. The source asset is not deleted; final hazard work stays open.
const legacyThornIndex=hazards.findIndex(h=>h.id==='thorn');
if(legacyThornIndex>=0) hazards.splice(legacyThornIndex,1);

// Do not display book-unverified Baykuş/Civciv as temporary-final menu characters.
// Maymun and other verified cast members will be added only with their canonical art.
drawMenu = function drawMenuV07() {
  cover(I.menuBg);
  ctx.save();shadow(.20,18,6);contain(I.logo,355,18,610,205);ctx.restore();
  ctx.save();shadow(.22,14,5);drawSprite('idle0',285,650,1,350);ctx.restore();
  ctx.save();shadow(.18,10,4);
  contain(I.pitpit,575,397,165,215);
  contain(I.porsuk,760,430,165,165);
  ctx.restore();
  ctx.save();shadow(.28,16,6);contain(pressed?I.playPressed:I.playNormal,playRect.x,playRect.y,playRect.w,playRect.h);ctx.restore();
};

window.__CATPAT_V07_PATCH__={
  baseline:'Catpat2 v0.6',
  storyBackgroundFallback:'bg1',
  routeXOverrides:{...routeXOverrides},
  legacyThornRemovedFromMandatoryRoute:legacyThornIndex>=0,
  unverifiedMenuCharactersHidden:['baykus','civciv']
};
