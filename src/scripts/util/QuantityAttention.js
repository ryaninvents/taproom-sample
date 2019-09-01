/* @jsx h */
import {h} from 'preact';

export default function QuantityAttention({quantity, ...props}) {
  return (
    <span {...props}>
      {quantity ? `(${quantity} in cart)` : null}
    </span>
  );
}
