/* Catpat2 v0.7 production patch layer over the exact v0.6 baseline.
 * Keep changes here small and auditable while canonical binary assets are promoted.
 * Story fallback and book-external menu cast cleanup now live in app.js itself.
 */

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
// Remove it from the working mandatory route until landscape-mobile QA and replacement
// hazard art pass. The source asset itself remains part of baseline recovery evidence.
const legacyThornIndex=hazards.findIndex(h=>h.id==='thorn');
if(legacyThornIndex>=0) hazards.splice(legacyThornIndex,1);

window.__CATPAT_V07_PATCH__={
  baseline:'Catpat2 v0.6',
  routeXOverrides:{...routeXOverrides},
  legacyThornRemovedFromMandatoryRoute:legacyThornIndex>=0,
  baseRuntimeBookCastCleanup:true,
  baseRuntimeStoryFallbackFixed:true
};
