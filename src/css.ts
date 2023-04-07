export function css(strings: TemplateStringsArray, ...exprs: any[]) {
  let result = strings[0];
  for (let i = 1, ii = strings.length; i < ii; i++) {
    if (exprs[i] != null && exprs[i] !== false) {
      result += exprs[i];
    }
    result += strings[i];
  }
  return result;
}
