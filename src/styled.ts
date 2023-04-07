import { useEffect, useId, useLayoutEffect, useRef } from 'react';

import { useStyledContext } from './context';
import { UserStyle } from './generate';

export function useStyled() {
  const componentId = useId();
  const ctx = useStyledContext();

  const newClassNames = new Set<string>();
  const activeClassNames = useRef(newClassNames);

  useLayoutEffect(() => {
    for (const className of Array.from(activeClassNames.current)) {
      if (!newClassNames.has(className)) {
        ctx.unbindClass(componentId, className);
      }
    }
    ctx.flushStyles();
    activeClassNames.current = newClassNames;
  });

  useEffect(
    () => () => {
      ctx.unbindComponent(componentId);
      activeClassNames.current = new Set();
    },
    [ctx, componentId],
  );

  return (...styles: UserStyle[]) =>
    styles
      .map((style) => {
        const className = ctx.bindStyle(componentId, style);
        newClassNames.add(className);
        return className;
      })
      .join(' ');
}
