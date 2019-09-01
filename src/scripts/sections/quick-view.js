/* @jsx h */
import '../../styles/sections/quick-view.scss';
import {h, render} from 'preact';
import {useEffect, useState, useMemo, useRef} from 'preact/hooks';
import {timeline, easing, styler} from 'popmotion';

import {formatMoney} from '@shopify/theme-currency';

import QuantityInput from '../util/QuantityInput';
import Button from '../util/Button';

class Bus {
  listeners = [];
  addEventListener(fn) {
    this.listeners.push(fn);
  }
  removeEventListener(fn) {
    this.listeners = this.listeners.filter((listener) => listener !== fn);
  }
  emit(event) {
    this.listeners.forEach((fn) => fn(event));
  }
}

function QuickViewModal({title, vendor = 'Vendor Name', imageSrc, sku = 'SKU-001', price, description, modalRef}) {

  // TODO: use flexbox to position an actual image, to get the a11y benefits.
  const productImage = <div class="quick-view__img-wrap" style={{backgroundImage: `url(${JSON.stringify(imageSrc)})`}} />;

  return (
    <div class="quick-view" ref={modalRef}>
      {productImage}
      <div class="quick-view__info">
        <div class="quick-view__vendor-name">
          {vendor}
        </div>
        <div class="quick-view__sku">
          {sku}
        </div>
        <h2>{title}</h2>
        <hr/>
        <div class="quick-view__price">{formatMoney(price)}</div>
        <p dangerouslySetInnerHTML={{__html: description}} />
        <hr/>
        <div class="quick-view__actions">
          <QuantityInput class="quick-view__qty" defaultValue={1} />
          <Button class="quick-view__add-to-cart" variant="primary">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

function useStyler() {
  const ref = useRef(null);
  const refStyler = useMemo(() => {
    if (!ref.current) { return null; }
    return styler(ref.current);
  }, [ref.current]);
  return [ref, refStyler];
}

function useListenerConnection(bus, setState) {
  useEffect(() => {
    const listener = (data) => setState(data);
    bus.addEventListener(listener);
    return () => {
      bus.removeEventListener(listener);
    };
  }, [bus]);
}

function animateIn() {
  return timeline([
    {
      track: 'scrim',
      from: {opacity: 0},
      to: {opacity: 1},
      duration: 200,
    },
    '-100',
    {
      track: 'modal',
      from: {opacity: 0, scale: 0.9, y: '3rem'},
      to: {opacity: 1, scale: 1, y: '0rem'},
      duration: 200,
      ease: easing.backOut,
    },
  ]);
}

function animateOut() {
  return timeline([
    {
      track: 'modal',
      to: {opacity: 0, scale: 0.9, y: '3rem'},
      from: {opacity: 1, scale: 1, y: '0rem'},
      duration: 200,
      ease: easing.easeOut,
    },
    '-100',
    {
      track: 'scrim',
      from: {opacity: 1},
      to: {opacity: 0},
      duration: 200,
    },
  ]);
}

function QuickView({dialogIntentBus, defaultIsOpen = false, ...props}) {

  /** Track whether the modal is open (target state). */
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  /**
   * Track whether the modal is visible.
   *
   * This is separate from open state; since the modal animates open/close,
   * it will remain visible for a moment after it is no longer open.
   */
  const [isVisible, setIsVisible] = useState(isOpen);

  // Connect modal visibility to our message bus.
  useListenerConnection(dialogIntentBus, setIsOpen);

  // Grab a reference to the scrim element so we can properly animate it.
  const [scrimRef, scrimStyler] = useStyler();
  const [modalRef, modalStyler] = useStyler();

  // This section is kind of a mess 😬
  // Connect the animations to their respective stylers.
  useEffect(() => {
    if (!scrimStyler) { return; }
    let action;
    const listener = {
      update(value) {
        scrimStyler.set(value.scrim);
        modalStyler.set(value.modal);
      },
    };
    if (isOpen) {
      setIsVisible(true);
      action = animateIn();
    } else {
      action = animateOut();
      listener.complete = () => setIsVisible(false);
    }
    action.start(listener);
  }, [isOpen, scrimStyler, modalStyler]);

  const wrapperStyle = isVisible ? undefined : {display: 'none'};

  return (<div class="quick-view__wrapper" style={wrapperStyle}>
    <div class="quick-view__scrim" ref={scrimRef} onClick={() => setIsOpen(false)} />
    <QuickViewModal modalRef={modalRef} {...props} />
  </div>);
}

/**
 * Initialize a `QuickView` modal.
 *
 * `baseElement` is deprecated -- this project has a 1-week development schedule though,
 * so I think I can live with that tech debt. 😁
 */
export default function quickView(baseElement, opts) {
  const dialogIntentBus = new Bus();
  const container = document.createElement('div');

  // Preload the image for instant availability when the modal opens.
  (new window.Image()).src = opts.imageSrc;

  render(<QuickView dialogIntentBus={dialogIntentBus} {...opts} />, container);
  document.body.appendChild(container);

  return {
    open() {
      dialogIntentBus.emit(true);
    },
  };
}

export function quickViewAll(featuredCollectionSectionElement) {
  [...featuredCollectionSectionElement.querySelectorAll('[data-element="carousel__item"]')]
    .forEach((carouselItem) => {
      const data = JSON.parse(carouselItem.querySelector('template').innerHTML);
      const view = quickView(null, {
        title: data.title,
        price: data.price,
        priceMin: data.price_min,
        priceMax: data.price_max,
        description: data.description,
        imageSrc: data.images[0],
        id: data.id,
      });
      carouselItem.querySelector('.featured-collection__quick-view').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        view.open();
      });
    });
}
