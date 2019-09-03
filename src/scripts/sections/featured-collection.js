import {quickViewAll} from './quick-view';

import '../../styles/sections/featured-collection.scss';

function featuredCollection(baseElement) {
  quickViewAll(baseElement);
}

[...document.querySelectorAll('[data-section-type="featured-collection"]')]
  .forEach((el) => featuredCollection(el));
