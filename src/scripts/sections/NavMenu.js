/* @jsx h */
import {h} from 'preact';
import '../../styles/sections/NavMenu.scss';

export function NavColumn({title, children, class: className = '', ...props}) {
  return (
    <div class={`NavMenu__column ${className}`} {...props}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default function NavMenu() {
  return (
    <div class="NavMenu">
      TODO
    </div>
  );
}
