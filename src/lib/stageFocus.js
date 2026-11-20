/**
 * Shared channel between the DOM and the 3D stage.
 *
 * The "Meet StarX" stage tour writes here while you scroll through it:
 *   weight — 0 = normal orbiting camera, 1 = camera fully on the tour
 *   pos    — which instrument the camera is on (0..count-1, fractional while moving)
 * StageUniverse reads it every frame and eases toward it.
 */
export const stageFocus = { weight: 0, pos: 0 };

/** Instrument order on the tour (matches the shot list in StageUniverse). */
export const TOUR_ORDER = ['pad', 'drums', 'keys', 'lead', 'bass', 'micL', 'micR'];
