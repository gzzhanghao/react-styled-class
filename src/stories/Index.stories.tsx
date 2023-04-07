import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';

import { useStyled } from '../styled';

const StyledComponent: FC<{ style: any }> = ({ style }) => {
  const styled = useStyled();
  return <pre className={styled('font-size: 16px', style)}>Hello</pre>;
};

const meta: Meta<typeof StyledComponent> = {
  title: 'useStyled',
  component: StyledComponent,
};

export default meta;

export const BasicUsage: StoryObj<typeof StyledComponent> = {
  args: {
    style: {
      color: 'gray',
    },
  },
};

export const WithPseudo: StoryObj<typeof StyledComponent> = {
  args: {
    style: {
      color: 'gray',
      '&:hover': {
        color: 'orange',
      },
      '&::after': {
        content: '", pseudo!"',
      },
    },
  },
};

export const CSSString: StoryObj<typeof StyledComponent> = {
  args: {
    style: `
      color: gray;
      &:hover {
        color: orange;
      }
      &::after {
        content: ", pseudo!";
      }
    `,
  },
};
