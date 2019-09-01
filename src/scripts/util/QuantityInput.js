/* @jsx h */
import {h} from 'preact';
import {useRef} from 'preact/hooks';
import './QuantityInput.scss';

function QtyButton({class: className = '', ...props}) {
  return (
    <button class={`qty-input__button ${className}`} {...props} />
  );
}

// be the change you want to see in the world
function createChange(element) {
  const event = new window.Event('change');
  element.dispatchEvent(event);
}

export default function QuantityInput({class: className = '', ...props}) {
  const inputRef = useRef(null);
  const increment = () => {
    let newValue = Number(inputRef.current.value) + 1;
    if (isNaN(newValue)) {
      newValue = 1;
    }
    inputRef.current.value = newValue;
    createChange(inputRef.current);
  };
  const decrement = () => {
    let newValue = Number(inputRef.current.value) - 1;
    if (isNaN(newValue) || newValue <= 0) {
      newValue = 1;
    }
    inputRef.current.value = newValue;
    createChange(inputRef.current);
  };

  return (
    <div class={`qty-input ${className}`}>
      <QtyButton onClick={decrement}>-</QtyButton>
      <input class="qty-input__input" ref={inputRef} {...props}/>
      <QtyButton onClick={increment}>+</QtyButton>
    </div>
  );
}
