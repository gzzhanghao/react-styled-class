import { createContext, useContext } from 'react';

import { genCSS, UserStyle } from './generate';
import { createStyleEl, randId } from './util';

const Context = createContext(createStyledContext());

export function useStyledContext() {
  return useContext(Context);
}

interface StyleItem {
  element?: HTMLStyleElement;
  className: string;
  key: string;
  css: string;
  usingComponents: Set<string>;
}

function createStyledContext() {
  const contextId = randId();
  let styleIndex = 0;

  const pendingElements: HTMLStyleElement[] = [];
  const styles: StyleItem[] = [];

  function unbindComponentId(item: StyleItem, componentId: string) {
    item.usingComponents.delete(componentId);
    if (!item.element || item.usingComponents.size) {
      return;
    }
    pendingElements.push(item.element);
    const index = styles.indexOf(item);
    if (index >= 0) {
      styles.splice(index, 1);
    }
  }

  return {
    bindStyle(componentId: string, style: UserStyle) {
      const key = typeof style === 'string' ? style : JSON.stringify(style);

      const item = styles.find((item) => item.key === key);
      if (item) {
        item.usingComponents.add(componentId);
        return item.className;
      }

      const className = `u-${contextId}-${styleIndex++}`;
      styles.push({
        className,
        css: genCSS(`.${className}`, style),
        key,
        usingComponents: new Set([componentId]),
      });
      return className;
    },

    unbindClass(componentId: string, className: string) {
      const item = styles.find((item) => item.className === className);
      if (item) {
        unbindComponentId(item, componentId);
      }
    },

    unbindComponent(componentId: string) {
      for (const item of styles.slice()) {
        unbindComponentId(item, componentId);
      }
    },

    flushStyles() {
      for (const item of styles) {
        if (item.element) {
          continue;
        }
        item.element = pendingElements.pop() || createStyleEl();
        item.element.innerHTML = item.css;
      }
    },
  };
}
