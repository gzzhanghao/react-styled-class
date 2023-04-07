import postcss from 'postcss';
import postcssNested from 'postcss-nested';

export type UserStyle = string | Record<string, any>;

export function genCSS(selector: string, style: UserStyle) {
  if (typeof style !== 'string') {
    return genCSSFromObject(selector, style);
  }
  const css = `${selector} {${style}}`;
  if (!style.includes('{')) {
    return css;
  }
  try {
    return postcss([postcssNested]).process(css).css;
  } catch (error) {
    return css;
  }
}

function genCSSFromObject(selector: string, object: Record<string, any>) {
  const rules: string[] = [];
  const decls = Object.entries(object)
    .map(([key, value]) => {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'object') {
        return `${key}: ${value};`;
      }
      let childSelector: string;
      if (key.includes('&')) {
        childSelector = key.replace(/&/g, selector);
      } else {
        childSelector = `${selector} ${key}`;
      }
      rules.push(genCSSFromObject(childSelector, value));
      return null;
    })
    .filter(Boolean);
  if (decls.length) {
    rules.unshift(`${selector} {\n${decls.join('\n')}\n}`);
  }
  return rules.join('\n');
}
