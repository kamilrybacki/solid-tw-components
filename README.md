# Solid Tailwind Components

This **miniscule** library lets You use `styled-components` syntax,
when creating new SolidJS components using TaliwindCSS utility classes e.g.:

```javascript
import stw from 'solid-tailwind-components';

const NewComponent = stw('div')`
    relative
    w-screen
    h-screen
    ... and other Tailwind magic
`

render(() => {
  return (
    <NewComponent>
        ... Your cool (and styled) content!
    </NewComponent>
  );
},
  document.getElementById('root') as HTMLElement,
);

```

And that's really it - the lib consists of one `index.ts` file and Jest tests.

## Contact

For contact outside GitHub, checkout my [personal webpage](html://kamilrybacki.github.io).
