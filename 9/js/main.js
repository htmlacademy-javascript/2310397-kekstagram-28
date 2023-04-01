import {getPhoto} from './data.js';
import {renderMiniatures} from './miniature.js';
import './form.js';

const photos = Array.from({length: 25}, getPhoto);

renderMiniatures(photos);
