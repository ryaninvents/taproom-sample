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

