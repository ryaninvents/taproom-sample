/**
 * Create an element using Hyperscript-style syntax.
 *
 * Shopify's ESLint dislikes the short identifier, but it's
 * how Hyperscript is meant to be used (similar to jQuery and `$`).
 *
 * I think I'd like to use JSX or `htm` for convenience, but the
 * spirit of the dev challenge seemed to be to use fewer libraries.
 *
 * Accepts a `ref` prop, which is a function that transforms your element.
 *
 * @example
 *   h('ul', {},
 *     h('li', {}, 'First item'),
 *     h('li', {}, 'Second item'),
 *     h('li', {
 *         ref(el) { el.addEventListener('click', () => alert('Number three!')); },
 *       }, 'Third item')
 *   )
 *   // > renders list with two items, plus a third which shows an alert when clicked
 */
export default function h(type, {ref, ...props} = {}, ...children) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.filter(Boolean).forEach((child) => element.appendChild(child));
  if (typeof ref === 'function') { ref(element); }
  return element;
}

// Convenience functions
h.a = h.bind(null, 'a');
h.div = h.bind(null, 'div');
h.span = h.bind(null, 'span');
