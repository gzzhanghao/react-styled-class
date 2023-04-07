export function createStyleEl() {
  const style = document.createElement('style');
  document.head.appendChild(style);
  return style;
}

export function randId() {
  return Math.random().toString(36).slice(2);
}
