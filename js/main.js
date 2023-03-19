import {getPhoto} from './data.js';
import {renderMiniatures} from './miniature.js';

const photos = Array.from({length: 25}, getPhoto);

renderMiniatures(photos);
