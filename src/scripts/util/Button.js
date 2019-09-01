/* @jsx h */
import {h} from 'preact';
import './Button.scss';

export default function Button({variant, class: className = '', ...props}) {
  return (
    <button class={`${className} btn ${variant ? `btn--${variant}` : ''}`} {...props} />
  );
}
