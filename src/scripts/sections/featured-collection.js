import {spring, styler, listen, pointer, value} from 'popmotion';

import '../../styles/sections/featured-collection.scss';

function featuredCollection(baseElement) {
  const carousel = baseElement.querySelector('[data-element="carousel"]');
  const carouselStyler = styler(carousel);
  const carouselPosition = value({x: 0}, carouselStyler.set);

  listen(baseElement, 'mousedown touchstart')
    .start((event) => {
      event.preventDefault();
      event.stopPropagation();
      pointer(carouselPosition.get())
        .pipe(({x}) => ({x}))
        .start(carouselPosition);
    });
  listen(document, 'mouseup touchend')
    .start(() => {
      spring({
        from: carouselPosition.get(),
        velocity: carouselPosition.getVelocity(),
        to: {x: 0},
        stiffness: 200,
        damping: 200,
      }).start(carouselPosition);
    });

  return () => {};
}

[...document.querySelectorAll('[data-section-type="featured-collection"]')]
  .forEach((el) => featuredCollection(el));
