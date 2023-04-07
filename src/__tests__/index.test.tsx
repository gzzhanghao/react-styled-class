import { render } from '@testing-library/react';

import { useStyled } from '../styled';

describe('styled class', () => {
  function Component() {
    const styled = useStyled();
    return <div className={styled('color: red')}>Hello</div>;
  }

  it('should render', () => {
    expect(render(<Component />)).toBeTruthy();
  });
});
