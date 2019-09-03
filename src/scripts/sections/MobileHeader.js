/* @jsx h */
import {h, Fragment} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import CloseIcon from '../icons/Close';
import FaveIcon from '../icons/Fave';
import SearchIcon from '../icons/Search';
import CartIcon from '../icons/Cart';

import '../../styles/sections/header.scss';

const DEMO_OVERRIDE_LABELS = [
  null,
  'Label',
  'Subcategory Name',
];

const negate = (value) => !value;

function MobileHeaderLink({link, depth = 0, ...props}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li class={`mobile-header__nav-item mobile-header__nav-item--depth-${depth}`} {...props}>
      <a class="mobile-header__nav-link" href={link.url}>
        {DEMO_OVERRIDE_LABELS[depth] || link.title}
      </a>
      {link.children && link.children.length
        ? (
          <Fragment>
            {isOpen ? <ul>
              {link.children.map((childLink) => (
                <MobileHeaderLink key={childLink.url} link={childLink} depth={depth + 1} />
              ))}
            </ul> : null}
            <span
              class={`mobile-expand mobile-expand--${isOpen ? 'open' : 'closed'}`}
              onClick={() => setIsOpen(negate)}
            />
          </Fragment>
          )
        : null
      }
    </li>
  );
}

function MobileFooter() {
  return (
    <div class="mobile-footer">
      <div class="mobile-footer-icons">
        <SearchIcon />
        <FaveIcon />
        <CartIcon />
      </div>
      <div class="mobile-footer-links">
        <a>Contact</a>
        <a>Login</a>
      </div>
    </div>
  );
}

function RightMobileActions({onCloseMenu}) {
  return (
    <div className="header__right-actions">
      <button className="header__action-button d-md-none" onClick={onCloseMenu}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default function MobileHeader({
  logoImage,
  links = window.MAIN_LINK_LIST,
  toggleEl,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerLogo = (
    <a href="/" class="header__brand-logo">
      <img src={logoImage} alt="Trifecta Atelier" />
    </a>
  );

  useEffect(() => {
    const callback = () => {
      setIsVisible(true);
    };
    toggleEl.addEventListener('click', callback);
    return () => {
      toggleEl.removeEventListener('click', callback);
    };
  }, [toggleEl]);

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
        </nav>
        <RightMobileActions onCloseMenu={() => setIsVisible(false)} />
      </header>
      <div class="mobile-link-area">
          <ul>
            {links.map((link) => (
              <MobileHeaderLink key={link.url} link={link} />
            ))}
          </ul>
      </div>
      <MobileFooter />
    </div>
  );
}
