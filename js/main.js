import {getData} from './api.js';
import {showAlert} from './util.js';
import {renderMiniatures} from './miniature.js';
import './form.js';


getData()
  .catch((err) => {
    showAlert(err.message);
  })
  .then((photos) => {
    renderMiniatures(photos);
  });
