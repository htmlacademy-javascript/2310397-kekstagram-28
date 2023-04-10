import {getData} from './api.js';
import {showAlert} from './util.js';
import {renderMiniatures} from './miniature.js';
import {debounce} from './util.js';
import { initialGalary, getFilteredPhotos } from './filter.js';
import './form.js';


getData()
  .then((photos) => {
    const debounceRenderMiniatures = debounce(renderMiniatures, 500);
    initialGalary(photos, debounceRenderMiniatures);
    renderMiniatures(getFilteredPhotos());
  })
  .catch((err) => {
    showAlert(err.message);
  });
