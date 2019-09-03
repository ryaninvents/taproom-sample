import {h, render} from 'preact';
import MobileHeader from './MobileHeader';

let activeMenu = null;
let activeListener = null;

const header = document.querySelector('section.header');

function closeActiveHeader() {
  if (activeListener) {
    document.body.removeEventListener('mouseover', activeListener);
    activeListener = null;
  }
  if (!activeMenu) {
    return;
  }
  activeMenu.style.display = 'none';
  activeMenu = null;
}

function openActiveHeader() {
  if (!activeMenu) {
    return;
  }
  activeMenu.style.display = 'grid';
  activeListener = (event) => {
    if (header.contains(event.target)) { return; }
    closeActiveHeader();
  };
  document.body.addEventListener('mouseover', activeListener);
}

[...document.querySelectorAll('.header__nav-menu-link')].forEach((navMenuLink) => {
  navMenuLink.addEventListener('mouseover', () => {
    closeActiveHeader();
    activeMenu = navMenuLink.parentNode.querySelector('.slider-menu');
    openActiveHeader();
  });
});

const mobileMenuContainer = document.createElement('div');
document.body.appendChild(mobileMenuContainer);

function hideMenu() {
  render(h(MobileHeader, {logoImage: window.BRAND_ICON, isVisible: false}), mobileMenuContainer);
}

function showMenu() {
  render(h(MobileHeader, {logoImage: window.BRAND_ICON, onCloseMenu: hideMenu}), mobileMenuContainer);
}

document.querySelector('[data-element="mobile-menu-open"]').addEventListener('click', () => {
  showMenu();
});
