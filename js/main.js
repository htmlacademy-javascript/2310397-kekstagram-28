import {getData} from './api.js';
import {showAlert} from './util.js';
import {renderMiniatures} from './miniature.js';
import './form.js';


getData()
  .then((photos) => {
    renderMiniatures(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
