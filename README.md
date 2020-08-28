# MERN App - MyPlace Run3

Frontend application built with TypeScript

## New in this run

- New Facebook-themed UI
- Tooltip for input error message (`tippyjs-react`)
- Skeleton screen for loading data (`react-loading-skeleton`)

## TODOS

- ~~Migrate to [react-spring](https://www.react-spring.io/) from react-transition-group~~

## Debugging Notes

### Fetch calls return 304 & .env variables return undefined

- You need to restart the development server after changing .env file.

### Get request to the right server address fails with no response

- Is `Access-Control-Allow-Origin` header is set on the server?

```bash
Access to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the requests mode to 'no-cors' to fetch the resource with CORS disabled.
```

### Extending style with styled() does not work

- Make sure the original component is passing down the `className` prop

```tsx
type ModalProps = {
  show: boolean;
  className?: string;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

const Modal = (props: ModalProps) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <StyledModal className={props.className}>
        <header>
          <h2>{props.header}</h2>
        </header>
        <form className="modal__content">{props.children}</form>
        <footer>{props.footer}</footer>
      </StyledModal>
    </CSSTransition>

     return createPortal(content, document.getElementById('modal-hook')!);
};
  );

// Extend Modal's style
const MapModal = styled(Modal)`
  .map-container {
    width: 100%;
    height: 16rem;
    background: pink;
  }
`;
```

### Fetch with FormData returns CORS error

- When you pass FormData to the `body` field of the fetch option, you MUST pass an empty object to the header field. If you assign non-empty object to the header field, it will override the auto-generated headers and will cause CORS error.

```js
const response = await fetch(url, {
  method,
  signal: abortController.signal,
  body:
    body instanceof FormData
      ? body
      : typeof body === 'object'
      ? JSON.stringify(body)
      : undefined,
  // You MUST leave the headers empty when using FormData in fetch!!!
  headers:
    body instanceof FormData
      ? {}
      : {
          // body-parser on backend needs this header to identify JSON body
          'Content-Type': 'application/json',
          ...headers,
        },
})
```

## Things To Remember

### Only give the core styles to the UI component for reusability.

- To make UI component more re-usable, it should only have styles that is NOT going to change across different use cases.
- For example, If you give default padding to the Card component, you might have to remove that padding with negative margin with calc-ed value when you want to have a image header with no padding, which is a little bit hacky and you have to hard-code the padding width from the Card component.
