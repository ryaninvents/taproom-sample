import {quickViewAll} from './quick-view';

import '../../styles/sections/featured-collection.scss';

function centerScrollCarousel(carousel) {
  // HACK: When you apply an `element.scrollLeft` value to a scroll-snap element,
  // the browser will "round" that value to the nearest page.
  carousel.scrollLeft = carousel.scrollLeft;
}

function featuredCollection(baseElement) {
  const carousel = baseElement.querySelector('[data-element="carousel"]');
  quickViewAll(baseElement);
  centerScrollCarousel(carousel);
  window.addEventListener('resize', () => {
    centerScrollCarousel(carousel);
  });
}

[...document.querySelectorAll('[data-section-type="featured-collection"]')]
  .forEach((el) => featuredCollection(el));
