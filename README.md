# MERN App - MyPlace Run3

Frontend application built with TypeScript

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
  children: ReactChild | ReactChildren;
  header?: ReactChild | ReactChildren;
  footer?: ReactChild | ReactChildren;
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
