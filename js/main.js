import {getPhoto} from './data.js';
import {renderMiniatures} from './miniature.js';
// import {renderBigPicture} from './big-picture-rendering.js';

const photos = Array.from({length: 25}, getPhoto);

renderMiniatures(photos);

// renderBigPicture(photos);
