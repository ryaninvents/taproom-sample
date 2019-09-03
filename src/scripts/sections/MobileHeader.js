/* @jsx h */
import {h} from 'preact';
import {useEffect} from 'preact/hooks';

import '../../styles/sections/header.scss';

function MobileHeaderLink({link, ...props}) {
  return (
    <li class="mobile-header__nav-item" {...props}>
      <a class="mobile-header__nav-link" href={link.url}>
        {link.title}
      </a>
    </li>
  );
}

function MobileFooter() {
  return (
    <div class="mobile-footer">
      <span>Contact | Login</span>
    </div>
  );
}

function RightMobileActions({onCloseMenu}) {
  return (
    <div className="header__right-actions">
      <button className="header__action-button d-md-none" onClick={onCloseMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" viewBox="0 2 20 20" style={{transform: 'translateY(-2px)'}}><path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z"/></svg>
      </button>
    </div>
  );
}

export default function MobileHeader({logoImage, isVisible = true, onCloseMenu, links = window.MAIN_LINK_LIST}) {
  const bannerLogo = (
    <a href="/" class="header__brand-logo">
      <img src={logoImage} alt="Trifecta Atelier" />
    </a>
  );

  useEffect(() => {
    if (!isVisible) { return null; }
    document.body.classList.add('mobile-menu-visible');
    return () => {
      document.body.classList.remove('mobile-menu-visible');
    };
  }, [isVisible]);

  if (!isVisible) { return null; }

  return (
    <div class="mobile-menu">
      <header role="banner" class="header__banner header__banner--fixed">
        {bannerLogo}
        <nav role="navigation" class="header__nav header__nav--banner">
          <ul>
            {links.map((link) => (
              <MobileHeaderLink key={link.url} link={link} />
            ))}
          </ul>
        </nav>
        <RightMobileActions onCloseMenu={onCloseMenu} />
      </header>
      <div class="test">
        <h2>Hello world</h2>
      </div>
      <MobileFooter />
    </div>
  );
}
