const eventQueue = [];
window.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < eventQueue.length; i++) {
    eventQueue[i]();
  }
});

export default function ready(fn) {
  let parent = document.currentScript;
  if (parent) { parent = parent.parentNode; }
  function updatedCallback() {
    return fn(parent);
  }
  eventQueue.push(updatedCallback);
}
