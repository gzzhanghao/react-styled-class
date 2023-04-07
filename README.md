# react-styled-class

Just **INLINE** styles.

```jsx
import { useStyled } from 'react-styled-class'

export const StyledButton = ({ primary }) => {
  const styled = useStyled()
  return (
    <button
      className={styled(`
        color: gray;
        &:hover {
          color: orange;
        }
      `)}
    >
      Button
    </button>
  )
}
```

Or you can use style objects.

```js
styled({
  color: 'gray'
})
```

Equivalent to:

```js
styled(`
  color: gray;
`)
```

## WHY

I'm tired of naming CSS classes (and creating [styled components](https://github.com/styled-components/styled-components) :D).
