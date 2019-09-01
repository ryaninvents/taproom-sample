// I know the dev challenge said I should be "keeping libraries to a minimum",
// but I *love* Popmotion. To me, it's like properly seasoning your pasta water...
// gives the final product that extra zing and dimension. It's my one vice.
import {spring, styler, listen, pointer, value} from 'popmotion';

import {formatMoney as money} from '@shopify/theme-currency';
import {quickViewAll} from './quick-view';

import h from '../util/createElement';

import '../../styles/sections/featured-collection.scss';

/** Maximum distance you can slide the carousel before it changes pages. */
const MAX_DISPLACEMENT = 100;

function fromMoney(amount) {
  return `from ${money(amount)}`;
}

/** Transform function to fade out the carousel when the page is about to turn. */
function displacementStyles({x}) {
  const result = {x};
  if (Math.abs(x) > MAX_DISPLACEMENT) {
    result.x = MAX_DISPLACEMENT * Math.sign(x);
  }
  result.opacity = Math.min(1, 2 - Math.abs(1.75 * result.x / MAX_DISPLACEMENT));
  return result;
}

// eslint-disable-next-line no-unused-vars
function previewCard(product) {
  // Function which renders a non-sale price (taking into account variable prices)
  const regularPrice = () => (
    product.price_varies
    ? fromMoney(product.price)
    : money(product.price)
  );
  // Function which renders a sale price (taking into account variable prices)
  const salePrice = () => (
    product.price_varies
      // TODO: properly display "on sale from" prices
      ? fromMoney(product.price)
      : h.span({},
          h.span({class: 'featured-collection__featured-price'}, money(product.price)),
          h.span({class: 'featured-collection__strike-price'}, money(product.compare_at_price)))
  );

  return h.a({class: 'featured-collection__item'},
    product.featured_image
      ? h.div({class: 'featured-collection__image'},
        h('img', {
          src: product.featured_image,
        }))
      : null,
    h('p', {}, product.title,
      product.compare_at_price > product.price ? h.span({class: 'featured-collection__sale-badge'}, 'SALE') : null,
      h.span({class: 'featured-collection__price'},
        product.compare_at_price > product.price
          ? regularPrice()
          : salePrice())));
}

function featuredCollection(baseElement) {
  const carousel = baseElement.querySelector('[data-element="carousel"]');
  const carouselStyler = styler(carousel);
  const carouselPosition = value({x: 0}, carouselStyler.set);

  let activePointer = null;
  let pageDelta = 0;

  quickViewAll(baseElement);

  const reportPosition = (position) => {
    let newPageDelta = pageDelta;
    if (Math.abs(position.x) > MAX_DISPLACEMENT) {
      newPageDelta = Math.sign(position.x);
    } else {
      newPageDelta = 0;
    }
    if (pageDelta !== newPageDelta) {
      pageDelta = newPageDelta;
      // TODO: update product cards to match new page
    }
    return position;
  };

  // On mousedown or touchstart within the base element...
  listen(carousel, 'mousedown touchstart')
    .start((event) => {
      event.preventDefault();
      event.stopPropagation();
      // ...start dragging the carousel using pointer position.
      activePointer = pointer(carouselPosition.get())
        .pipe(reportPosition)
        .pipe(displacementStyles)
        .start(carouselPosition);
    });

  // On mouseup or touchend anywhere in the document...
  listen(document, 'mouseup touchend')
    .start(() => {
      if (activePointer) {
        activePointer.stop();
        activePointer = null;
      }
      // ... release the carousel and let it snap to its
      // resting position.
      spring({
        from: carouselPosition.get(),
        velocity: carouselPosition.getVelocity(),
        to: {x: 0},
        stiffness: 200,
        damping: 200,
      })
        .pipe(reportPosition)
        .pipe(displacementStyles)
        .start(carouselPosition);
    });

  function preventDefaultIfActive(event) {
    // Skip this logic if the user wanted to click into a link.
    // We detect this by making an assumption: if the carousel
    // has shifted by less than 5px, this was a click event and
    // not a pan event.
    if (Math.abs(carouselPosition.get().x) < 5) { return; }

    // Prevent the event from completing if we get here.
    // Otherwise, the mouseup or touchend event will be
    // interpreted as a click, and the user will find
    // themselves unexpectedly on the product page.
    event.preventDefault();
    event.stopPropagation();
  }

  // Add the event handler to the carousel in capture phase, so that we get a
  // chance to interrupt before the click is registered on an `<a href>` element.
  carousel.addEventListener('click', preventDefaultIfActive, {capture: true});

  return () => {};
}

[...document.querySelectorAll('[data-section-type="featured-collection"]')]
  .forEach((el) => featuredCollection(el));
