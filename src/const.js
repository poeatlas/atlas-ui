import atlas from './resources/atlas.json';

export const ATLAS_WIDTH = 2048;
export const ATLAS_HEIGHT = 1152;
export const MAP_MULTIPLIER = (ATLAS_WIDTH / 2) / atlas[atlas.length - 1].x;
export const MAP_OFFSET = 20/2;